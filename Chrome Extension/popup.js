// Information

'use strict';

// DO STUFF

document.addEventListener('DOMContentLoaded', function(event) {
    
    // Load saved settings
    let saved_wallet_adress;
    let saved_wallet_private_key;

    // First locally
    chrome.storage.local.get(['wallet_adress'], function(result) {
        saved_wallet_adress = result.wallet_adress;
        document.getElementById("wallet_adress").value = saved_wallet_adress; 
        console.log('[local] Wallet adress currently is ' + result.wallet_adress);
    });

    chrome.storage.local.get(['wallet_private_key'], function(result) {
        saved_wallet_private_key = result.wallet_private_key;
        document.getElementById("wallet_private_key").value= saved_wallet_private_key;
        console.log('[local] Wallet private key currently is ' + result.wallet_private_key);
    });

    // For Chrome Sync override what was set with locally, when Chrome Sync is enabled.
    chrome.storage.sync.get(['wallet_adress'], function(result) {
        saved_wallet_adress = result.wallet_adress;
        document.getElementById("wallet_adress").value = saved_wallet_adress; 
        console.log('[SYNC] Wallet adress currently is ' + result.wallet_adress);
    });

    chrome.storage.sync.get(['wallet_private_key'], function(result) {
        saved_wallet_private_key = result.wallet_private_key;
        document.getElementById("wallet_private_key").value= saved_wallet_private_key;
        console.log('[SYNC] Wallet private key currently is ' + result.wallet_private_key);
    });


    // Save changes
    document.getElementById("wallet_saveButton").addEventListener("click", function() {
        let wallet_adress = document.getElementById("wallet_adress").value; 
        let wallet_private_key = document.getElementById("wallet_private_key").value; 
        
        // Save settings locally, in case the user does not have Google Chrome Sync enabled
        chrome.storage.local.set({'wallet_adress': wallet_adress}, function() {
            console.log('[local] Wallet adress is set to ' + wallet_adress);
        });
    
        chrome.storage.local.set({'wallet_private_key': wallet_private_key}, function() {
            console.log('[local] Wallet private key is set to ' + wallet_private_key);
        });
        
        // Save it using the Chrome extension storage API. --> Chrome Sync
        chrome.storage.sync.set({'wallet_adress': wallet_adress}, function() {
            console.log('[SYNC] Wallet adress is set to ' + wallet_adress);
        });
    
        chrome.storage.sync.set({'wallet_private_key': wallet_private_key}, function() {
            console.log('[SYNC] Wallet private key is set to ' + wallet_private_key);
        });
    }); 

});


