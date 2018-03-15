if (typeof web3 !== 'undefined')
{
    web3 = new Web3(web3.currentProvider);
}
else
{
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
web3.eth.defaultAccount = web3.eth.accounts[0];



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
var Employees = EmployeeContract.at('0x010ca7635ae67e841b9dbe2acc6bf671f6185cf0');

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




var EmployerContract = web3.eth.contract([
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
				"type": "uint256"
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
		"name": "edit_profile",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
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
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
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
		"constant": true,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getJobId",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
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
				"name": "_usertype",
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
				"name": "_email",
				"type": "bytes16"
			},
			{
				"name": "_company",
				"type": "bytes16"
			},
			{
				"name": "_country",
				"type": "bytes16"
			},
			{
				"name": "_add",
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
				"type": "uint256[]"
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
				"name": "_id",
				"type": "uint256"
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
				"name": "_id",
				"type": "uint256"
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
				"type": "address"
			},
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
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "usertype",
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
				"name": "company",
				"type": "bytes16"
			},
			{
				"indexed": false,
				"name": "country",
				"type": "bytes16"
			},
			{
				"indexed": false,
				"name": "add",
				"type": "bytes16"
			}
		],
		"name": "employerReg",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "employer_address",
				"type": "address"
			},
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
			},
			{
				"indexed": false,
				"name": "skill",
				"type": "bytes32[]"
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
var Employer = EmployerContract.at('0xa94b60110929dc588bdeb1852dcb6cdc1cad5274');
var EmployerEvent = Employer.employerReg({},'latest');

$("#button1").click(function() {
$("#loader").show();
var usert=2;
  Employer.setEmployer(web3.eth.defaultAccount,usert,$("#efName").val(), $("#elName").val(),$("#email").val(),$("#company").val(),$("#country").val(),$("#Address").val(), (err, res) => {
      if (err)
       {
          $("#loader").hide();
       }
  });

});
/*

Employer.getemployer(web3.eth.defaultAccount,(error, result) => {
            if(!error)
                {
                    $("#employer_type").html("0"+result[0]);
                    $("#employer_fn").html(web3.toAscii(result[1]));
                    $("#employer_ln").html(web3.toAscii(result[2]));
                    $("#employer_mail").html(web3.toAscii(result[3]));
                    $("#com").html(web3.toAscii(result[4]));
                    $("#employer_country").html(web3.toAscii(result[5]));
                    $("#employer_add").html(web3.toAscii(result[6]));
                }
                else
              console.error(error);

          });
*/



  Employer.getJobId(web3.eth.defaultAccount,(error, result) => {
              if(!error)
                  {
                    for (let j=0; j<7; j++){
                      var y=result[j];
                      $("#j1"+j).html(""+y);
                    Employer.getpostJob(y,(error, result) => {
                                  if(!error)
                                      {
                                          $("#j7"+j).html("0"+result[1]);
                                          $("#j2"+j).html(web3.toAscii(result[2]));
                                          $("#j3"+j).html(web3.toAscii(result[3]));
                                          $("#j4"+j).html(web3.toAscii(result[4]));
                                          $("#j5"+j).html(web3.toAscii(result[5][0])+" , "+web3.toAscii(result[5][1]));
                                          $("#j6"+j).html(result[0]);
                                        }
                                  else
                                      console.error(error);
                              });
                  }
                }
              else
                console.error(error);
          });


          Employer.getJobId(web3.eth.defaultAccount,(error, result) => {
                if(!error)
                  {
          for (let i=0; i<7; i++){
              var z=result[i];
          Employer.getApplications(z,(error, result) => {
                      if(!error)
                          {
                          for (let j=0; j<7; j++){
                            var x=result[j];
                        Employer.getprofile(x,(error, result) => {
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
              }
                  else
                      console.error(error);
              });




  $("#pbutton").click(function() {
  $("#loader").show();
  Employer.setpostJob(web3.eth.defaultAccount, $("#erate").val(), $("#ejobtitle").val(), $("#edescrip").val(),"hash",["java","PHP"], (err, res) => {
    if (err)
      {
          $("#loader").hide();
      }
    });
  });


$("#jeditbutton").click(function() {
$("#loader").show();
x="hash";
Employer.edit_postJob($("#edit_id").val(), $("#erate_e").val(), $("#ejobtitle_e").val(), $("#edescrip_e").val(),"hash",["java","PHP"], (err, res) => {
  if (err)
    {
        $("#loader").hide();
    }
  });
});

for (let i=0; i<7; i++){
Employer.getpostJob(i,(error, result) => {
              if(!error)
                  {
                      $("#i"+i+"2").html(result[0]);
                      $("#i"+i+"2").html("0"+result[1]);
                      $("#i"+i+"1").html(web3.toAscii(result[2]));
                      $("#i"+i+"3").html(web3.toAscii(result[3]));
                      $("#i"+i+"4").html(web3.toAscii(result[4]));
                      $("#i"+i+"5").html(web3.toAscii(result[5][0])+","+web3.toAscii(result[5][1]));
                  }
              else
                  console.error(error);
          });
}

for (let i=0; i<7; i++){
  $("#b"+i).click(function() {
  $("#loader").show();
    Employer.ApplyJobs(i,web3.eth.defaultAccount,[], (err, res) => {
      if (err) {
      $("#loader").hide();
      }
    });
    });
}



for (let i=0; i<7; i++){
      $("#acc"+i).click(function() {
      $("#loader").show();
    Employer.AcceptJobs(i,web3.eth.defaultAccount,[], (err, res) => {
          if (err) {
              $("#loader").hide();
          }
        });
    });
}


Employer.getprofile(web3.eth.defaultAccount,(error, result) => {
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
Employer.edit_profile(web3.eth.defaultAccount, $("#edit_rate").val(), $("#edit_description").val(),["java","PHP"],"ipfs", (err, res) => {
  if (err) {
      $("#loader").hide();
  }
  });
});

$("#button").click(function() {
$("#loader").show();
Employer.setprofile(web3.eth.defaultAccount, $("#rate").val(), $("#description").val(),["java","PHP"],"ipfs", (err, res) => {
  if (err) {
      $("#loader").hide();
  }
});
});
