$(function() {
    $(window).load(function() {
        $("#createJobButtonId").click(Job.setJob);
        $("#viewJobButtonId").click(Job.getJob);
        $("#findEmployeeProfilesByJobButtonId").click(Job.findEmployeeProfilesByJob);
        $("#findJobsByProfileButtonId").click(Job.findJobsByProfile);
        $("#findJobsByEmployeeButtonId").click(Job.findJobsByEmployee);
        $("#applyJobButtonId").click(Job.updateJobAppliedEmployees);
    });
});

Job = {

    setJob: function(event) {
        event.preventDefault();

        let jobName = $("#jobNameTextId").val().trim();
        console.log("jobName:" + jobName);

        let jobDescription = $("#jobDescriptionTextId").val().trim();
        console.log("jobDescription:" + jobDescription);

        let jobRate = $("#jobRateTextId").val().trim();
        console.log("jobRate:" + jobRate);

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
                return marketInstance.setJob(jobName,skills,jobRate,jobDescription, {from: account});
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
            $("#retrievedJobAppliedEmployeesTextId").text(job[3]);
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

    updateJobAppliedEmployees: function(event) {
        event.preventDefault();

        let jobId = $("#appliedJobIdTextId").val().trim();
        console.log("jobId:" + jobId);

        let marketInstance;

        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.error("Err while getting accounts");
                console.log(error);
            }

            let account = accounts[0];

            App.contracts.Market.deployed().then(function(instance) {
                console.log("updateJobAppliedEmployees");
                marketInstance = instance;
                return marketInstance.updateJobAppliedEmployees(jobId, {from: account});
            }).catch(function(err) {
                console.error("Err while updateJobAppliedEmployees");
                console.log(err.message);
            });
        });
    }

};
