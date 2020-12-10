const client_id = "17dd16773831937c851a";
//const redirectUri = chrome.identity.getRedirectURL("github");
const client_secret = "286464155f7b4ad72bbae97b281cd2e1d82847a5";


chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.create({url: 'index.html'});
});
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "hello"){
            chrome.identity.launchWebAuthFlow({
                    'url': 'https://github.com/login/oauth/authorize?client_id=' + client_id + "&scope=repo", 'interactive': true},
                function(redirect_url) {
                    console.log(redirect_url);
                    let urlParams = new URL(redirect_url.toString());
                    console.log(urlParams);
                    console.log(urlParams.searchParams.get("code"));

                    let code = urlParams.searchParams.get("code");

                    let request = new XMLHttpRequest();
                    request.onload = printRepoCount;
                    request.open('post', 'https://github.com/login/oauth/access_token?client_id=' + client_id + '&client_secret=' + client_secret + '&code=' + code);
                    request.send();
                });
            sendResponse({farewell: "asdfasdfasdf"});
        }

    }
);

function printRepoCount() {
    console.log(this.responseText);
    let token_URL = new URL("https://github.com/?" + this.responseText);
    let token = token_URL.searchParams.get("access_token");
    console.log(token);

    let commentRequest = new XMLHttpRequest();
    commentRequest.onload = printResponse;
    commentRequest.open('post', 'https://api.github.com/repos/jefrww/TextRepoForTCRextension/issues/1/comments');
    //commentRequest.setRequestHeader('body', );

    commentRequest.setRequestHeader('Authorization', 'Bearer ' + token);
    commentRequest.send('{"body": "THIS IS A REAL API FROM A BACKGROUND SCRIPT IN CORRECT EXTENSION"}');
}

function printResponse()
{
    console.log(this.responseText);
}