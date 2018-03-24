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


aws ------

npm i -g ganache-cli

start:
ganache-cli
default port: 8545

jana@janaPc:~/installs/idea/idea2016$ ganache-cli
Ganache CLI v6.1.0 (ganache-core: 2.1.0)

Available Accounts
==================
(0) 0x492fb7b9ea5557c807ab7f892bd9a9ef373d9eb6
(1) 0xe914d537883e9d71d3cd991fa4a8083554206423
(2) 0x643b2a6a336f982fc96620851e3df0ddb04f9db8
(3) 0xfffc26bffec702bc8e51e0ac12e72e2179b3d9a0
(4) 0xd3e276b6e5e8c18827010b1f8687bd96f5180eec
(5) 0xd159cf8ef5c120ff15854aa39a479c0c0c87d7c8
(6) 0x4ae377123365538ff565d25b48dcd53520a00000
(7) 0x8d9873d1a17e8f30ee88f5d07cffa35d8e3e7b8d
(8) 0x566aacdc0b200ec28c6b8b7b27f9df6e2d265795
(9) 0x10acbc6b993d5d5465ddb30e6258536c742ef300

Private Keys
==================
(0) 16642fd49c0f017ee4e85dd5df47fe4cae93db558559519dbb03b7abbba3bd0b
(1) f7c81a0db5fab3f20d08f91627866c7d58e6c97e8f25e64ee300bc47443eef6d
(2) 839365eb8736f80c079e4bff58757eada543ce621c513d3ca28a72f3cdd95fab
(3) 632c4958ca5a9f40b113405651eb8fb5dfb0c8382a7c8dccc78903fbb465856d
(4) 3a1af4b24231b1ed1582a34d1bee5869919e66e83bb7aa177efa3af533d590d8
(5) 1d416432077bb133219d5c4d70db7fb41143c7c6c8c02f4ecc5d452f9ea98185
(6) f07f183bf0a5be0b5b50b49e5f17245282319e25355b5525cba7701ace1b3e10
(7) 1add707d912f4b17530a621c3a25d12d48fceb483b08aefb7afb9634da722614
(8) ac7c4063657ee5f31383fa1bdd30a9f8d2d3fb78e030bf28b09edb45c27eeb68
(9) 25d932a01261e7603ee6c5443780af2aa102ef0c297f0649bf26d5d7e1288b7a

HD Wallet
==================
Mnemonic:      change day render desert shell hurry advice escape peasant pet avoid boil
Base HD Path:  m/44'/60'/0'/0/{account_index}

Listening on localhost:8545
