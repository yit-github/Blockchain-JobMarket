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
(0) 0xe514fd50bf013bbfa0948e1995a6333c062853b4
(1) 0x89937d718b354a0ac447a0b5394bff178eb34a1b
(2) 0x45d1da66f952547a02e47eb4345f71da4b84ea49
(3) 0xdf4130d3c079541cd76660c85daf2dce675a9f19
(4) 0xb6db66fe8b7dbf623df8dabf5ceb930412161958
(5) 0x4af0aaeea6fc614689eea815417ac6e0772290a0
(6) 0xcdef3fc2b64b561b0658eb987b11bebb6dbfd676
(7) 0x9ef55c5ef472532eb9527b38c9fc23cfb56dba18
(8) 0x9ec608572afffae37c4dc3e11efaa6e3a00f9247
(9) 0x25768a1a8c33cf3ff87f20d72153f60fbbc36bd5

Private Keys
==================
(0) 57cba74623a9e65e1b70f75748ce1fc0e686d708c01192da75e6deb2ee563f4d
(1) c06096d10bc2d7ba686b6021d20fe14d58c023c1d9c6594b7ad00ad744501e6a
(2) bba2a0148ee452c5ce3342ad40437c084848219603ed055bb9cb528595fce1ef
(3) b90bb67c6d3ce25569cd91c77050975ad169102ad5676ba5faaa67b152f92bf8
(4) 30c30274cc5437ff4f6472565756a814444662fe18a330cf97864a6598665b0c
(5) 737f35c6f0c16dc9d09dcc100ba7b7d3b67f7ae8bacf6ba62672ddef359b149e
(6) 958e42291d023b4196da28654d17494e9f9420f0bbd9f7b3e31956a3b77af66a
(7) 9a40e69cbeb722e2e9adef94f79b4f095f5350d82205f3c1b16d8dd3f6175a02
(8) b2e02b71d2d6c60d9e20facb6b76be7ad490efbfdee6a117dce5ed1379266348
(9) 147483d0a3d4188dcc570d5a8f5893906a4fe927dc26e4e6dfcf0f9f8a62f07e



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