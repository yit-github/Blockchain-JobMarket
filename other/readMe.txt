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
(0) 0x7fec4b008dcedefb90b02b1592e152791bdd12f0
(1) 0x28ebe9d80fabb014435592e478b1e2ce4b589122
(2) 0x9234f7e5eedc7acad9a1d1dd00ec843b8cc4d4bf
(3) 0xba9cdbb659e7c58b18062db8152b986b8bb5a5f4
(4) 0x0f276c71c0e2998f3882cea5c919a02f3503c6ee
(5) 0x36b5b82ab80df4e80b777904acfc0c053ebe51d3
(6) 0x9e3deeab17758fba95a00f627a2009fa4b63a241
(7) 0x40a8b50a39665f6d8d13bf7b82fd044cc61e329b
(8) 0xf519f46e930ff5b5e989ded8a91e111cc10a4049
(9) 0x5a7eb477307522196d6ef510c54c710ece6df74a

Private Keys
==================
(0) 470f5c3608a522cd0fc01196d250a9106f0da8e24ce287683a507e9667582c3a
(1) c6480424dece9f5fd0941bfbcc28c58baae9869efe7807c24c938264d6115639
(2) e95c097f61c395e6801ddda1eed112e667f9a7748c7373a2c8f89c327519ae21
(3) 914225b044fa05c01450c6431781e6a06b9f6fb0404536ce6b9dd3cc9d82c12c
(4) f684c6acc73516738cbeebbf1c723d90e0d8b91793d4016ca9e3cce932e8361e
(5) 5a792bdee1b5928bf235f2b4c6a2aeaee3e02b9890015b6e7bfe93970cd2115c
(6) 5e262c133f0d51b65467f876d7025441708a2125c42042448ff038bf5e47c79b
(7) 9f8813b5306e28021a3b325deb207e013b86057362071c31e36319b1305e9cfd
(8) 033169ddc728e5580a2f1814858d82b0fe0eb688770b4f38949c19d62da785c7
(9) 11e56c8169231c0f96ffc79c6afbf957b876e5cc0338fe237ea8e9e76b029605


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