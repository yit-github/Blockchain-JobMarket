pragma solidity ^0.4.18;

contract Owned {
    address owner;
    function Owned() public {
        owner = msg.sender;
    }

   modifier onlyOwner {
       require(msg.sender == owner);
       _;
   }
}

contract Employers is Owned {

    uint x = 0;

    struct Employer {

        uint256 usertype;
        bytes16 fName;
        bytes16 lName;
        bytes16 email;
        bytes16 company;
        bytes16 country;
        bytes16 add;
        uint256[] jobIds;
    }

    struct jobs {

        bytes16 JobTitle;
        uint256 hourlyRate;
        bytes16 Description;
        address[] applyList ;
        address[] freelancerList ;
        bytes16 hash;
        bytes16 hashj;
        bytes32[] skill;
        address employer_address;
    }

    mapping (address => Employer) user;
    address[] public employerList;

    mapping (uint => jobs) job;
    uint[] public JobList;

    event employerReg(
       uint256 usertype,
        bytes16 fName,
        bytes16 lName,
        bytes16 email,
        bytes16 company,
        bytes16 country,
        bytes16 add
    );

    event PostJob(
       address employer_address,
       uint256 hourlyRate,
       bytes16 JobTitle,
       bytes16 Description,
       bytes16 hashj,
       bytes32[] skill
    );

    event ApplyJob(
      address[] applyList
    );

    event AcceptFreelancers(
      address[] freelancerList
    );


     function setEmployer(address _address, uint256 _usertype, bytes16 _fName, bytes16 _lName,bytes16 _email,bytes16 _company,bytes16 _country,bytes16 _add) onlyOwner public {
        var employer = user[_address];

        employer.usertype = _usertype;
        employer.fName = _fName;
        employer.lName = _lName;
        employer.email=_email;
        employer.company=_company;
        employer.country=_country;
        employer.add=_add;
        employerList.push(_address) -1;

        employerReg(_usertype,_fName, _lName,_email,_company,_country,_add);
    }



    function getemployers() view public returns(address[]) {
        return employerList;
    }

    function getemployer(address _address) view public returns (uint256, bytes16, bytes16, bytes16, bytes16, bytes16, bytes16) {
        return (user[_address].usertype, user[_address].fName, user[_address].lName,user[_address].email,user[_address].company,user[_address].country,user[_address].add);
    }


   function setpostJob(address _address, uint256 _hourlyRate, bytes16 _JobTitle, bytes16 _Description,bytes16 hashj, bytes32[] _skill) onlyOwner public {
         uint _id=x;
        var postJob = job[_id];
        var employer = user[_address];

        postJob.employer_address=_address;
        postJob.hourlyRate = _hourlyRate;
        postJob.JobTitle = _JobTitle;
        postJob.Description = _Description;
        postJob.hashj = hashj;
        for(uint i = 0; i <_skill.length; i++)
           {
               postJob.skill.push(_skill[i]);
           }

        employer.jobIds.push(x);
         x=x+1;

        JobList.push(_id) -1;
        PostJob(_address,_hourlyRate,_JobTitle, _Description,hashj,_skill);
    }


    function getpostJobs() view public returns(uint[]) {
        return JobList;
    }

    function getpostJob(uint256 i) view public returns (address,uint256, bytes16, bytes16,bytes16,bytes32[]) {
        return (job[JobList[i]].employer_address,job[JobList[i]].hourlyRate, job[JobList[i]].JobTitle, job[JobList[i]].Description,job[JobList[i]].hashj,job[JobList[i]].skill);
    }

    function getJobId(address _address) view public returns (uint256[]) {
        return (user[_address].jobIds);
    }


     function ApplyJobs(uint256 i,address _employeeAddress, address[] list) public {
        var Apply_Job = job[i];
        Apply_Job.applyList.push(_employeeAddress);
        ApplyJob( list);
    }

    function getApplications(uint _id) view public returns (address[]) {
        return (job[_id].applyList);
    }

    function AcceptJobs(uint _id,uint256 i, address[] _list) public {
       var accept_Job = job[_id];

       accept_Job.freelancerList.push( job[_id].applyList[i]);
       AcceptFreelancers( _list);
    }


    function getAcepptedFreelancers(uint _id) view public returns (address[]) {
        return (job[_id].freelancerList);
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


    function edit_profile(address _address, uint256 _hourlyRate, bytes16 _descrip, bytes32[] _skill, bytes16 _hash) public {

        var profile = emp_pro[_address];

        profile.hourlyRate = _hourlyRate;
        profile.descrip = _descrip;
        profile.hashp = _hash;
        for(uint i = 0; i <_skill.length; i++)
           {
               profile.skills.push(_skill[i]);
           }

        set_profile(_hourlyRate,_descrip, _skill,_hash);
    }

    function getprofiles() view public returns(address[]) {
        return profileList;
    }

    function getprofile(address _address) view public returns (uint256, bytes16,bytes32[],bytes16) {
        return (emp_pro[_address].hourlyRate, emp_pro[_address].descrip,emp_pro[_address].skills,emp_pro[_address].hashp);
    }

}
