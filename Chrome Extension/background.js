const client_id = "17dd16773831937c851a";
//const redirectUri = chrome.identity.getRedirectURL("github");
const client_secret = "286464155f7b4ad72bbae97b281cd2e1d82847a5";
//let returnString = "THIS IS NOT WORKING";
// let commentText;
let commentInfo;

chrome.browserAction.onClicked.addListener(function () {
    chrome.tabs.create({url: 'index.html'});
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
    console.log(request.commentInfo);
    commentInfo = request.commentInfo;
    // if (request.postComment === true) {
        console.log("Chain: Start");
        authenticate().then(data => {
            sendResponse(data);
        });
    // }
    return true;
});


function authenticate() {
    return new Promise((resolve, reject) => {
        chrome.identity.launchWebAuthFlow({
            'url': 'https://github.com/login/oauth/authorize?client_id=' + client_id + "&scope=repo" + "&state=secret",
            'interactive': true
        }, async function (redirect_url) {
            console.log(redirect_url);
            let urlParams = new URL(redirect_url.toString());
            let code = urlParams.searchParams.get("code");

            console.log("Chain: Service-Code: " + code);

            let data = await readResponse(
                'https://github.com/login/oauth/access_token?client_id=' + client_id + '&client_secret=' + client_secret + '&code=' + code + "&state=secret",
                'POST',
                new Headers({
                    'User-agent': 'Mozilla/4.0 Custom User Agent'
                }),
                ""
            );
            console.log(data);

            let responseText = await postComment(data);

            resolve(parseCommentResponse(responseText));
        });
    });
}


function readResponse(url, method, header, body) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: method,
            headers: header,
            body: body
        }).then(function (response) {
            // The response is a Response instance.
            // You parse the data into a useable format using `.json()`
            let data = response.text();
            resolve(data);
        })
    });
}

function connectToGitHub(code) {
    return fetch('https://github.com/login/oauth/access_token?client_id=' + client_id + '&client_secret=' + client_secret + '&code=' + code, {
        method: 'POST',
        headers: new Headers({
            'User-agent': 'Mozilla/4.0 Custom User Agent'
        })
    });
}

function postComment(responseText) {
    console.log(responseText);
    let token = responseText.split("=")[1].split("&")[0];

    console.log(token);

    let commentJSON = JSON.parse(commentInfo);
    let body = '{"body": "'+commentJSON.comment+'"}';
    let url = 'https://api.github.com/repos/'+commentJSON.owner+'/'+commentJSON.repo+'/issues/'+commentJSON.issueNum+'/comments'
    console.log(url)
    return readResponse(
        url,
        'POST', // *GET, POST, PUT, DELETE, etc.
        new Headers({
            'User-agent': 'Mozilla/4.0 Custom User Agent',
            "Authorization": "Bearer " + token,
        }),
        body
    );
}

function parseCommentResponse(responseText) {
    console.log(responseText);
    let newContractId = JSON.parse(responseText).id;
    return newContractId;
}
