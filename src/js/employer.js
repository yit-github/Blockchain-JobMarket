$(function() {
    $(window).load(function() {
        App.init();

        $("#registerEmployerButtonId").click(App.setEmployer);
        $("#viewEmployerButtonId").click(App.getEmployer);
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

    }

};

