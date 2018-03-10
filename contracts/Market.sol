pragma solidity  ^0.4.21;

contract RegistrationContract {

    enum Status {ACTIVE, INACTIVE, VACANT, OFFERED, CANCELLED}
    enum Skill {JAVA, JS, SCALA, KOTLIN, OTHER}

    uint public profileId = 1;
    uint public jobId = 1;

    mapping (address => Employee) employeeMap;
    address[] employeeCodes;

    mapping(address => Employer) employerMap;
    address[] employerCodes;

    mapping(uint => Profile) proileMap;
    uint[] profileIds;

    mapping(uint => Job) jobMap;
    uint[] jobIds;

    struct Employee {
        address code;
        string name;
        uint[] profileIds;
        Status status;
    }

    struct Employer {
        address code;
        string name;
        uint[] jobIds;
        Status status;
    }

    struct Profile {
        uint id;
        address employeeCode;
        string name;
        Skill[] skills;
        Status status;
    }

    struct Job {
        uint id;
        address employerCode;
        string name;
        Skill[] requiredSkills;
        address[] appliedEmployeeCodes;
        Status status;
    }


    function setEmployee(string _name) public {
        setEmployee(msg.sender, _name);
    }
    function setEmployee(address _address, string _name) public {
        Employee storage employee = employeeMap[_address];
        employee.code = _address;
        employee.name = _name;
        employee.status = Status.ACTIVE;
        employeeCodes.push(_address);
    }
    function getEmployee(address _address) view public returns(string, uint[], Status) {
        Employee memory employee = employeeMap[_address];
        return(employee.name, employee.profileIds, employee.status);
    }
    function getEmployeeCodes() view public returns(address[]) {
        return employeeCodes;
    }


    function setEmployer(string _name) public {
        setEmployer(msg.sender, _name);
    }
    function setEmployer(address _address, string _name) public {
        Employer storage employer = employerMap[_address];
        employer.code = _address;
        employer.name = _name;
        employer.status = Status.ACTIVE;
        employerCodes.push(_address);
    }
    function getEmployer(address _address) view public returns(string, uint[], Status) {
        Employer memory employer = employerMap[_address];
        return (employer.name, employer.jobIds, employer.status);
    }
    function getEmployerCodes() view public returns(address[]) {
        return employerCodes;
    }


    function setProile(string _name, Skill[] _skills) public {
        uint _id = profileId++;
        setProile(_id, msg.sender, _name, _skills);
    }
    function setProile(uint _id, address _employeeCode, string _name, Skill[] _skills) public {
        Profile storage profile = proileMap[_id];
        profile.id = _id;
        profile.employeeCode = _employeeCode;
        profile.name = _name;
        profile.skills = _skills;
        profile.status = Status.ACTIVE;
        profileIds.push(_id);
        Employee storage employee = employeeMap[_employeeCode];
        employee.profileIds.push(_id);
    }
    function getProfile(uint _id) view public returns(address, string, Skill[], Status) {
        Profile memory profile = proileMap[_id];
        return(profile.employeeCode, profile.name, profile.skills, profile.status);
    }
    function getProileIds() view public returns(uint[]) {
        return profileIds;
    }


    function setJob(string _name, Skill[] _requiredSkills) public {
        uint _id = profileId++;
        setJob(_id, msg.sender, _name, _requiredSkills);
    }
    function setJob(uint _id, address _employerCode, string _name, Skill[] _requiredSkills) public {
        Job storage job = jobMap[_id];
        job.id = _id;
        job.employerCode = _employerCode;
        job.name = _name;
        job.requiredSkills = _requiredSkills;
        job.status = Status.VACANT;
        //appliedEmployeeCodes
        jobIds.push(_id);
        Employer storage employer = employerMap[msg.sender];
        employer.jobIds.push(_id);
    }
    function getJob(uint _id) view public returns(address, string, Skill[], address[], Status) {
        Job memory job = jobMap[_id];
        return(job.employerCode, job.name, job.requiredSkills, job.appliedEmployeeCodes, job.status);
    }
    function getJobIds() view public returns(uint[]) {
        return jobIds;
    }

}