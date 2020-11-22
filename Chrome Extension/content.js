// SCRIPT BEING RUN AT PAGE LEVEL
// Content injection and so on

//'use strict';
//import TruffleContract from 'truffle-contract'
//import Counter from './../Solidity/build/contracts/Counter.json'
//import web3 from './web3.min.js'
//const providerChain = 'https://sokol.poa.network';
//const web3 = new Web3(providerChain);
//const counterContract = new TruffleContract(Counter);
//counterContract.setProvider(providerChain);
//let accounts = await web3.eth.accounts;
//print(accounts)
//const {contract_abi} = require('./../Solidity/build/contracts/Counter.json');
//let contract_address = '0x4bC69694000cb26ee2a0d09b68c4B911ec778D6E';
//const contract = web3.eth.Contract(contract_abi, contract_address);


// let web3Script = document.createElement("script");
// let customScript = document.createElement("script");
// web3Script.src = "https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js";
// //customScript.src = "./web3.min.js"
// let head = document.getElementsByTagName("body");
// head[0].appendChild(web3Script);
// //head[0].appendChild(customScript);

window.addEventListener('load', () => {

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
	btnArr[i].addEventListener('click', bruh)
	comments[i].appendChild(btnArr[i]);
}



/* -------------------------------------------------------------------------------------------
*                                   Check for injected web3
------------------------------------------------------------------------------------------- */

let web3;

	if (typeof web3 !== 'undefined') 
	{
		web3 = new Web3(web3.currentProvider);
	} 
	else 
	{
		console.log('No web3? You should consider trying MetaMask!');
		web3 = new Web3(new Web3.providers.HttpProvider('https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js'));
	}
	

// if (typeof web3 !== 'undefined') {
// 	web3js = new Web3(web3.currentProvider);
// } else {
// 	// set the provider you want from Web3.providers
// 	web3js = new Web3(new web3.providers.HttpProvider("http://localhost:8545"));
// }

//metamask
//if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
//	web3js = new Web3(window.web3.currentProvider);
//	console.log("USING METAMASK");
//}
//else{
//	console.log("ERROR");
//}




/* -------------------------------------------------------------------------------------------
*                                   web3 Contract Setup
------------------------------------------------------------------------------------------- */

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
//web3js = window.web3;
let contract = new web3.eth.Contract(abi, address);

});


/* -------------------------------------------------------------------------------------------
*                                   Functions
------------------------------------------------------------------------------------------- */
function bruh ()
{
	console.log("HJEEEELP");
}

function printCounter(){
	contract.methods.getCounter().call().then(res=>{
		console.log(res);
	}).catch(err =>console.log(err));
}