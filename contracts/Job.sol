pragma solidity ^0.4.18;

contract Job{

    struct jobs {
        bytes16 JobTitle;
        uint256 hourlyRate;
        bytes16 Description;
        address[] applyList ;
        address[] freelancerList ;
        bytes16 hash;
        bytes16 hashj;
    }

    mapping (address => jobs) job;
    address[] public JobList;


    event PostJob(
       uint256 hourlyRate,
       bytes16 JobTitle,
       bytes16 Description,
       bytes16 hashj
    );

    event ApplyJob(
      address[] applyList
    );

    event AcceptFreelancers(
      address[] freelancerList
    );


   function setpostJob(address _address, uint256 _hourlyRate, bytes16 _JobTitle, bytes16 _Description,bytes16 hashj) public {
        var postJob = job[_address];

        postJob.hourlyRate = _hourlyRate;
        postJob.JobTitle = _JobTitle;
        postJob.Description = _Description;
        postJob.hashj = hashj;

        JobList.push(_address) -1;
        PostJob(_hourlyRate,_JobTitle, _Description,hashj);
    }

  function getpostJobs() view public returns(address[]) {
        return JobList;
    }

    function getpostJob(uint256 i) view public returns (uint256, bytes16, bytes16,bytes16) {
        return (job[JobList[i]].hourlyRate, job[JobList[i]].JobTitle, job[JobList[i]].Description,job[JobList[i]].hashj);
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
     bytes16 descrip;
     bytes32[] skills;
     bytes16 hashp;
    }

    mapping (address => profiles) emp_pro;
    address[] public profileList;

    event set_profile(
        uint256 hourlyRate,
        bytes16 descrip,
        bytes32[] skills,
        bytes16 hashp
    );

    function setprofile(address _address, uint256 _hourlyRate, bytes16 _descrip, bytes32[] _skill, bytes16 _hash) public {

        var profile = emp_pro[_address];

        profile.hourlyRate = _hourlyRate;
        profile.descrip = _descrip;
        profile.hashp = _hash;
        for(uint i = 0; i <_skill.length; i++)
           {
               profile.skills.push(_skill[i]);
           }

        profileList.push(_address) -1;
        set_profile(_hourlyRate,_descrip, _skill,_hash);
    }

    function getprofiles() view public returns(address[]) {
        return profileList;
    }

    function getprofile(address _address) view public returns (uint256, bytes16,bytes32[],bytes16) {
        return (emp_pro[_address].hourlyRate, emp_pro[_address].descrip,emp_pro[_address].skills,emp_pro[_address].hashp);
    }

}
