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


let comments = document.getElementsByClassName("comment-body");
let btnArr = [];

for(let i = 0; i < comments.length; i++)
{
    btnArr[i] = document.createElement("BUTTON");
    btnArr[i].innerHTML = "SECOND SCRIPT";
    btnArr[i].classList.add("btn");
    btnArr[i].addEventListener('click', bruh)
    comments[i].appendChild(btnArr[i]);
}

