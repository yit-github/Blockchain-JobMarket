to update node
http://www.hostingadvice.com/how-to/update-node-js-latest-version/

install truffle
npm install -g truffle

npm install lite-server --save-dev

install ganache-cli
npm install ganache-cli
npm install web3@0.20.2

install testrpc
npm install ethereumjs-testrpc -g

start using testrpc
------------

ref
http://truffleframework.com/tutorials/debugging-a-smart-contract

truffle init

truffle compile

truffle develop

>
migrate

truffle compile && truffle migrate --reset


Available Accounts
==================
(0) 0x1c789a3b1895c831771f1a6b666d353774d107a9
(1) 0xf7d2a806160f72202201e2ea84b8c80adf0494d0
(2) 0x1bd0b8f4578868ab0ff7f99f2e0db28b743b74df
(3) 0x43137d62e3147c022a0678a618aedf147088cc82
(4) 0x37b3a7961860525c96d7ce063118ca578c293d02
(5) 0x984614381269c98536e1c508e88755b709f09c37
(6) 0xa9d493dc9d1586a81435ff2405dda0a9985b2e9d
(7) 0xc9046da90fed6cc60efdb7e1f382fc82dd0842c2
(8) 0xb54c75f70ca5ac0f3604c557fad0228039378d9e
(9) 0x51a4549143096bd310b07b1a2c172dda8d24bf1d

Private Keys
==================
(0) ed762b1693dea1f8dc8b025d7b3bc19bd90634a908f70e3ff07d8b49a6ad0ffd
(1) 8f61a5b416dde93548fd919bace119f3a63a76997640f560a097c6c545d3b926
(2) 54ce279265a3673575abcf9cb69057ffd1770891d8664667759f9fc180e01ff3
(3) b389ebc581d42e5059a9cfb7e00b635a887b381ed6ebb1bea5cbfaef0d74fac2
(4) ee1d735c6c6fa1d4148e721f582bd45f142dcef7e3b04ef16dda514a2b5a3db4
(5) f0afadeb34c16e049139d74fd60b4e6ae7b0df2ad1726141125a16ec8deec526
(6) ba31f86b8c8c40b929d3df5dd34d3dc793d3dd3e29df884d940f5c0ada027fc6
(7) 614e1be61b685968b80162d6129b81c4ebafe44811cca5708e8bae2555238499
(8) 46a585e55b82acfcd58f67ce24bc4b29a04380abffe66779e6c87d649f1dfbfe
(9) e2557997824dc086e99820d29ffeaa303f268a39d85f94099d69846261cd26fa

HD Wallet
==================
Mnemonic:      update kangaroo liquid number drama spoon argue retreat work journey plastic symbol
Base HD Path:  m/44'/60'/0'/0/{account_index}

Listening on localhost:8545


Market.deployed().then(function(instance) {return instance.getEmployeeCodes.call();})
Market.deployed().then(function(instance){return instance.setInitialData(0xf17f52151ebef6c7334fad080c5704d77216b732, 0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef, 0x821aea9a577a9b44299b9c15c88cf3087f3b5544);});

 Market.deployed().then(function(instance){return instance.address})
'0x345ca3e014aaf5dca488057592ee47305d9b3e10'




Market.deployed().then(function(instance){return instance.setEmployee(0xf17f52151ebef6c7334fad080c5704d77216b732, "e1");});








Instructors.deployed().then(function(instance) {return instance.getInstructorCodes.call();})

Instructors.deployed().then(function(instance){return instance.setInstrutor(0x627306090abab3a6e1400e9345bc60c78a8bef57, "i1");});

Instructors.deployed().then(function(instance) {return instance.getInstructorCodes.call();})



---------


reference:
http://truffleframework.com/tutorials/pet-shop

mkdir pet-shop-tutorial

cd pet-shop-tutorial

truffle unbox pet-shop

pragma solidity ^0.4.17;
contract Adoption {
    address[16] public adopters;
    function adopt(uint petId) public returns (uint) {
      require(petId >= 0 && petId <= 15);
      adopters[petId] = msg.sender;
      return petId;
    }
    function getAdopters() public view returns (address[16]) {
      return adopters;
    }
}

truffle compile

2_deploy_contracts.js
var Adoption = artifacts.require("Adoption");
module.exports = function(deployer) {
  deployer.deploy(Adoption);
};

Run ganache
configure port in truffle.js

truffle migrate

TestAdoption.sol
pragma solidity ^0.4.17;
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Adoption.sol";
contract TestAdoption {
  Adoption adoption = Adoption(DeployedAddresses.Adoption());

}

npm run dev


----

ipfs

https://github.com/ipfs/js-ipfs-api


ipfs daemon
ipfs add


