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
            var MarketArtifact = data;
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

        var employeeName = $("#employeeNameTextId").val().trim();
        console.log("Employee Name: " + employeeName);

        var marketInstance;

        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.error("Err while getting accounts");
                console.log(error);
            }

            var account = accounts[0];

            App.contracts.Market.deployed(

            ).then(function(instance) {
                marketInstance = instance;
                return marketInstance.setEmployee(employeeName, {from: account});
            }).then(function(result) {
                return marketInstance.getEmployeeCodes.call();
            }).then(function (employeeCodes) {
                for (i = 0; i < employeeCodes.length; i++) {
                    console.log("Employee Code: " + employeeCodes[i]);
                }
            }).catch(function(err) {
                console.error("Err while setEmployee");
                console.log(err.message);
            });
        });
    },

    setProfile: function(event) {
        event.preventDefault();

        var profileName = $("#profileNameTextId").val().trim();
        console.log("Profile Name: " + profileName);

        var marketInstance;

        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.error("Err while getting accounts");
                console.log(error);
            }

            var account = accounts[0];

            App.contracts.Market.deployed().then(function(instance) {
                marketInstance = instance;
                return marketInstance.setProfile(profileName, [], {from: account});
            }).then(function(result) {
                return App.getProileIds();
            }).catch(function(err) {
                console.error("Err while setProfile");
                console.log(err.message);
            });
        });
    },

    getProileIds: function(a, account) {
        var marketInstance;

        App.contracts.Market.deployed().then(function(instance) {
            marketInstance = instance;
            return marketInstance.getProileIds.call();
        }).then(function(profileIds) {
            for (i = 0; i < profileIds.length; i++) {
                console.log("Profile id: " + profileIds[i]);
            }
        }).catch(function(err) {
            console.log(err.message);
        });
    }

};

$(function() {
    $(window).load(function() {
        App.init();
    });
});