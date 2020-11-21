// SCRIPT BEING RUN AT PAGE LEVEL
// Content injection and so on


'use strict';
//import TruffleContract from 'truffle-contract'
//import Counter from './../Solidity/build/contracts/Counter.json'
//import web3 from './web3.min.js'



//const providerChain = 'https://sokol.poa.network';
//const web3 = new Web3(providerChain);

//const counterContract = new TruffleContract(Counter);
//counterContract.setProvider(providerChain);
//let accounts = await web3.eth.accounts;
//print(accounts)




var fullURL = window.location.href;

// check if on github.com and a pull request, do Background tasks
if (fullURL.includes("/pull/"))
{
	let web3Script = document.createElement("script");
	web3Script.src = "https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js";
	let body = document.getElementsByTagName("body");
	body[0].appendChild(web3Script);

	var comments = document.getElementsByClassName("comment-body");
	var btnArr = [];

	for(var i = 0; i < comments.length; i++)
	{
		btnArr[i] = document.createElement("BUTTON");
		btnArr[i].innerHTML = "SEND TEST";
		btnArr[i].classList.add("btn");
		comments[i].appendChild(btnArr[i]);
	}
}

function bruh ()
{
	console.log("HJEEEELP");
}