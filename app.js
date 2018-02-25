if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
web3.eth.defaultAccount = web3.eth.accounts[3];

  var x;

var EmployeeContract = web3.eth.contract([
	{
		"constant": true,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getEmployee",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bytes16"
			},
			{
				"name": "",
				"type": "bytes16"
			},
			{
				"name": "",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getEmployees",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			},
			{
				"name": "_id",
				"type": "uint256"
			},
			{
				"name": "_fName",
				"type": "bytes16"
			},
			{
				"name": "_lName",
				"type": "bytes16"
			},
			{
				"name": "_skill",
				"type": "bytes32[]"
			}
		],
		"name": "setEmployee",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "EmployeeList",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "fName",
				"type": "bytes16"
			},
			{
				"indexed": false,
				"name": "lName",
				"type": "bytes16"
			},
			{
				"indexed": false,
				"name": "skills",
				"type": "bytes32[]"
			}
		],
		"name": "employeeReg",
		"type": "event"
	}
]
);
var Employees = EmployeeContract.at('0xc72c5ebf332c2c7bf5651a6f9b34536503025d46');


var EmployeeEvent = Employees.employeeReg({},'latest');
EmployeeEvent.watch(function (err, result) {
if (!err) {
if (result.blockHash != $("#instrans").html())
    $("#loader").hide();

$("#insTrans").html('Block hash: ' +result.blockHash);
$("#emp_id").html('0'+result.args.id);
$("#emp_fn").html(web3.toAscii(result.args.fName));
$("#emp_ln").html(web3.toAscii(result.args.lName));


for (var i = 0; i < 5; i++) {

    $("#s"+i).html(web3.toAscii(result.args.skills[i]));
}

} else {
$("#loader").hide();
}
});



$("#button").click(function() {
$("#loader").show();

Employees.setEmployee(web3.eth.defaultAccount, $("#id").val(), $("#fName").val(), $("#lName").val(),["java","PHP","javascript"], (err, res) => {
  if (err) {
      $("#loader").hide();
  }
});
});

var EmployerContract = web3.eth.contract([
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "employerList",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			},
			{
				"name": "_country",
				"type": "uint256"
			},
			{
				"name": "_fName",
				"type": "bytes16"
			},
			{
				"name": "_lName",
				"type": "bytes16"
			}
		],
		"name": "setEmployer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getemployers",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getemployer",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bytes16"
			},
			{
				"name": "",
				"type": "bytes16"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "country",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "fName",
				"type": "bytes16"
			},
			{
				"indexed": false,
				"name": "lName",
				"type": "bytes16"
			}
		],
		"name": "employerReg",
		"type": "event"
	}
]
);
var Employer = EmployerContract.at('0xd78e9e47386d689a0cb7391a129e668e552f180c');


var EmployerEvent = Employer.employerReg({},'latest');
EmployerEvent.watch(function (err, result) {
if (!err) {
if (result.blockHash != $("#instrans").html())
    $("#loader").hide();

$("#insTrans").html('Block hash: ' +result.blockHash);
$("#dcountry").html("0"+result.args.country);
$("#fn").html(web3.toAscii(result.args.fName));
$("#ln").html(web3.toAscii(result.args.lName));

} else {
$("#loader").hide();
}
});

$("#button1").click(function() {
$("#loader").show();
Employer.setEmployer(web3.eth.defaultAccount, $("#country").val(), $("#efName").val(), $("#elName").val(), (err, res) => {
  if (err) {
      $("#loader").hide();
  }
});
});








/*
var ProfileContract = web3.eth.contract([
	{
		"constant": true,
		"inputs": [],
		"name": "getprofiles",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "profileList",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			},
			{
				"name": "_hourlyRate",
				"type": "uint256"
			},
			{
				"name": "_description",
				"type": "bytes16"
			},
			{
				"name": "_skill",
				"type": "bytes32[]"
			}
		],
		"name": "setprofile",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getprofile",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bytes16"
			},
			{
				"name": "",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "hourlyRate",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "description",
				"type": "bytes16"
			},
			{
				"indexed": false,
				"name": "skills",
				"type": "bytes32[]"
			}
		],
		"name": "set_profile",
		"type": "event"
	}
]
);

var employee_profile= ProfileContract.at('0x6e59f62870b923ffb32a4f9c35606af0f554bf32');

var EmpProfileEvent = employee_profile.set_profile({},'latest');

EmpProfileEvent.watch(function (err, result) {
if (!err) {
if (result.blockHash != $("#instrans").html())
    $("#loader").hide();

$("#insTrans").html('Block hash: ' +result.blockHash);
$("#ra").html('0'+result.args.hourlyRate);
$("#de").html(web3.toAscii(result.args.description));

for (var i = 0; i < 5; i++) {

    $("#s"+i).html(web3.toAscii(result.args.skills[i]));
}

} else {
$("#loader").hide();
}
});



employee_profile.getprofile('0x5aadc8404661250699d99f1e98ce7c0aff9dafbe',(error, result) => {
            if(!error)
                {
              x = result;
                    $("#s1").html(x[0]+"    "+web3.toAscii(x[1]));

                }
            else
                console.error(error);
        });

$("#sbutton").click(function() {
$("#loader").show();
employee_profile.setprofile(web3.eth.defaultAccount, $("#rate").val(), $("#description").val(),["java","PHP"], (err, res) => {
  if (err) {
      $("#loader").hide();
  }
});
});

*/



function upload() {
      const reader = new FileReader();
      reader.onloadend = function() {
        const ipfs = window.IpfsApi('localhost', 5001) // Connect to IPFS
        const buf = buffer.Buffer(reader.result) // Convert data into buffer
        ipfs.files.add(buf, (err, result) => { // Upload buffer to IPFS
          if(err) {
            console.error(err)
            return
          }
          let url = `https://ipfs.io/ipfs/${result[0].hash}`
          console.log(`Url --> ${url}`)
          document.getElementById("url").innerHTML= url
          document.getElementById("url").href= url
          document.getElementById("output").src = url
        })
      }
      const photo = document.getElementById("photo");
      reader.readAsArrayBuffer(photo.files[0]); // Read Provided File
    }

var jobContract = web3.eth.contract([
	{
		"constant": true,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getApplications",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "JobList",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "profileList",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getprofiles",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getprofile",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bytes16"
			},
			{
				"name": "",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getpostJobs",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "getpostJob",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bytes16"
			},
			{
				"name": "",
				"type": "bytes16"
			},
			{
				"name": "",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getAcepptedFreelancers",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "freelancerList",
				"type": "address[]"
			}
		],
		"name": "AcceptFreelancers",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			},
			{
				"name": "_hourlyRate",
				"type": "uint256"
			},
			{
				"name": "_description",
				"type": "bytes16"
			},
			{
				"name": "_skill",
				"type": "bytes32[]"
			}
		],
		"name": "setprofile",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			},
			{
				"name": "i",
				"type": "uint256"
			},
			{
				"name": "_list",
				"type": "address[]"
			}
		],
		"name": "AcceptJobs",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "applyList",
				"type": "address[]"
			}
		],
		"name": "ApplyJob",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "i",
				"type": "uint256"
			},
			{
				"name": "_employeeAddress",
				"type": "address"
			},
			{
				"name": "list",
				"type": "address[]"
			}
		],
		"name": "ApplyJobs",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "hourlyRate",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "description",
				"type": "bytes16"
			},
			{
				"indexed": false,
				"name": "skills",
				"type": "bytes32[]"
			}
		],
		"name": "set_profile",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "hourlyRate",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "JobTitle",
				"type": "bytes16"
			},
			{
				"indexed": false,
				"name": "Description",
				"type": "bytes16"
			},
			{
				"indexed": false,
				"name": "required_skills",
				"type": "bytes32[]"
			}
		],
		"name": "PostJob",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			},
			{
				"name": "_hourlyRate",
				"type": "uint256"
			},
			{
				"name": "_JobTitle",
				"type": "bytes16"
			},
			{
				"name": "_Description",
				"type": "bytes16"
			},
			{
				"name": "_skill",
				"type": "bytes32[]"
			}
		],
		"name": "setpostJob",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
);

var Job = jobContract.at('0x79b00ed94766883a9da0df16c0ac3d06ddcc133d');
//contract address ,this is where the smart contract actually lives.

$("#pbutton").click(function() {
$("#loader").show();
Job.setpostJob("employer_address1", $("#erate").val(), $("#ejobtitle").val(), $("#edescrip").val(),["dgg","dgh"], (err, res) => {
  if (err) {
      $("#loader").hide();
  }
});
});
/*
var post_jobEvent = Job.PostJob({},'latest');
post_jobEvent.watch(function (err, result) {
if (!err) {
if (result.blockHash != $("#instrans").html())
    $("#loader").hide();

$("#insTrans").html('Block hash: ' +result.blockHash);
//$("#r").html("0"+result.args.hourlyRate);
//$("#j").html(web3.toAscii(result.args.JobTitle));
$("#d").html(web3.toAscii(result.args.Description));

} else {
$("#loader").hide();
}
});
*/


for (let i=0; i<7; i++){
Job.getpostJob(i,(error, result) => {
            if(!error)
                {
                    $("#i"+i).html(result[0]+'    '+web3.toAscii(result[1])+'   '+web3.toAscii(result[2]));
                }
            else
                console.error(error);
        });
      }



for (let i=0; i<7; i++){
$("#b"+i).click(function() {
$("#loader").show();
Job.ApplyJobs(i,'employee_address1',[], (err, res) => {
  if (err) {
      $("#loader").hide();
  }
});
});
}

for (let i=0; i<7; i++){
Job.getApplications("employer_address1",(error, result) => {
            if(!error)
                {

                for (let j=0; j<7; j++){
                  x=result[j];
                Job.getprofile(x,(error, result) => {
                            if(!error)
                                {
                                   $("#application"+j).html(result[0]+"    "+web3.toAscii(result[1]));
                                }
                            else
                                console.error(error);
                        });}
                }
            else
                console.error(error);
        });
}





  for (let i=0; i<7; i++){
      $("#acc"+i).click(function() {
      $("#loader").show();
      Job.AcceptJobs(i,'employer_address1',[], (err, res) => {
          if (err) {
              $("#loader").hide();
          }
    });
    });
  }


$("#sbutton").click(function() {
$("#loader").show();
Job.setprofile('employee_address1', $("#rate").val(), $("#description").val(),["java","PHP"], (err, res) => {
  if (err) {
      $("#loader").hide();
  }
});
});
