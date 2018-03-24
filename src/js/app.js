$(function() {
    $(window).load(function() {
        App.init();
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
    }

};

