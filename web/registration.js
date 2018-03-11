
//truffle- 7545 ganache- 8545
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

abi = JSON.parse('[{"constant":false,"inputs":[{"name":"_employerCode","type":"address"},{"name":"_name","type":"string"},{"name":"_requiredSkills","type":"uint8[]"}],"name":"setJob","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getEmployee","outputs":[{"name":"name","type":"string"},{"name":"profileIds","type":"uint256[]"},{"name":"status","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getJobIds","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getEmployerCodes","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_name","type":"string"}],"name":"setEmployee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getEmployer","outputs":[{"name":"name","type":"string"},{"name":"jobIds","type":"uint256[]"},{"name":"status","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_ad1","type":"address"},{"name":"_ad2","type":"address"},{"name":"_ad3","type":"address"}],"name":"setInitialData","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getProileIds","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_name","type":"string"}],"name":"setEmployer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"getJob","outputs":[{"name":"employerCode","type":"address"},{"name":"name","type":"string"},{"name":"requiredSkills","type":"uint8[]"},{"name":"appliedEmployeeCodes","type":"address[]"},{"name":"status","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_employeeCode","type":"address"},{"name":"_name","type":"string"},{"name":"_skills","type":"uint8[]"}],"name":"setProfile","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"getProfile","outputs":[{"name":"employeeCode","type":"address"},{"name":"name","type":"string"},{"name":"skills","type":"uint8[]"},{"name":"status","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getEmployeeCodes","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"}]');

MContract = web3.eth.contract(abi);

// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = MContract.at('0x345ca3e014aaf5dca488057592ee47305d9b3e10');

//web3.eth.defaultAccount = web3.eth.accounts[0];

$("#employeeRegistrationButtonId").click(function () {
    console.log("sdfas");
});

// function voteForCandidate() {
//     candidateName = $("#candidate").val();
//     contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0]}, function() {
//         let div_id = candidates[candidateName];
//         $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
//     });
// }
//
// $(document).ready(function() {
//     candidateNames = Object.keys(candidates);
//     for (var i = 0; i < candidateNames.length; i++) {
//         let name = candidateNames[i];
//         let val = contractInstance.totalVotesFor.call(name).toString()
//         $("#" + candidates[name]).html(val);
//     }
// });
