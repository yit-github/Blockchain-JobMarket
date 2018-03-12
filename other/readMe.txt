ref
http://truffleframework.com/tutorials/debugging-a-smart-contract

truffle init

truffle compile

truffle develop

>
migrate


Available Accounts
==================
(0) 0x0936196b4638cff6b6feff8458d5402d95edaf29
(1) 0xd68b0b2a70fe125eba7ceb7c75a630eace27e16d
(2) 0x772cc947f14c8f2f45f03c7aa83241527f65b5ea
(3) 0xabb338d1d65e71f8fc5d0e93c2c7953af2263378
(4) 0xd279a4d7671bd02249171beb01d79797789e021c
(5) 0xe7bca60d856ac2a0a2d0ed2859a368a84bd511d4
(6) 0xfa0f0f951b72b64994a0ae572adbb34109635402
(7) 0x47d13854fa07d96de01744eb5d79b732744423e0
(8) 0x8ccadc04ee75761f1b7f7f047878e180837a681e
(9) 0x8c27818f78c381b7df25fc11c348908230c79d1d

Private Keys
==================
(0) 1a854a2565dac7fd5f6202ba77114d0a0eefc85602e6745627161ad002d598eb
(1) b3f588bf6b2dd21e4a4b7f9b467f6b00fd45f8e17ffe3fdd54a70ea61eac7a51
(2) f1349854c80260ad4daa36e76f10071dbaa8ce0c577503f3764f14b0e7d9dd28
(3) 88a5860e77647ad9b4b1716c133f1ccea43a87c023f4951f12d9258e31867c17
(4) 739e5db6072c9a4b6f3221aaeed313a2c6d76b49f5adc866ec4732ea7b4a004b
(5) aadd156e93cefd5ae2148a765c1abe82b244becbe7c63cce8ccecc2f201618f0
(6) 6f5a02b2dfc710b42ec14965b55300e60eb05f316a1075bdb9b3514b68e5b766
(7) c20cef0d0be0b44b6f6a2a00451a2de618bb6e2e858d456849e8549764231a9b
(8) c0f9e009047fb944d5e007966666af7e2a5aeb509642e89ee6173d93d05cb7ec
(9) 886cd0af87051494487186ebe5d1501bd35431661e572c6df9c3ac2e78f36c2f


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