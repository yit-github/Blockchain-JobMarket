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
(0) c4e0f0b8991715a8eabb05a3491a109e67b191156a2c3e36383acdf31fef82b5
(1) e43eddc5c74a2a048777458a0557a83eaf910301d331bba5dd50e3946c55b03e
(2) 2f04e9f6dbfb7a26076bb370e2c6585dc9fae42adfe04b0caa5ea0dadd4be935
(3) 43aa2a115a94c0419218e96838cde37bb2184410704c1c570ae70eaefce8091b
(4) 2efc5ac1162ef705e5e543aad0c8537c72740211428a22d4c25aded7ef38e4ce
(5) b9377af40344dd626b041e272f86e426c060159d92e7019d4aeeb4ef771c2a24
(6) 2aae44d7cf25402e2297f8ece854a86f6b88aa7e2bf971e4751dda5b6ac4a226
(7) e7ad06a1e972ee14c9c3d8abe163aa39b82efef886529d7981ae75ab7752aab8
(8) ce5ede6a3d316530cf47e3cd904ee690db7660a2a2283e0ced95305c52d83aec
(9) e700c4e16bf5808105e88541f36f5eafb5c77665673622e8caf6e0214ba86a92


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