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
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
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
        return App.bindEvents();
    },

    bindEvents: function () {
        $(document).on('click', '.employeeRegistrationButtonClass', App.setEmployee);
        $(document).on('click', '.profileRegistrationButtonClass', App.setProfile);
        $(document).on('click', '.employerRegistrationButtonClass', App.setEmployer);
        $(document).on('click', '#createJobButtonId', App.setJob);
        $(document).on('click', '#findJobsButtonId', App.findJobs);
        $(document).on('click', '#getEmployerButtonId', App.getEmployer);
        $(document).on('click', '#setInitialDataButtonId', App.setInitialData);
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
                return marketInstance.getEmployee(employeeCode);
            }).then(function (employee) {
                console.log("set html, employee: " + employee);
                $("#registeredEmployeeCodeTextId").text(employeeCode);
                $("#registeredEmployeeNameTextId").text(employee[0]);
            }).catch(function(err) {
                console.error("Err while setEmployee");
                console.log(err.message);
            });
        });
    },

    setProfile: function(event) {
        event.preventDefault();

        let profileName = $("#profileNameTextId").val().trim();
        console.log("Profile Name: " + profileName);

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
                console.log("setProfile");
                marketInstance = instance;
                return marketInstance.setProfile(profileName, skills, {from: account});
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

    findJobs: function(event) {
        console.log("findJobs");
        event.preventDefault();

        let employeeProfileId = $("#employeeProfileIdTextId").val().trim();
        console.log("employeeProfileId:" + employeeProfileId);

        let marketInstance;

        App.contracts.Market.deployed(
        ).then(function (instance) {
            console.log("findJobs, instance:", instance);
            marketInstance = instance;
            return marketInstance.findJobs(employeeProfileId);
        }).then(function (jobIds) {
            console.log("jobIds: " + jobIds);
        }).catch(function(err) {
            console.error("Err while findJobs");
            console.log(err.message);
        });

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

$(function() {
    $(window).load(function() {
        App.init();
    });
});