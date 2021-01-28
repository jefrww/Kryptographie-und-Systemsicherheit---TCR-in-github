// SCRIPT BEING RUN AT PAGE LEVEL
// Content injection and so on
const client_id = "17dd16773831937c851a";
//const redirectUri = chrome.identity.getRedirectURL("github");
const client_secret = "286464155f7b4ad72bbae97b281cd2e1d82847a5";

const parentAbi = [
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
                "internalType": "address",
                "name": "",
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
                "name": "_commentId",
                "type": "string"
            }
        ],
        "name": "createComment",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "string",
                "name": "_commentId",
                "type": "string"
            }
        ],
        "name": "getComment",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];
const parentAddress = '0xb14Fe243733c4218f5FC5F3de48c4e517009f671';
const childAbi = [
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "_creator",
                "type": "address"
            }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "votesLUT",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "upvote",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "downvote",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "payoutSingleRecipient",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getRemaingRecipientCount",
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
        "inputs": [],
        "name": "getTotalUp",
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
        "inputs": [],
        "name": "getTotalDown",
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
        "inputs": [],
        "name": "getTotal",
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
        "inputs": [],
        "name": "getOwner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getCreationDate",
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
        "inputs": [],
        "name": "getStage",
        "outputs": [
            {
                "internalType": "enum Comment.Stage",
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "getRemainingTime",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "hasVoted",
        "outputs": [
            {
                "internalType": "enum Comment.Favor",
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];


window.addEventListener('load', () => {
    const provider = 'https://sokol.poa.network';
    let web3 = linkWeb3(provider);
    let parentContract = linkParentContract(web3);
    let wallet1 = web3.eth.accounts.wallet.add({
        privateKey: '9a3f1ef33a7d9bfd6fc26d11df4f36c1bea498c6c8c1bfb8bf42ffbfb9a62d72',
        address: '0x58D8830c2e428912cad9073D517c3DE53316D495'
    });
    let wallet2 = web3.eth.accounts.wallet.add({
        privateKey: '871f79e24bdf4f3a30276b1178fb3611632f87f5afa37fd8b6b37ed1e299d708',
        address: '0x8fC3045dA60B5D37B2d582B73D87696Bf017D1B3'
    });
    let wallet3 = web3.eth.accounts.wallet.add({
        privateKey: '5b280f4bc7c875079df77f80ac3355d3df17e5454c6f12ffedfc2371f749c130',
        address: '0x2fe1a35A2fc689C5065c3E75E9E9349f3869f000'
    });
    let wallets = [wallet1, wallet2, wallet3];

    chrome.storage.sync.get(['currentWallet'], function(result) {
        chrome.storage.sync.get(['isDebugMode'], function(isDebugMode){
            let wallet = web3.eth.accounts.wallet.add({
                privateKey: wallets[result.currentWallet].privateKey,
                address: wallets[result.currentWallet].address
            });
            console.log('[SYNC] Currently selected Wallet: ' + wallets[result.currentWallet].address);
            console.log('[SYNC] DEBUG MODE: ' + isDebugMode.isDebugMode)
            let comments = document.getElementsByClassName("timeline-comment-group");
            let submitDiv = document.getElementById("partial-new-comment-form-actions");
            let submitWithStake = document.createElement('button');
            submitWithStake.classList.add("btn", "btn-primary");
            submitWithStake.innerHTML = "Comment with stake";
            submitDiv.appendChild(submitWithStake);

            submitWithStake.addEventListener('click', function (){
                event.preventDefault();
                let commentText = document.getElementById('new_comment_field').value;
                let url = window.location.href.split('/');
                let repo = url[url.length -3];
                let issueNum = url[url.length -1];
                let owner = url[url.length -4];
                let commentInfo = '{"repo":"'+repo+'", "issueNum":"'+issueNum+'", "comment":"'+jsonEscape(commentText)+'", "owner":"'+owner+'"}';
                console.log('REPO: ' + repo);
                console.log('ISSUE-NUM: ' + issueNum);
                chrome.runtime.sendMessage({commentInfo: commentInfo}, function(response) {
                    console.log(String(response));
                    createComment(web3, parentContract, wallet, String(response))
                });
            });

            for (let i = 0; i < comments.length; i++) {
                let commentId = comments[i].id.replace(/\D/g,'');
                console.log(commentId);


                getCommentFromParent(parentContract, commentId).then(function (result){
                    console.log("COMMENT ADDRESS: " + result);
                    if(result !== "0x0000000000000000000000000000000000000000"){
                        let votingContainer = document.createElement('div');
                        votingContainer.classList.add("Box");
                        let votingDiv = document.createElement('div');
                        votingDiv.classList.add("box_padding");
                        votingContainer.appendChild(votingDiv);
                        comments[i].getElementsByClassName("comment-body")[0].appendChild(votingDiv);
                        let childContract = linkChildContract(web3, result);

                        hasVoted(childContract).then(function (voted){
                            console.log("VOTED: " + voted);
                        });


                        // getTotalUp(childContract).then(function (up) {
                        //     getTotalDown(childContract).then(function (down) {
                        //         let staked = document.createElement("div");
                        //         staked.innerHTML = Web3.utils.fromWei((parseInt(up)+parseInt(down)).toString(), 'ether');
                        //         votingDiv.appendChild(staked);
                        //     });
                        // });
                        getStage(childContract).then(function (stage){
                            if(stage == 0){
                                let voteValue = document.createElement("INPUT");
                                voteValue.classList.add("voteInput");
                                voteValue.type = "number";
                                votingDiv.appendChild(voteValue);
                            }
                            else{
                                let voteResult = document.createElement("DIV");
                                voteResult.innerHTML = "Result: ";
                                votingDiv.appendChild(voteResult);
                            }
                            console.log("STAGE: " + stage);
                            let upBtn = document.createElement("BUTTON");
                            upBtn.classList.add("vote_btn", "upvote_btn");
                            upBtn.addEventListener('click', function () {
                                upvote(web3, childContract, wallet, voteValue.value, upBtn, isDebugMode.isDebugMode)
                            });
                            if(isDebugMode.isDebugMode){
                                getTotalUp(childContract).then(function (result) {
                                    upBtn.innerHTML = Web3.utils.fromWei(result.toString(), 'ether');
                                });
                            }

                            votingDiv.appendChild(upBtn);

                            let downBtn = document.createElement("BUTTON");
                            downBtn.classList.add("vote_btn", "downvote_btn");
                            downBtn.addEventListener('click', function () {
                                downvote(web3, childContract, wallet, voteValue.value)
                            });
                            if(isDebugMode.isDebugMode){
                                getTotalDown(childContract).then(function (result) {
                                    downBtn.innerHTML = Web3.utils.fromWei(result.toString(), 'ether');
                                });
                            }
                            votingDiv.appendChild(downBtn);
                            if(stage == 0){
                                let payoutBtn = document.createElement("BUTTON");
                                payoutBtn.innerHTML = "PAYOUT";
                                payoutBtn.classList.add("btn");
                                payoutBtn.addEventListener('click', function () {
                                    let loadingImg = document.createElement("IMG");
                                    // loadingImg.innerHTML = "LOADING";
                                    // let source = chrome.runtime.getURL('loading.gif');
                                    //console.log(source);
                                    loadingImg.src = 'https://github.com/jefrww/Kryptographie-und-Systemsicherheit---TCR-in-github/blob/payout/Chrome%20Extension/loading.gif?raw=true';
                                    votingDiv.replaceChild(loadingImg, payoutBtn);
                                    getRemainingRecipients(childContract).then(function (result){
                                        console.log(result + " Votes to count.");
                                        payout(childContract, wallet, loadingImg);
                                    })
                                });
                                votingDiv.appendChild(payoutBtn);
                            }
                        })




                        // getOwner(childContract).then(function (result){
                        //     console.log(result);
                        //     let ownerName = document.createElement("DIV");
                        //     ownerName.innerHTML = "Owner: " + result;
                        //     votingDiv.appendChild(ownerName);
                        // });
                        // getCreationDate(childContract).then(function (result){
                        //     console.log(result);
                        //     let creationDate = document.createElement("DIV");
                        //     let date = new Date(result*1000);
                        //     creationDate.innerHTML = "Created: " + date.toLocaleString();
                        //     votingDiv.appendChild(creationDate);
                        // });
                        getRemainingTime(childContract).then(function (result){
                            console.log(result);
                            let remainingTime = document.createElement("DIV");
                            if(result/60/60/24>0) remainingTime.innerHTML = Math.ceil(result/60/60/24) + " Tage verbleibend.";
                            else if(result <= 0) remainingTime.innerHTML = "Abgelaufen.";
                            else remainingTime.innerHTML = Math.ceil(result/60/60%24) + " Stunden verbleibend.";
                            votingDiv.appendChild(remainingTime)
                        });
                    }

                });
            }
        })

    });
    console.log(parentContract);


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
function linkParentContract(web3) {
    return new web3.eth.Contract(parentAbi, parentAddress);
}
function linkChildContract(web3, address){
    return new web3.eth.Contract(childAbi, address);
}
async function getAccs(web3) {
    return await web3.eth.getAccounts();
}
/* -------------------------------------------------------------------------------------------
*                                   ACCESSING SMART CONTRACT
------------------------------------------------------------------------------------------- */
async function getCommentFromParent(contract, id){
    return await contract.methods.getComment(id).call();
}
async function getTotalUp(contract) {
    return await contract.methods.getTotalUp().call();
}
async function getTotalDown(contract) {
    return await contract.methods.getTotalDown().call();
}
async function getOwner(contract) {
    return await contract.methods.getOwner().call();
}
async function getCreationDate(contract){
    return await contract.methods.getCreationDate().call();
}
async function getRemainingTime(contract){
    return await contract.methods.getRemainingTime().call();
}
async function hasVoted(contract){
    return await contract.methods.hasVoted().call();
}
async function getStage(contract){
    return await contract.methods.getStage().call();
}
// async function payout(contract){
//     return await contract.methods.payoutSingleRecipient().call();
// }
async function getRemainingRecipients(contract){
    return await contract.methods.getRemaingRecipientCount().call();
}
async function upvote(web3, contract, wallet, amount) {
    // let value = web3.utils.toWei(stake.toString(), "ether");
    let value = web3.utils.toWei(amount.toString(), "ether");
    console.log("Sending: " + value)
    contract.methods.upvote().estimateGas({from: contract.address, value: value}).then(function (gas){
        contract.methods.upvote().send({from: wallet.address, gas: 1000000, value: value}, function (err, res) {
            if (err) {
                console.log("ERROR DURING UPVOTE", err);
                return
            }
            console.log("UPVOTED WITH HASH: " + res);
        });
    }).catch(function (error){
        console.log(error);
    })

}
async function downvote(web3, contract, wallet, amount) {
    let gas = await contract.methods.downvote().estimateGas({from: contract.address})
    let value = web3.utils.toWei(amount.toString(), "ether");
    contract.methods.downvote().send({from: wallet.address, gas: 1000000, value: value}, function (err, res) {
        if (err) {
            console.log("ERROR DURING DOWNVOTE", err);
            return
        }
        console.log("DOWNVOTED WITH HASH: " + res);
    });
}
async function createComment(web3, contract, wallet, id){
    let gas = await contract.methods.createComment(id).estimateGas({from: contract.address})
    let value = web3.utils.toWei("5", "ether");
    contract.methods.createComment(id).send({from: wallet.address, gas: 12000000, value: value}, function (err, res) {
        if (err) {
            console.log("ERROR DURING COMMENT CREATION", err);
            return
        }
        console.log("CREATED WITH HASH: " + res);
    });
}
async function payout(contract, wallet, childHtml){
    let gas = await contract.methods.payoutSingleRecipient().estimateGas({from: contract.address})
    contract.methods.payoutSingleRecipient().send({from: wallet.address, gas: 12000000}, async function (err, res) {
        if (err) {
            console.log("ERROR DURING payout", err);
            return
        }
        console.log("payout WITH HASH: " + res);
    }).then(async function (){
        let remaining = await getRemainingRecipients(contract);
        if(remaining > 0){
            console.log("Remaining: " + remaining);
            payout(contract, wallet, childHtml);
        }
        else{
            // childHtml.innerHTML = "Done";
            childHtml.src = "https://github.com/jefrww/Kryptographie-und-Systemsicherheit---TCR-in-github/blob/payout/Chrome%20Extension/check.png?raw=true";
            childHtml.style.height = '10px';
            childHtml.style.width = '10px';
            console.log("Done.");
        }
    });
    // console.log('RECEIPT: ' + receipt);
}
/* -------------------------------------------------------------------------------------------
*                                   USING GITHUB API
------------------------------------------------------------------------------------------- */
function jsonEscape(str)  {
    return str.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
}