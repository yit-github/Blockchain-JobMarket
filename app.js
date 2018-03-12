if (typeof web3 !== 'undefined')
{
    web3 = new Web3(web3.currentProvider);
}
else
{
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
web3.eth.defaultAccount = web3.eth.accounts[0];

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
				"name": "email",
				"type": "bytes16"
			},
			{
				"name": "phoneNo",
				"type": "bytes16"
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
				"name": "email",
				"type": "bytes16"
			},
			{
				"indexed": false,
				"name": "phoneNo",
				"type": "bytes16"
			}
		],
		"name": "employeeReg",
		"type": "event"
	}
]
);
var Employees = EmployeeContract.at('0xe79bb7e5a76631eb4971ce97c2cc6916432541f4');

var EmployeeEvent = Employees.employeeReg({},'latest');
EmployeeEvent.watch(function (err, result) {
if (!err) {
if (result.blockHash != $("#instrans").html())
    $("#loader").hide();

    $("#insTrans").html('Block hash: ' +result.blockHash);
    $("#emp_id").html('0'+result.args.id);
    $("#emp_fn").html(web3.toAscii(result.args.fName));
    $("#emp_ln").html(web3.toAscii(result.args.lName));
    $("#mail").html(web3.toAscii(result.args.email));
    $("#ph").html(web3.toAscii(result.args.phoneNo));

} else {
$("#loader").hide();
}
});



$("#button").click(function() {
$("#loader").show();
var user=1;
Employees.setEmployee(web3.eth.defaultAccount,user, $("#fName").val(), $("#lName").val(),$("#email").val(),$("#phone").val(), (err, res) => {
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
var Employer = EmployerContract.at('0x516f5b882839ffbe3990aa9e920fd53a4ac841b7');
var EmployerEvent = Employer.employerReg({},'latest');



  Employees.getEmployee(web3.eth.defaultAccount,(error, result) => {
              if(!error)
                  {
                      $("#emp_id").html("0"+result[0]);
                      $("#emp_fn").html(web3.toAscii(result[1]));
                      $("#emp_ln").html(web3.toAscii(result[2]));
                      $("#mail").html(web3.toAscii(result[3]));
                      $("#ph").html(web3.toAscii(result[4]));
                  }
              else
                  console.error(error);
          });



$("#button1").click(function() {
$("#loader").show();
  Employer.setEmployer(web3.eth.defaultAccount, $("#country").val(), $("#efName").val(), $("#elName").val(), (err, res) => {
      if (err)
       {
          $("#loader").hide();
       }
  });
   window.location.replace("https://www.tutorialrepublic.com/");
});

  var x="";
  function upload() {
        const reader = new FileReader();
        reader.onloadend = function() {
        const ipfs = window.IpfsApi('localhost', 5001) // Connect to IPFS
        const buf = buffer.Buffer(reader.result) // Convert data into buffer
        ipfs.files.add(buf, (err, result) => { // Upload buffer to IPFS
        if(err)
            {
              console.error(err)
              return
            }
        var url = `https://ipfs.io/ipfs/${result[0].hash}`

        console.log(`Url --> ${url}`)
            document.getElementById("url").innerHTML= url
            document.getElementById("url").href=url
            document.getElementById("output").src = url
          })
        }
        const photo = document.getElementById("photo");
        reader.readAsArrayBuffer(photo.files[0]); // Read Provided File
  }

var jobContract = web3.eth.contract([
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
				"name": "_descrip",
				"type": "bytes16"
			},
			{
				"name": "_skill",
				"type": "bytes32[]"
			},
			{
				"name": "_hash",
				"type": "bytes16"
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
				"type": "bytes16"
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
				"name": "hashj",
				"type": "bytes16"
			}
		],
		"name": "setpostJob",
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
				"name": "hashj",
				"type": "bytes16"
			}
		],
		"name": "PostJob",
		"type": "event"
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "hourlyRate",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "descrip",
				"type": "bytes16"
			},
			{
				"indexed": false,
				"name": "skills",
				"type": "bytes32[]"
			},
			{
				"indexed": false,
				"name": "hashp",
				"type": "bytes16"
			}
		],
		"name": "set_profile",
		"type": "event"
	}
]
);

var Job = jobContract.at('0xa877b7519ab459f78eb1c1b39a64fb5672490b8c');

$("#pbutton").click(function() {
$("#loader").show();
x="hash";
Job.setpostJob(web3.eth.defaultAccount, $("#erate").val(), $("#ejobtitle").val(), $("#edescrip").val(),x,["java","PHP"], (err, res) => {
  if (err)
    {
        $("#loader").hide();
    }
  });
});


for (let i=0; i<7; i++){
  Job.getpostJob(i,(error, result) => {
              if(!error)
                  {
                      $("#i"+i).html(result[0]+'     '+web3.toAscii(result[1])+'     '+web3.toAscii(result[2])+'   '+web3.toAscii(result[3]));
                  }
              else
                  console.error(error);
          });
}

Job.getpostJob(1,(error, result) => {
            if(!error)
                {
                    $("#j1").html(result[0];
                    $("#j2").html(web3.toAscii(result[1]);
                    $("#j3").html(web3.toAscii(result[2]);
                    $("#j4").html(web3.toAscii(result[3]));
                    $("#j5").html(web3.toAscii(result[5][0])+','+web3.toAscii(result[5][1]));
                }
            else
                console.error(error);
        });


for (let i=0; i<7; i++){
    $("#b"+i).click(function() {
    $("#loader").show();
      Job.ApplyJobs(i,"0xf19a67c4b76efb014bc6a7df5f3e8cdde1ffeffb",[], (err, res) => {
          if (err) {
              $("#loader").hide();
          }
      });
    });
}

for (let i=0; i<7; i++){
Job.getApplications(web3.eth.defaultAccount,(error, result) => {
            if(!error)
                {
                for (let j=0; j<7; j++){
                  x=result[j];
                Job.getprofile(x,(error, result) => {
                            if(!error)
                                {
                                   $("#application"+j+"1").html("0"+result[0]);
                                   $("#application"+j+"2").html(web3.toAscii(result[1]));
                                    $("#application"+j+"3").html(web3.toAscii(result[2][0])+','+web3.toAscii(result[2][1]));
                                   $("#application"+j+"4").html(web3.toAscii(result[3]));

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
      Job.AcceptJobs(i,web3.eth.defaultAccount,[], (err, res) => {
          if (err) {
              $("#loader").hide();
          }
        });
    });
}
Job.getprofile(web3.eth.defaultAccount,(error, result) => {
            if(!error)
                {
                   $("#a1").html("0"+result[0]);
                   $("#a2").html(web3.toAscii(result[1]));
                   $("#a3").html(web3.toAscii(result[2][0])+','+web3.toAscii(result[2][1]));
                   $("#a4").html(web3.toAscii(result[3]));

                }
            else
                console.error(error);
        });
  $("#sbutton").click(function() {
  $("#loader").show();
  Job.setprofile(web3.eth.defaultAccount, $("#rate").val(), $("#description").val(),["java","PHP"],"ipfs", (err, res) => {
    if (err) {
        $("#loader").hide();
    }
    });
  });
$("#button").click(function() {
$("#loader").show();
Job.setprofile(web3.eth.defaultAccount, $("#rate").val(), $("#description").val(),["java","PHP"],"ipfs", (err, res) => {
  if (err) {
      $("#loader").hide();
  }
});
});
