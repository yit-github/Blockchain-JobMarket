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




















----

root@ip-172-31-39-171:/home/ubuntu# ganache-cli
Ganache CLI v6.1.0 (ganache-core: 2.1.0)

Available Accounts
==================
(0) 0x0043a1274cb2b9b7dee5f377c9c039a26b7bb823
(1) 0x1e4ddcc39c4e9b5bc4ae39b953655d831da16f9a
(2) 0xc12d2110a3e81acd3feaf6e9fe892fffbc01f48c
(3) 0xc06bb3f8580fc80d0875b803d6296cebcd14e0bc
(4) 0x0133ebb91528e0f397554ec91b1598071394903b
(5) 0xa6983a651401d731b2f1b3a040c731b9b0ea316d
(6) 0x52a4f8372c652e1fe57eb7b2056c0fe3e00ae5b1
(7) 0x3bb13a258f7cd4da726c2800a8655c16b5e58b05
(8) 0x754143343d7d23a877fa6356537796d07fd7579c
(9) 0x558f73653d917788d056d29f07eb132da03e327e

Private Keys
==================
(0) e1c34287d0825c9977e189de980453cb9c0210004d164e47dee7b846f8809e0e
(1) d59b35a332d389748e1a1fcc2893e801e8e61e460f4d496ee55b30a1949b0d3b
(2) eb072cd9b03edb6d910f5f94b0cff95bdf8c429b6bc112a67b83538c2890e907
(3) cd60764d973ea37c1d02c4a4559ff7db1e8b0b646eb7b5c0dc6740f6fffb078e
(4) c65ffd9c2b36fe4d4a4f1a4149993ead3b616c3512f3dab184e3e579b70fb48d
(5) dc69a01799813b7b9d7669a4ce2fc18bdfc24dab8341144dffdb7af20d89e3f1
(6) 40d82eee793b928a6e1d657df3d6d29db3845d15efa4b5a651f1a3ca6844c40f
(7) 852edba2148bab5ea314524063429d10339941b808c70c33a1da6e7349eb880f
(8) 8ea08114ecd9bf6b8cc9962eba3524537a5468e40d5c63b1087cad962dd6c99f
(9) 7f72beba3a3482727c4fa69fda06d44cfeaf9d89cf5a9a0c6a29f4c91e924fea

HD Wallet
==================
Mnemonic:      venue goat mouse talent click recycle hood share essay glow bag moment
Base HD Path:  m/44'/60'/0'/0/{account_index}

Listening on localhost:8545
