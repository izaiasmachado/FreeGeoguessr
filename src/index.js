const axios = require('axios')
const TmpMail = require('tmpmail')
const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi

document.addEventListener("keydown", function(event) {
    if (event.altKey && event.code === "KeyG") {
        console.log('[GEOCALOTE]: Captured shortcut keydown')
        generateAccount()
        event.preventDefault()
    }
})

async function generateAccount () {    
    const client = TmpMail.Create()
    return client.on('ready', async email => {
        console.log('[GEOCALOTE]: Temp mail is ready')
        await sendEmail(email)
        return await verifyIfReceived(client)
    })

    async function sendEmail(email) {
        console.log('[GEOCALOTE]: Signing up with as', email)
        await axios.post('https://www.geoguessr.com/api/v3/accounts/signup', { email })
    }

    async function verifyIfReceived(client) {
        console.log('[GEOCALOTE]: Verifying temp mail inbox')
    
        return client.startMessageListener(500, messages => {
            if (messages.length > 0) {
                console.log('[GEOCALOTE]: Email received')
                client.stopMessageListener()
    
                return client.findMessage(messages[0]._id).then(msg => {
                    console.log('[GEOCALOTE]: Gennerating set password url')
                    const { html } = msg.body
                    const matches = html.match(expression)
                    const createdPasswordURL = matches[1]
    
                    const newPassword = createdPasswordURL.split('www.geoguessr.com')[1]
                    console.log('[GEOCALOTE]: Redirecting to password page')
                    window.location.href = newPassword
                })
            }
        })
    }
}

