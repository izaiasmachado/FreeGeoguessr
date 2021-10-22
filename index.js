const axios = require('axios')
const TmpMail = require('tmpmail')
const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi

document.addEventListener("keydown", function(event) {
    if (event.altKey && event.code === "KeyG") {
        console.log('[GEOCALOTE]: Captured shortcut keydown')
        generateAccount()
        event.preventDefault()
    }
});

var interval = setInterval(checkGenerationAccountConditions , 250)
function checkGenerationAccountConditions () {
    const generateCondition = window.document.body.innerHTML.indexOf('>Become a Pro member</h2>') !== -1 || window.document.body.innerHTML.indexOf('>Create account to play</h2>') !== -1    
    if (generateCondition) {
        console.log('[GEOCALOTE]: Generating conditions matched')
        generateAccount()
        return stopFunction()
    }
    
    function stopFunction() {
        clearInterval(interval);
    }
}

async function generateAccount () {    
    const client = TmpMail.Create()
    return client.on('ready', async email => {
        console.log('[GEOCALOTE]: Temp mail is ready')
        await sendEmail(email)
        return await verifyIfReceived()
    })

    async function sendEmail(email) {
        console.log('[GEOCALOTE]: Signing up with as', email)
        await axios.post('https://www.geoguessr.com/api/v3/accounts/signup', { email })
    }

    async function verifyIfReceived() {
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

