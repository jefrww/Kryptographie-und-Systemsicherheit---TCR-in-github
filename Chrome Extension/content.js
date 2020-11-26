// SCRIPT BEING RUN AT PAGE LEVEL
// Content injection and so on

//'use strict';

window.addEventListener('load', () => {

	const provider = 'https://sokol.poa.network';
	let web3 = linkWeb3(provider);
	let contract = linkContract(web3);
	let wallet = web3.eth.accounts.wallet.add({
		privateKey: '9a3f1ef33a7d9bfd6fc26d11df4f36c1bea498c6c8c1bfb8bf42ffbfb9a62d72',
		address: '0x58D8830c2e428912cad9073D517c3DE53316D495'
	});
	console.log(wallet);
	/* -------------------------------------------------------------------------------------------
    *                                   inject buttons on PR page
    ------------------------------------------------------------------------------------------- */

let comments = document.getElementsByClassName("comment-body");
let btnArr = [];
let counterArr = [];

for(let i = 0; i < comments.length; i++)
{
	btnArr[i] = document.createElement("BUTTON");
	btnArr[i].innerHTML = "SEND TEST";
	btnArr[i].classList.add("btn");
	btnArr[i].addEventListener('click', bruh2(contract, wallet));

	getCounter(contract).then( function (result){
		console.log('PRINTING IN THEN: ' + result);
		counterArr[i] = document.createElement("DIV");
		counterArr[i].innerHTML = "Counter Count: " + result;
		comments[i].appendChild(counterArr[i]);
	});
	comments[i].appendChild(btnArr[i]);

}

console.log("CONTRACT");
console.log(contract);
getCounter(contract);
//incCounter(contract,wallet);

});


/* -------------------------------------------------------------------------------------------
*                                   Functions
------------------------------------------------------------------------------------------- */
async function getAccs(web3)
{
	return await web3.eth.getAccounts();
}
async function getCounter(contract)
{
	let counter = await contract.methods.getCounter().call();
	console.log("COUNTER");
	console.log(counter);
	return counter;
}
async function incCounter(contract, wallet)
{
	let gas = await contract.methods.increment().estimateGas({from: contract.address})
	contract.methods.increment().send({from: wallet.address, gas: gas}, function(err, res){
		if(err){
			console.log("ERROR DURING INC", err);
			return
		}
		console.log("SUCCESS WITH HASH: " + res);
	});
}
async function estimateGas(contract)
{

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
	incCounter(contract);
}
function bruh2 (contract, wallet)
{
	incCounter(contract, wallet);
}