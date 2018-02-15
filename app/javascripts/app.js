// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'


import employee_artifacts from '../../build/contracts/Employee.json'
var Employee = contract(employee_artifacts);

$("#button").click(function() {
           Employee.deployed().then(function(contractInstance) {
	   contractInstance.setEmployee(web3.eth.accounts[0],$("#id").val(),$("#fname").val(), $("#lname").val());
		})
});

   $( document ).ready(function() {
     if (typeof web3 !== 'undefined') {
       console.warn("Using web3 detected from external source like Metamask")
       // Use Mist/MetaMask's provider
       window.web3 = new Web3(web3.currentProvider);
     } else {
       console.warn("No web3 detected.Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }


      Employee.setProvider(web3.currentProvider);
        /*  Employee.deployed().then(function(contractInstance) {
            contractInstance.setEmployee.call(web3.eth.accounts[0],$("#id").val(),$("#fname").val(),$("#lname").val()
            );
         });)*/
       Employee.deployed().then(function(contractInstance) {
      contractInstance.getEmployee.call(web3.eth.accounts[0]).then(function(error, result){
            if(!error)
                {
                    $("#no").html(result[0]);
                      $("#fn").html("result[1]");
                        $("#ln").html(result[2]);
                    console.log(result);
                }
            else
                console.error(error);
        });

    })
});






/*import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

/*
 * When you compile and deploy your Voting contract,
 * truffle stores the abi and deployed address in a json
 * file in the build directory. We will use this information
 * to setup a Voting abstraction. We will use this abstraction
 * later to create an instance of the Voting contract.
 * Compare this against the index.js from our previous tutorial to see the difference
 * https://gist.github.com/maheshmurthy/f6e96d6b3fff4cd4fa7f892de8a1a1b4#file-index-js

 import employee_artifacts from '../../build/contracts/Employee.json'
 var Employee = contract(employee_artifacts);


import voting_artifacts from '../../build/contracts/Voting.json'

var Voting = contract(voting_artifacts);
let candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

window.voteForCandidate = function(candidate) {
  let candidateName = $("#candidate").val();
  try {
    $("#msg").html("Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.")
    $("#candidate").val("");
         Voting.deployed().then(function(contractInstance) {
         contractInstance.voteForCandidate(candidateName, {gas: 140000, from: web3.eth.accounts[0]}).then(function() {
           let div_id = candidates[candidateName];
           return contractInstance.totalVotesFor.call(candidateName).then(function(v) {
             $("#" + div_id).html(v.toString());
             $("#msg").html("");
           });
         });
       });
     } catch (err) {
       console.log(err);
     }
   }

window.setEmployee= function(name) {
  let id = $("#id").val();
  let fname = $("#fname").val();
  let lname = $("#lname").val();

  try {
    $("#msg").html("name has been submitted. Please wait.")
    $("#id").val("");
    $("#fname").val("");
    $("#lname").val("");

       Employee.deployed().then(function(contractInstance) {
         contractInstance.setEmployee(id,fname,lname, {gas: 140000, from: web3.eth.accounts[0]}).then(function() {
           let div_id = x;
        contractInstance.setEmployee.call(web3.eth.accounts[0],id,fname,lname).then(function(v) {
             $("#" + div_id).html(v.toString());
             $("#msg").html("");
           });
         });
       });
     } catch (err) {
       console.log(err);
     }
   }

   $( document ).ready(function() {
     if (typeof web3 !== 'undefined') {
       console.warn("Using web3 detected from external source like Metamask")
       // Use Mist/MetaMask's provider
       window.web3 = new Web3(web3.currentProvider);
     } else {
       console.warn("No web3 detected.Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

    Employee.setProvider(web3.currentProvider);
    $("#button").click(function() {
           contractInstance.setEmployee($("#id").val(),$("#fname").val(), $("#lname").val());
       });
    Employee.deployed().then(function(contractInstance) {
      contractInstance.getEmployee.call(web3.eth.accounts[0]).then(function(v) { $("#").html(v);
      });
    })
});*/
