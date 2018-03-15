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


Available Accounts
==================
(0) 0xf686a557bee2b9f6b1656074d68ac3439de318f4
(1) 0x7553cb43e381caa44a887f3fcdf4b5a20edcb0c8
(2) 0xfe7b72e5a9a24782619cf0061aaed569e8076279
(3) 0x662d32fc985f86e662af98c47ce56eac94aa3f9d
(4) 0x39c8a4d1e1b3915d8a0eece69b911d5372d838e2
(5) 0x525160f1bc456cdcdf0c7e79684541d818f77b98
(6) 0x00535a6cca7d03a0a8439d9b70ef79c922974e98
(7) 0x8829db3fa8228cba68c3d3c171b8eaa5d4e185e6
(8) 0xb8e7c5afea2889cc824a2c894f7d04454acee047
(9) 0xea03a2f9887311856c881ee007ae0f40d662cf68

Private Keys
==================
(0) 0f91d982c10608bbd2052f07e798a44aae0d50ad37f11acf46507dfdfafcfe2e
(1) 2339602888ae4f8fac97fb8f8ba864931a6169a80665e0b7e830d5b93f9b29b1
(2) 5d1076c5f53328de394d7f2160cf66827ec870a6bca36a72f2df7bafdc5489eb
(3) fd6c65f1237cf4f1a0cd18579e1c92d8e92f7fed5eaa67a4a305844f08a7fa26
(4) a5ad90f78673865079dc5f8458709eefe9af02cdd00172c9dd71952b54845f2f
(5) 0b2de48e372221f7481dc59f3dbdf2f513dc834cfeecc3852e0f445d774dc1cf
(6) 5be1bd9b4f44b94c16d9810e7cba8c91ce42f61b364a134d9a6256f084e0bd67
(7) 773485b9df8bec239a8eab65d69616cbc9927592f06c9db0483bd21081ad930d
(8) 6eff2b4001341c22005345756d2537da00e1268aaba93f23c9117b61f7a75ac1
(9) 16c65aba19dfe0ad8a73f31b59de2e65e00e43844fc78a3d922c68579dd328e0



HD Wallet
==================
Mnemonic:      strike save early weird assume refuse bulk between evoke duty injury pear
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