$(function() {
    $(window).load(function() {
        App.init();

        $("#registerEmployeeButtonId").click(App.setEmployee);
        $("#viewEmployeeButtonId").click(App.getEmployee);
        $("#registerProfileButtonId").click(App.setProfile);
        $("#viewProfileButtonId").click(App.getProfile);
        $("#registerEmployerButtonId").click(App.setEmployer);
        $("#viewEmployerButtonId").click(App.getEmployer);
        $("#createJobButtonId").click(App.setJob);
        $("#viewJobButtonId").click(App.getJob);
        $("#findEmployeeProfilesByJobButtonId").click(App.findEmployeeProfilesByJob);
        $("#findJobsByProfileButtonId").click(App.findJobsByProfile);
        $("#findJobsByEmployeeButtonId").click(App.findJobsByEmployee);
        $("#setInitialDataButtonId").click(App.setInitialData);
    });
});

App = {
    web3Provider: null,
    contracts: {},

    init: function() {
        return App.initWeb3();
    },

    initWeb3: function () {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
        } else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(App.web3Provider);
        return App.initContract();
    },

    initContract: function() {
        $.getJSON('Market.json', function(data) {
            let MarketArtifact = data;
            App.contracts.Market = TruffleContract(MarketArtifact);
            App.contracts.Market.setProvider(App.web3Provider);
        });
    },

    setEmployee: function(event) {
        event.preventDefault();

        let employeeName = $("#employeeNameTextId").val().trim();
        console.log("Employee Name: " + employeeName);

        let marketInstance;

        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.error("Err while getting accounts");
                console.log(error);
            }

            let account = accounts[0];
            let employeeCode;

            App.contracts.Market.deployed(

            ).then(function(instance) {
                console.log("setEmployee");
                marketInstance = instance;
                return marketInstance.setEmployee(employeeName, {from: account});
            }).then(function(result) {
                console.log("getEmployeeCodes");
                return marketInstance.getEmployeeCodes.call();
            }).then(function (employeeCodes) {
                console.log("getEmployee, codes:" + employeeCodes);
                employeeCode = employeeCodes[employeeCodes.length-1];
                console.log("code: " + employeeCode);
            }).catch(function(err) {
                console.error("Err while setEmployee");
                console.log(err.message);
            });
        });
    },

    getEmployee: function(event) {
        console.log("getEmployee");
        event.preventDefault();

        let employeeCode = $("#employeeCodeTextId").val().trim();
        console.log("employeeCode:" + employeeCode);

        let marketInstance;

        App.contracts.Market.deployed(
        ).then(function (instance) {
            console.log("getEmployee, instance:", instance);
            marketInstance = instance;
            return marketInstance.getEmployee(employeeCode);
        }).then(function (employee) {
            console.log("employee: " + employee);
            $("#retrievedEmployeeNameTextId").text(employee[0]);
            $("#retrievedEmployeeProfileIdsTextId").text(employee[1]);
            $("#retrievedEmployeeDefaultProfileIdTextId").text(employee[2]);
            $("#retrievedEmployeeStatusTextId").text(employee[3]);
        }).catch(function(err) {
            console.error("Err while getEmployee");
            console.log(err.message);
        });
    },

    setProfile: function(event) {
        event.preventDefault();

        let profileName = $("#profileNameTextId").val().trim();
        console.log("Profile Name: " + profileName);

        let cvHash = $("#cvHashId").text().trim();
        console.log("cvHash: " + cvHash);

        let skills = [];
        if($("#checkBoxJavaId").is(':checked') === true) {
            skills.push(0);
        }
        if($("#checkBoxJsId").is(':checked') === true) {
            skills.push(1);
        }
        if($("#checkBoxMySQLId").is(':checked') === true) {
            skills.push(2);
        }
        if($("#checkBoxMongoId").is(':checked') === true) {
            skills.push(3);
        }

        let defaultProfile = $("#defaultProfileCheckId").is(':checked');
        console.log("defaultProfile: " + defaultProfile);

        let marketInstance;

        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.error("Err while getting accounts");
                console.log(error);
            }

            let account = accounts[0];

            App.contracts.Market.deployed().then(function(instance) {
                console.log("setProfile");
                marketInstance = instance;
                return marketInstance.setProfile(profileName, skills, cvHash, defaultProfile, {from: account});
            }).then(function(result) {
                console.log("getAllProfileIds");
                return marketInstance.getAllProfileIds.call();
            }).then(function (profileIds) {
                console.log("profileIds: " + profileIds);
            }).catch(function(err) {
                console.error("Err while setProfile");
                console.log(err.message);
            });
        });
    },

    getProfile: function(event) {
        console.log("getProfile");
        event.preventDefault();

        let profileId = $("#profileIdTextId").val().trim();
        console.log("profileId:" + profileId);

        let marketInstance;

        App.contracts.Market.deployed(
        ).then(function (instance) {
            console.log("getProfile, instance:", instance);
            marketInstance = instance;
            return marketInstance.getProfile(profileId);
        }).then(function (profile) {
            console.log("profile: " + profile);
            $("#retrievedProfileEmployeeCodeTextId").text(profile[0]);
            $("#retrievedProfileNameTextId").text(profile[1]);
            $("#retrievedProfileSkillsTextId").text(profile[2]);
            $("#retrievedProfileCvHashTextId").text(profile[3]);
            $("#retrievedProfileStatusTextId").text(profile[4]);
        }).catch(function(err) {
            console.error("Err while getProfile");
            console.log(err.message);
        });
    },

    setEmployer: function(event) {
        event.preventDefault();

        let employerName = $("#employerNameTextId").val().trim();
        console.log("Employer Name: " + employerName);

        let marketInstance;

        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.error("Err while getting accounts");
                console.log(error);
            }

            let account = accounts[0];
            let employerCode;

            App.contracts.Market.deployed(

            ).then(function(instance) {
                console.log("setEmployer");
                marketInstance = instance;
                return marketInstance.setEmployer(employerName, {from: account});
            }).then(function(result) {
                console.log("getEmployerCodes");
                return marketInstance.getEmployerCodes.call();
            }).then(function (employerCodes) {
                console.log("getEmployer, codes:" + employerCodes);
                employerCode = employerCodes[employerCodes.length-1];
                console.log("last code: " + employerCode);
            }).catch(function(err) {
                console.error("Err while setEmployer");
                console.log(err.message);
            });
        });
    },

    getEmployer: function(event) {
        console.log("getEmployer");
        event.preventDefault();

        let employerCode = $("#employerCodeTextId").val().trim();
        console.log("employerCode:" + employerCode);

        let marketInstance;

        App.contracts.Market.deployed(
        ).then(function (instance) {
            console.log("getEmployer, instance:", instance);
            marketInstance = instance;
            return marketInstance.getEmployer(employerCode);
        }).then(function (employer) {
            console.log("employer: " + employer);
            $("#retrievedEmployerNameTextId").text(employer[0]);
            $("#retrievedEmployerJobIdsTextId").text(employer[1]);
            $("#retrievedEmployerStatusTextId").text(employer[2]);
        }).catch(function(err) {
            console.error("Err while getEmployer");
            console.log(err.message);
        });

    },

    setJob: function(event) {
        event.preventDefault();

        let jobName = $("#jobNameTextId").val().trim();
        console.log("jobName:" + jobName);

        let skills = [];
        if($("#checkBoxJavaId").is(':checked') === true) {
            skills.push(0);
        }
        if($("#checkBoxJsId").is(':checked') === true) {
            skills.push(1);
        }
        if($("#checkBoxMySQLId").is(':checked') === true) {
            skills.push(2);
        }
        if($("#checkBoxMongoId").is(':checked') === true) {
            skills.push(3);
        }

        let marketInstance;

        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.error("Err while getting accounts");
                console.log(error);
            }

            let account = accounts[0];

            App.contracts.Market.deployed().then(function(instance) {
                console.log("setJob");
                marketInstance = instance;
                return marketInstance.setJob(jobName, skills, {from: account});
            }).then(function(result) {
                console.log("getAllJobIds");
                return marketInstance.getAllJobIds.call();
            }).then(function (jobIds) {
                console.log("jobIds:" + jobIds);
            }).catch(function(err) {
                console.error("Err while setJob");
                console.log(err.message);
            });
        });
    },

    getJob: function(event) {
        console.log("getJob");
        event.preventDefault();

        let jobId = $("#jobIdTextId").val().trim();
        console.log("jobId:" + jobId);

        let marketInstance;

        App.contracts.Market.deployed(
        ).then(function (instance) {
            console.log("getJob, instance:", instance);
            marketInstance = instance;
            return marketInstance.getJob(jobId);
        }).then(function (job) {
            console.log("job: " + job);
            $("#retrievedJobEmployerCodeTextId").text(job[0]);
            $("#retrievedJobNameTextId").text(job[1]);
            $("#retrievedJobRequiredSkillsTextId").text(job[2]);
            //appliedEmployeeCodes
            $("#retrievedJobStatusTextId").text(job[4]);
        }).catch(function(err) {
            console.error("Err while getJob");
            console.log(err.message);
        });

    },

    findJobsByProfile: function(event) {
        console.log("findJobsByProfile");
        event.preventDefault();

        let employeeProfileId = $("#employeeProfileIdTextId").val().trim();
        console.log("employeeProfileId:" + employeeProfileId);

        let marketInstance;

        App.contracts.Market.deployed(
        ).then(function (instance) {
            console.log("findJobs, instance:", instance);
            marketInstance = instance;
            return marketInstance.findJobsByProfile(employeeProfileId);
        }).then(function (jobIds) {
            console.log("jobIds: " + jobIds);
            $("#retrievedJobIds").text(jobIds);
        }).catch(function(err) {
            console.error("Err while findJobs");
            console.log(err.message);
        });

    },

    findJobsByEmployee: function(event) {
        console.log("findJobsByEmployee");
        event.preventDefault();

        let marketInstance;

        App.contracts.Market.deployed(
        ).then(function (instance) {
            console.log("findJobsByEmployee, instance:", instance);
            marketInstance = instance;
            return marketInstance.findJobsByEmployee();
        }).then(function (jobIds) {
            console.log("jobIds: " + jobIds);
            $("#retrievedJobIds").text(jobIds);
        }).catch(function(err) {
            console.error("Err while findJobsByEmployee");
            console.log(err.message);
        });
    },

    findEmployeeProfilesByJob: function(event) {
        console.log("findEmployeeProfilesByJob");
        event.preventDefault();

        let jobId = $("#jobIdTextId").val().trim();
        console.log("jobId:" + jobId);

        let marketInstance;

        App.contracts.Market.deployed(
        ).then(function (instance) {
            console.log("findEmployeeProfiles, instance:", instance);
            marketInstance = instance;
            return marketInstance.findEmployeeProfilesByJob(jobId);
        }).then(function (profileIds) {
            console.log("profileIds: " + profileIds);
            $("#retrievedProfileIds").text(profileIds);
        }).catch(function(err) {
            console.error("Err while findEmployeeProfilesByJob");
            console.log(err.message);
        });
    },

    upload: function () {
        console.log("upload");

        const reader = new FileReader();
        reader.onloadend = function () {
            const ipfs = window.IpfsApi('localhost', 5001) // Connect to IPFS
            const buf = buffer.Buffer(reader.result) // Convert data into buffer
            ipfs.files.add(buf, (err, result) => { // Upload buffer to IPFS
                if (err) {
                    console.error(err)
                    return
                }
                let url = `https://ipfs.io/ipfs/${result[0].hash}`
                console.log(`Url --> ${url}`)
                document.getElementById("url").innerHTML = url
                document.getElementById("url").href = url
                document.getElementById("output").src = url
            })
        }
        const photo = document.getElementById("photo");
        reader.readAsArrayBuffer(photo.files[0]); // Read Provided File
    },

    setInitialData: function(event) {
        console.log("setInitialData");
        event.preventDefault();

        let marketInstance;

        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.error("Err while getting accounts");
                console.log(error);
            }

            let account = accounts[0];

            App.contracts.Market.deployed(

            ).then(function(instance) {
                console.log("testSetInitialData, instance:" + instance);
                marketInstance = instance;
                return marketInstance.testSetInitialData({from: account});
            }).catch(function(err) {
                console.error("Err while testSetInitialData");
                console.log(err.message);
            });
        });
    }

};

