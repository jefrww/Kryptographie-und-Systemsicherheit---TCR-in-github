
"use strict";

document.addEventListener('DOMContentLoaded', function(event) {



    // For Chrome Sync override what was set with locally, when Chrome Sync is enabled.
    chrome.storage.sync.get(['walletAddress'], function(result) {
        document.getElementById("wallet_address").value = result.walletAddress;
        console.log('[SYNC] Wallet address currently is ' + result.walletAddress);
    });
    chrome.storage.sync.get(['walletPrivateKey'], function(result) {
        document.getElementById("wallet_private_key").value= result.walletPrivateKey;
        console.log('[SYNC] Wallet private key currently is ' + result.walletPrivateKey);
    });
    chrome.storage.sync.get(['walletCount'], function(result) {
        let walletCount = result.walletCount === undefined ? 0 : result.walletCount;
        document.getElementById("wallet_count").value = walletCount;
        console.log('[SYNC] ' + walletCount + ' Wallets currently saved.');
    });
    chrome.storage.sync.get(['currentWallet'], function(result) {
        document.getElementById("current_wallet").value = result.currentWallet;
        console.log('[SYNC] Currently selected Wallet: ' + result.currentWallet);
    });


    // Save changes
    document.getElementById("wallet_saveButton").addEventListener("click", function() {
        let walletAddress = document.getElementById("wallet_address").value;
        let walletPrivateKey = document.getElementById("wallet_private_key").value;
        let walletCount = document.getElementById("wallet_count").value;
        let currentWallet = document.getElementById("current_wallet").value;
        // Save it using the Chrome extension storage API. --> Chrome Sync
        chrome.storage.sync.set({'walletAddress': walletAddress}, function() {
            console.log('[SYNC] Wallet address is set to ' + walletAddress);
        });
        chrome.storage.sync.set({'walletPrivateKey': walletPrivateKey}, function() {
            console.log('[SYNC] Wallet private key is set to ' + walletPrivateKey);
        });
        chrome.storage.sync.set({'walletCount': walletCount}, function() {
            console.log('[SYNC] Added another Wallet: ' + walletCount);
        });
        chrome.storage.sync.set({'currentWallet': currentWallet}, function() {
            console.log('[SYNC] Currently selected Wallet ' + currentWallet);
        });
    });
    document.getElementById("wallet_change").addEventListener("click", function() {
        let currentWallet = document.getElementById("current_wallet").value;

        chrome.storage.sync.set({'currentWallet': currentWallet}, function() {
            console.log('[SYNC] Currently selected Wallet ' + currentWallet);
        });

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
        });
    });

});


