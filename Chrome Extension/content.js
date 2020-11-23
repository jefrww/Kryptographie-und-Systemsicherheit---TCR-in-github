// SCRIPT BEING RUN AT PAGE LEVEL
// Content injection and so on

//'use strict';

window.addEventListener('load', () => {
	const provider = 'https://sokol.poa.network';
	let web3 = linkWeb3(provider);
	let contract = linkContract(web3);

/* -------------------------------------------------------------------------------------------
*                                   inject buttons on PR page
------------------------------------------------------------------------------------------- */

let comments = document.getElementsByClassName("comment-body");
let btnArr = [];

for(let i = 0; i < comments.length; i++)
{
	btnArr[i] = document.createElement("BUTTON");
	btnArr[i].innerHTML = "SEND TEST";
	btnArr[i].classList.add("btn");
	btnArr[i].addEventListener('click', bruh(contract));
	comments[i].appendChild(btnArr[i]);
}

console.log("CONTRACT");
console.log(contract);
getCounter(contract);
incCounter(contract);
getCounter(contract);




});


/* -------------------------------------------------------------------------------------------
*                                   Functions
------------------------------------------------------------------------------------------- */
async function getCounter(contract)
{
	let counter = await contract.methods.getCounter().call();
	console.log("COUNTER");
	console.log(counter);
}
async function incCounter(contract)
{
	contract.methods.increment().send();
}
function linkWeb3(provider)
{
	let createdWeb3;
	if (typeof web3 !== 'undefined')
	{
		createdWeb3 = new Web3(web3.currentProvider);
	}
	else
	{
		console.log('No web3? You should consider trying MetaMask!');
		createdWeb3 = new Web3(new Web3.providers.HttpProvider(provider));
	}
	return createdWeb3;
}
function linkContract(web3)
{
	let abi = [
		{
			"inputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "increment",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "getCounter",
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
		}
	];
	let address = '0x4bC69694000cb26ee2a0d09b68c4B911ec778D6E';
	return new web3.eth.Contract(abi, address);
}
function bruh (contract)
{
	console.log("HJEEEELP");
	getCounter(contract);
}

function incrementCounter()
{
	contract.methods.increment().estimateGas({ from: public_address }).then(gas => {
		const tx = {
			from: public_address,
			to: contract_address,
			gas: gas,
			data: contract.methods.increment().encodeABI()
		};
		const signPromise = web3.eth.accounts.signTransaction(tx, private_key);
		signPromise.then((signedTx) => {
			const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
			sentTx.on("receipt", receipt => {
				console.log(receipt);
				getCounter()
			});
			sentTx.on("error", err => {
				console.log(err);
			});
		}).catch(error => console.log(error));
	}).catch(error => console.log(error));

	printCounter();
}