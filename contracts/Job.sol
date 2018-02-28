pragma solidity ^0.4.18;

contract Job{

    struct jobs {

        bytes16 JobTitle;
        uint256 hourlyRate;
        uint256 employer_id;
        bytes16 Description;
        bytes32[] required_skills;
        uint256 employees_id;
        address[] applyList ;
        address[] freelancerList ;
        bytes32 hash;
    }

    mapping (address => jobs) job;
    address[] public JobList;


    event PostJob(
       uint256 hourlyRate,
       bytes16 JobTitle,
       bytes16 Description,
       bytes32[] required_skills
    );

    event ApplyJob(
      address[] applyList
    );

    event AcceptFreelancers(
      address[] freelancerList
    );


   function setpostJob(address _address, uint256 _hourlyRate, bytes16 _JobTitle, bytes16 _Description,bytes32[] _skill) public {
        var postJob = job[_address];

        postJob.hourlyRate = _hourlyRate;
        postJob.JobTitle = _JobTitle;
        postJob.Description = _Description;

        for(uint i = 0; i <_skill.length; i++)
           {
               postJob.required_skills.push(_skill[i]);
           }

        JobList.push(_address) -1;
        PostJob(_hourlyRate,_JobTitle, _Description,_skill);
    }

  function getpostJobs() view public returns(address[]) {
        return JobList;
    }

    function getpostJob(uint256 i) view public returns (uint256, bytes16, bytes16,bytes32[]) {
        return (job[JobList[i]].hourlyRate, job[JobList[i]].JobTitle, job[JobList[i]].Description,job[JobList[i]].required_skills);
    }

    function ApplyJobs(uint256 i,address _employeeAddress, address[] list) public {
        var Apply_Job = job[JobList[i]];

        Apply_Job.applyList.push(_employeeAddress);
        ApplyJob( list);
    }


    function getApplications(address _address) view public returns (address[]) {
        return (job[_address].applyList);
    }

    function AcceptJobs(address _address,uint256 i, address[] _list) public {
       var accept_Job = job[_address];

       accept_Job.freelancerList.push( job[_address].applyList[i]);
       AcceptFreelancers( _list);
    }


    function getAcepptedFreelancers(address _address) view public returns (address[]) {
        return (job[_address].freelancerList);
    }


 struct profiles {
     uint256 hourlyRate;
     bytes16 description;
     bytes32[] skills;
     bytes32 hash;
    }

    mapping (address => profiles) emp_pro;
    address[] public profileList;

    event set_profile(
        uint256 hourlyRate,
        bytes16 description,
        bytes32[] skills,
        bytes32 hash
    );

    function setprofile(address _address, uint256 _hourlyRate, bytes16 _description, bytes32[] _skill, bytes32 _hash) public {

        var profile = emp_pro[_address];

        profile.hourlyRate = _hourlyRate;
        profile.description = _description;
        profile.hash = _hash;
        for(uint i = 0; i <_skill.length; i++)
           {
               profile.skills.push(_skill[i]);
           }

        profileList.push(_address) -1;
        set_profile(_hourlyRate,_description, _skill,_hash);
    }



    function getprofiles() view public returns(address[]) {
        return profileList;
    }

    function getprofile(address _address) view public returns (uint256, bytes16,bytes32[],bytes32) {
        return (emp_pro[_address].hourlyRate, emp_pro[_address].description,emp_pro[_address].skills,emp_pro[_address].hash);
    }

}
