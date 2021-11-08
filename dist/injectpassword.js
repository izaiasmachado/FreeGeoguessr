(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const password = makeId(15)
const token = window.location.href.split('https://www.geoguessr.com/profile/set-password/')[1]

async function main() {
    console.log('[GEOCALOTE]: Fetching api to set password')
    
    await fetch("https://www.geoguessr.com/api/v3/profiles/setpassword", {
        "headers": {
            "accept": "*/*",
            "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-type": "application/json",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        "referrer": "https://www.geoguessr.com/profile/set-password/UYaXuNyHv2pIwQF0v3bf0yvVb8CJYpYN",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": JSON.stringify({ token, password }),
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    }).then(() => {
        console.log('[GEOCALOTE]: Password set')
        console.log('[GEOCALOTE]: Redirecting to main page')
        window.location.href = '/'
    })
}

main()

function makeId(n) {
    let id = "";
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    for (var i = 0; i < n; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return id
}
},{}]},{},[1]);
