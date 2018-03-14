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
(0) 0x12601e99d01ac4ecac589e50876a7ebff917b42f
(1) 0x33d5e5c9b12a74a7f2ec5d35b9a68015321e92a9
(2) 0xfa4b26fb075e2016bf9b129b38fb610445207c33
(3) 0x6969e5f366fe626b67361f84c7658001efb4fff7
(4) 0xcc687a226a7b8b33dfa3ca0dee9560c1e52d1e14
(5) 0x17d40c63c7f01745b0c878d37a7c8465762f96e6
(6) 0xcb09166d6605b0a840ab35fdfd549c52374754f5
(7) 0x367bc7723ae8a4e2465435b6b4bc63ed078b1d3f
(8) 0x57e5d9186374702c04be6ef03e23088599c6bb72
(9) 0x517f8f847cc0cc73b38486aeb70bed055daa869a

Private Keys
==================
(0) 714ec2b8df4065a8f3c973c3b2dc17fdfb3e9e9233becaa3d22ac3054cf518e2
(1) e90a03bbdf2770da88a89e7e6d977f23a19a0554a6c2e1cf4c330b9ae98ef132
(2) 45e91a0ae3001c6b71056d15a6962ea784ad42be5637e55597b5d4b357af8452
(3) e51ef86aff76ceb72ece03f00f72bf26e677078944d2e827abd152c34d3c1dfa
(4) bf84d0b5620d59a2c35b7083776eb10833dcdebf14e6d6dd85529efac69f8c9e
(5) e5291d4a51c8fc3147fff000623135f5648b2713b29447f84004a47275821e91
(6) 6033a9cb961d8e347a9c0e6159d7eaa17c7fc8d6b55e792368ff7e1e5aafe618
(7) 522f2dc60163dcfdfa48f7d624f502e88f337d5461e2d30efe79c2008f794897
(8) edb3306356d92b95a2f8333d56785f728009c6f950b4d78c68d08a32108493df
(9) d154cb981304e39991ca1ce6a54d6d69f7d6c64dd8fa94a0eb786e4a0e0bcbc4

HD Wallet
==================
Mnemonic:      cash absent either asthma fold water dad rib gift surge pigeon furnace
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