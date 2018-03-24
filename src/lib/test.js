

web3.eth.getAccounts(function(err, accounts){console.log(accounts)});

let marketInstance;

App.contracts.Market.deployed(
).then(function (instance) {
    console.log("findJobs, instance:", instance);
    marketInstance = instance;
    return marketInstance.findJobs(0);
}).then(function (jobIds) {
    console.log("jobIds: " + jobIds);
}).catch(function(err) {
    console.error("Err while findJobs");
    console.log(err.message);
});