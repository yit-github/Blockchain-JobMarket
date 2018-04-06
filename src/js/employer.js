$(function() {
    $(window).load(function() {
        $("#registerEmployerButtonId").click(Employer.setEmployer);
        $("#viewEmployerButtonId").click(Employer.getEmployer);
    });
});

Employer = {

    setEmployer: function(event) {
        event.preventDefault();

        let employerName = $("#employerNameTextId").val().trim();
        console.log("Employer Name: " + employerName);

        let employerEmail = $("#employerEmailTextId").val().trim();
        console.log("Employer Email: " + employerEmail);

        let employerCompany = $("#employerCompanyTextId").val().trim();
        console.log("Employer Company: " + employerCompany);

        let employerAddress = $("#employerAddressTextId").val().trim();
        console.log("Employer Address: " + employerAddress);

        let employerCountry = $("#employerCountryTextId").val().trim();
        console.log("Employer Country: " + employerCountry);

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
                return marketInstance.setEmployer(employerName, employerEmail, employerCompany, employerAddress, employerCountry, {from: account});
            }).then(function(result) {
                console.log("getEmployerCodes");
                return marketInstance.getEmployerCodes.call();
            }).then(function (employerCodes) {
                console.log("getEmployer, codes:" + employerCodes);
                employerCode = employerCodes[employerCodes.length-1];
                console.log("last code: " + employerCode);
                window.location="http://localhost:3003/postJob.html";
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
            $("#retrievedEmployerEmailTextId").text(employer[1]);
            $("#retrievedEmployerCompanyTextId").text(employer[2]);
            $("#retrievedEmployerAddressTextId").text(employer[3]);
            $("#retrievedEmployerCountryTextId").text(employer[4]);
            $("#retrievedEmployerJobIdsTextId").text(employer[5]);
            $("#retrievedEmployerStatusTextId").text(employer[6]);
        }).catch(function(err) {
            console.error("Err while getEmployer");
            console.log(err.message);
        });
    }
};
