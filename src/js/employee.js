$(function() {
    $(window).load(function() {
        $("#registerEmployeeButtonId").click(Employee.setEmployee);
        $("#viewEmployeeButtonId").click(Employee.getEmployee);
        $("#registerEmployeeButtonId").click(Employee.setProfile);
        $("#viewProfileButtonId").click(Employee.getProfile);
    });
});

Employee = {

    setEmployee: function(event) {
        event.preventDefault();

        let employeeName = $("#employeeNameTextId").val().trim();
        console.log("Employee Name: " + employeeName);

        let employeeEmail = $("#employeeEmailTextId").val().trim();
        console.log("Employee Email: " + employeeEmail);

        let employeePhoneNo = $("#employeePhoneTextId").val().trim();
        console.log("Employee PhoneNo: " + employeePhoneNo);

        let employeeStatement = $("#employeeStatementsTextId").val().trim();
        console.log("Employee Statement: " + employeeStatement);

        let employeeRate = $("#employeeRateTextId").val().trim();
        console.log("Employee Rate: " + employeeRate);

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
                return marketInstance.setEmployee(employeeName,employeeEmail,employeePhoneNo,employeeStatement,employeeRate, {from: account});
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
            $("#retrievedEmployeeEmailTextId").text(employee[1]);
            $("#retrievedEmployeePhoneNoTextId").text(employee[2]);
            $("#retrievedEmployeeStatementTextId").text(employee[3]);
            $("#retrievedEmployeeHourlyRateTextId").text(employee[4]);
            $("#retrievedEmployeeProfileIdsTextId").text(employee[5]);
            $("#retrievedEmployeeDefaultProfileIdTextId").text(employee[6]);
            $("#retrievedEmployeeStatusTextId").text(employee[7]);
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

};
