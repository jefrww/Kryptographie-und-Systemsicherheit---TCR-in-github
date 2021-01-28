
"use strict";

document.addEventListener('DOMContentLoaded', function(event) {


    chrome.storage.sync.get(['currentWallet'], function(result) {
        document.getElementById("current_wallet").value = result.currentWallet;
        console.log('[SYNC] Currently selected Wallet: ' + result.currentWallet);
    });
    chrome.storage.sync.get(['isDebugMode'], function(result){
        document.getElementById("debug").checked = result.isDebugMode;
        if(result.isDebugMode)console.log('[SYNC] Currently in DebugMode');
        else console.log('[SYNC] Operating normally.');
    })
    //popuplate select
    chrome.storage.local.get({wallets: []}, function (result) {
        chrome.storage.sync.get(['currentWallet'], function(currentSelected) {
            console.log(result);
            let select = document.getElementById("current_wallet")
            let wallets = result.wallets;
            console.log(wallets);
            for(let i = 0; i < wallets.length; i++){
                let option = document.createElement("option");
                option.value = i;
                option.innerHTML = wallets[i].address;
                select.appendChild(option);
                console.log('[SYNC] Wallet[' + i + ']: ' + wallets[i]);
                console.log(wallets[i]);
            }
            select.value = currentSelected.currentWallet;
        });

    });


    // Save changes
    document.getElementById("wallet_saveButton").addEventListener("click", function() {
        let walletAddress = document.getElementById("wallet_address").value;
        let walletPrivateKey = document.getElementById("wallet_private_key").value;
        // Save it using the Chrome extension storage API. --> Chrome Sync
        chrome.storage.local.get({wallets: []}, function (result) {
            var wallets = result.wallets;
            wallets.push({address: walletAddress, privateKey: walletPrivateKey});
            chrome.storage.local.set({wallets: wallets}, function () {
                chrome.storage.local.get('wallets', function (result) {
                    console.log(result.wallets)
                });
            });
        });
    });

    //select wallet
    document.getElementById('current_wallet').addEventListener('change', function (e){
        console.log('selected ' + e.target.value)
        chrome.storage.sync.set({'currentWallet': e.target.value}, function() {
            console.log('[SYNC] Currently selected Wallet ' + e.target.value);
        });
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
        });
    });

    //clear data
    document.getElementById("clear").addEventListener('click', function (){
        chrome.storage.local.clear(function() {
            var error = chrome.runtime.lastError;
            if (error) {
                console.error(error);
            }
        });
    })

    //activate DebugMode
    document.getElementById("debug").addEventListener("click", function(e){
        chrome.storage.sync.set({'isDebugMode': e.target.checked}, function (){
            console.log('[SYNC] Toggled DebugMode ');
            console.log(e.target.checked)
            if(e.target.checked === true) console.log('[SYNC] DebugMode ON');
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
            });
        })
    })
});


