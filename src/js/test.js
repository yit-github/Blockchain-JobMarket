

web3.eth.getAccounts(function(err, accounts){console.log(accounts)});

App.contracts.Market.deployed().then(function(instance){instance.setEmployee.call("e1", {from: 0xd136eceebace7bdf820e824dbe56b934b75d4e5c})}).then(function(codes){console.log("c" + codes)})
