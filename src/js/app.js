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
                marketInstance = instance;
                return marketInstance.setProfile(profileName, skills, {from: account});
            }).then(function(result) {
                console.log("getProfileIds");
                return marketInstance.getProfileIds.call();
            }).then(function (profileIds) {
                for (i = 0; i < profileIds.length; i++) {
                    console.log("Profile id: " + profileIds[i]);
                }
            }).catch(function(err) {
                console.error("Err while setProfile");
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