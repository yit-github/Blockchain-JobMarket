to update node
http://www.hostingadvice.com/how-to/update-node-js-latest-version/

install truffle
npm install -g truffle

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
(0) 0xd90ce30ada504c3ebf8edf1a68ea66255f18bc58
(1) 0x5ef629dc3e666cbf29e8a42213e7f16545684cdd
(2) 0xdd5c1f39b557363ec8a6bc5552014310fc096751
(3) 0x3ac57e83d61a5bfff8db296f956a68ddf44f685a
(4) 0xa805d5d8c265701ddef7d984cef2a9d499df8588
(5) 0x3d1c95db8634c33ce5b54b09f8eff844d3baaf81
(6) 0xdad55ec4f879e84d67cfc43074e9491ebddb9ebc
(7) 0x99f710cfea0cedb5a66169d9c0b32b8f5d1286f7
(8) 0x7a07379964f02566ee3c8e3b337ec29e2bc2c04b
(9) 0x5de94e6df40ff5bb959bc046b3363bc48d9db2d9

Private Keys
==================
(0) aa49c078eae095bf067f206c0148d1c1fe5a08954e3b70ca062b32435ff48ec9
(1) 65b71e9005728882f95949e80a696246e3c5e4c436145653313ccfb4e0c9df69
(2) a6675112538780a337b6a1e5787a96fe286f664de72637881c576bcccd6b750b
(3) 6ac78b36a4f0adb7be86b5a6abee09b46bdefe4ab2b1e38c09bf019bf144e93e
(4) de624757b29a56d79196e9c10c9c377a21338ca38a57d3a16a297b8bec0ae605
(5) a009b362c00f8eeb6aefb88d316b06dd2b6762061d0edf9426c06e01cfb604ca
(6) 5585a1c4838d38aff924450930bf433f1606d5547aea5c2e89c006b040499011
(7) a796127aedd4e1870f84894770e66958ef36ac7a2d6ade4d41089fcc90c3c64e
(8) 60a61fd9a2586b57663cbcec6a33b2be08db97e801e902ed358a04e37caf4c6c
(9) 1cc29fbb270b2739c9920919477e223217ded35f7056629df7a172c2b18df873

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