// SCRIPT BEING RUN AT PAGE LEVEL
// Content injection and so on
const client_id = "17dd16773831937c851a";
//const redirectUri = chrome.identity.getRedirectURL("github");
const client_secret = "286464155f7b4ad72bbae97b281cd2e1d82847a5";

window.addEventListener('load', () => {
    const provider = 'https://sokol.poa.network';
    let web3 = linkWeb3(provider);
    let contract = linkContract(web3);
    let wallet = web3.eth.accounts.wallet.add({
        privateKey: '9a3f1ef33a7d9bfd6fc26d11df4f36c1bea498c6c8c1bfb8bf42ffbfb9a62d72',
        address: '0x58D8830c2e428912cad9073D517c3DE53316D495'
    });
    console.log(wallet);
    console.log(contract);

    let comments = document.getElementsByClassName("timeline-comment-group");
    let submitDiv = document.getElementById("partial-new-comment-form-actions");
    let submitWithStake = document.createElement('button');
    submitWithStake.innerHTML = "Comment with stake";
    submitDiv.appendChild(submitWithStake);
    
    submitWithStake.addEventListener('click', function (){
        event.preventDefault();
        let commentText = document.getElementById('new_comment_field').value;
        let url = window.location.href.split('/');
        let repo = url[url.length -3];
        let issueNum = url[url.length -1];
        let owner = url[url.length -4];
        let randoJSON = JSON.parse('{"firstName":"John", "lastName":"Doe"}');
        let commentInfo = '{"repo":"'+repo+'", "issueNum":"'+issueNum+'", "comment":"'+jsonEscape(commentText)+'", "owner":"'+owner+'"}';
        console.log('JSON: ' + randoJSON.firstName + ' ' + randoJSON.lastName);
        console.log('REPO: ' + repo);
        console.log('ISSUE-NUM: ' + issueNum);
        chrome.runtime.sendMessage({commentInfo: commentInfo}, function(response) {
            console.log(response);
        });
    });

    for (let i = 0; i < comments.length; i++) {
        let commentId = comments[i].id.replace(/\D/g,'');
        let votingDiv = document.createElement('div');
        votingDiv.innerHTML = "Voting Div";
        comments[i].getElementsByClassName("comment-body")[0].appendChild(votingDiv);

        let upBtn = document.createElement("BUTTON");
        upBtn.innerHTML = "+";
        upBtn.classList.add("btn");
        upBtn.addEventListener('click', function () {
            upvote(contract, wallet, commentId)
        });
        votingDiv.appendChild(upBtn);

        let downBtn = document.createElement("BUTTON");
        downBtn.innerHTML = "-";
        downBtn.classList.add("btn");
        downBtn.addEventListener('click', function () {
            downvote(contract, wallet, commentId)
        });
        votingDiv.appendChild(downBtn);

        getUpvotes(contract, commentId).then(function (result) {
            //console.log('PRINTING IN THEN: ' + result);
            let upCount = document.createElement("DIV");
            upCount.innerHTML = "▲ " + result;
            votingDiv.appendChild(upCount);
        });
        getDownvotes(contract, commentId).then(function (result) {
            let downCount = document.createElement("DIV");
            downCount.innerHTML = "▼ " + result;
            votingDiv.appendChild(downCount);
        });
        getOwner(contract, commentId).then(function (result){
            console.log(result);
           let ownerName = document.createElement("DIV");
            ownerName.innerHTML = "Owner: " + result;
           votingDiv.appendChild(ownerName);
        });
    }
});
/* -------------------------------------------------------------------------------------------
*                                   SETTING UP SMART CONTRACT
------------------------------------------------------------------------------------------- */
function linkWeb3(provider) {
    let createdWeb3;
    if (typeof web3 !== 'undefined') {
        createdWeb3 = new Web3(web3.currentProvider);
    } else {
        console.log('No web3? You should consider trying MetaMask!');
        createdWeb3 = new Web3(new Web3.providers.HttpProvider(provider));
    }
    return createdWeb3;
}
function linkContract(web3) {
    let abi = [
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "name": "comments",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "exists",
                    "type": "bool"
                },
                {
                    "internalType": "enum Counter.Stage",
                    "name": "stage",
                    "type": "uint8"
                },
                {
                    "internalType": "uint256",
                    "name": "up",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "down",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "creator",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "string",
                    "name": "commentId",
                    "type": "string"
                }
            ],
            "name": "upvote",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "string",
                    "name": "commentId",
                    "type": "string"
                }
            ],
            "name": "downvote",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "string",
                    "name": "commentId",
                    "type": "string"
                }
            ],
            "name": "createComment",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "string",
                    "name": "commentId",
                    "type": "string"
                }
            ],
            "name": "createCommentWithOwner",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "string",
                    "name": "commentId",
                    "type": "string"
                }
            ],
            "name": "getUpvotes",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "string",
                    "name": "commentId",
                    "type": "string"
                }
            ],
            "name": "getDownvotes",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "string",
                    "name": "commentId",
                    "type": "string"
                }
            ],
            "name": "getCommentOwner",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];
    let address = '0x2de9449351faAA2B5C2025c0105bfD84EDd514c9';
    return new web3.eth.Contract(abi, address);
}
async function getAccs(web3) {
    return await web3.eth.getAccounts();
}
/* -------------------------------------------------------------------------------------------
*                                   ACCESSING SMART CONTRACT
------------------------------------------------------------------------------------------- */

async function getUpvotes(contract, id) {
    return await contract.methods.getUpvotes(id).call();
}
async function getOwner(contract, id) {
    return await contract.methods.getCommentOwner(id).call();
}

async function getDownvotes(contract, id) {
    return await contract.methods.getDownvotes(id).call();
}

async function upvote(contract, wallet, id) {
    let gas = await contract.methods.upvote(id).estimateGas({from: contract.address})
    contract.methods.upvote(id).send({from: wallet.address, gas: gas}, function (err, res) {
        if (err) {
            console.log("ERROR DURING UPVOTE", err);
            return
        }
        console.log("UPVOTED WITH HASH: " + res);
    });
}

async function downvote(contract, wallet, id) {
    let gas = await contract.methods.downvote(id).estimateGas({from: contract.address})
    contract.methods.downvote(id).send({from: wallet.address, gas: gas}, function (err, res) {
        if (err) {
            console.log("ERROR DURING DOWNVOTE", err);
            return
        }
        console.log("DOWNVOTED WITH HASH: " + res);
    });
}
async function createCommentWithOwner(){
    let gas = await contract.methods.upvote(id).estimateGas({from: contract.address})
    contract.methods.upvote(id).send({from: wallet.address, gas: gas}, function (err, res) {
        if (err) {
            console.log("ERROR DURING UPVOTE", err);
            return
        }
        console.log("UPVOTED WITH HASH: " + res);
    });
}
/* -------------------------------------------------------------------------------------------
*                                   USING GITHUB API
------------------------------------------------------------------------------------------- */
function jsonEscape(str)  {
    return str.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
}