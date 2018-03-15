

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

Available Accounts
==================
(0) 0x5f0e611dbcb5a4a1dc8ec4c7e1a02a8eb60182f3
(1) 0xcea3b456c72dae97a256199c24dab28fb4863ed1
(2) 0x38921ab62710300785722cfc538b3cabefb12845
(3) 0xda93fc20797a06d7273335788a4914a89d3bedaf
(4) 0xde90dd721ac52718d03f34bb9c63b00c66b58c11
(5) 0xef90cfd9245e7fee5fea4cdf05eb234054f0c885
(6) 0x6d2d6c1a15babb86d509f97472db6184cf8e3269
(7) 0xf57e35400c756966a66cb028e0bf62719df73281
(8) 0x0b8875dd18b58cdfb0666aede18e9a749e4d432c
(9) 0xb176cba34b17ffc1e138d547c608b441a968b128

Private Keys
==================
(0) 533325e653ebe119a5894dd869d1308291a71112200808e1b9278adf74352162
(1) 733811ef40dd9313cc209feb4845af01a377277818774125e0d9bc7b81373bca
(2) 9058ec1489a258a94b24f95569e658d577367d0ec65228ad18f54d1079fcc999
(3) 048b17fa30a7a052d88b26923ed23f0e49e04534ce6fa79049df2aaf3c155306
(4) 6b6019fe4305e7f8ad01c1d00bce1fd53fb9e37a5bdf4c14233328f21bc09904
(5) d39497cc28495437333d9bbdb3439549593a8d6db87cfe556f7941facf30c88f
(6) 156c4a0ed9f91bcf414d2cd2ab25504b62e5ed6cdcb6ebf1cd4b4ffd8dad39f8
(7) 71297419c15c6620c2a5a68846b468608024d499ffead210e3f90b1191021344
(8) b4c7f792d58b32716d0afc3e8a67f3ecdee62bf230f3dbf25a70b2d2ed905be5
(9) fddd4d1dc350731d2f4c2c612fd7a780342bd52ebd42503c067c094bf7f3059d