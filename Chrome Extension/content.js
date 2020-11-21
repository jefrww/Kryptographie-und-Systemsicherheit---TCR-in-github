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


let fullURL = window.location.href;

// check if on github.com and a pull request, do Background tasks
if (fullURL.includes("/pull/"))
{
	let web3Script = document.createElement("script");
	let customScript = document.createElement("script");
	web3Script.src = "https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js";
	customScript.src = "./reaction.js"
	let head = document.getElementsByTagName("head");
	head[0].appendChild(web3Script);
	head[0].appendChild(customScript);

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
}
address = '0x4bC69694000cb26ee2a0d09b68c4B911ec778D6E';
web3 = window.web3;
contract = web3.eth.Contract(abi, address);
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


function bruh ()
{
	console.log("HJEEEELP");
}

function printCounter(){
	contract.methods.getCounter().call().then(res=>{
		console.log(res);
	}).catch(err =>console.log(err));
}