pragma solidity  ^0.4.18;

contract Market {

    enum Status {ACTIVE, INACTIVE, VACANT, OFFERED, CANCELLED}
    enum Skill {JAVA, JS, SCALA, KOTLIN, MYSQL, MONGO, OTHER}

    uint profileId = 1;
    uint jobId = 1;

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


    // function setEmployee(address _address, string _name) public {
    //     Employee storage employee = employeeMap[_address];
    //     employee.code = _address;
    //     employee.name = _name;
    //     employee.status = Status.ACTIVE;
    //     employeeCodes.push(_address);
    // }
    function setEmployee(string _name) public {
        address _address = msg.sender;
        Employee storage employee = employeeMap[_address];
        employee.code = _address;
        employee.name = _name;
        employee.status = Status.ACTIVE;
        employeeCodes.push(_address);
    }
    function getEmployee(address _address) view public returns(string name, uint[] profileIds, Status status) {
        Employee memory employee = employeeMap[_address];
        return(employee.name, employee.profileIds, employee.status);
    }
    function getEmployeeCodes() view public returns(address[]) {
        return employeeCodes;
    }


    function setEmployer(address _address, string _name) public {
        Employer storage employer = employerMap[_address];
        employer.code = _address;
        employer.name = _name;
        employer.status = Status.ACTIVE;
        employerCodes.push(_address);
    }
    function getEmployer(address _address) view public returns(string name, uint[] jobIds, Status status) {
        Employer memory employer = employerMap[_address];
        return (employer.name, employer.jobIds, employer.status);
    }
    function getEmployerCodes() view public returns(address[]) {
        return employerCodes;
    }


    function setProfile(address _employeeCode, string _name, Skill[] _skills) public {
        uint _id = profileId++;
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
    function getProfile(uint _id) view public returns(address employeeCode, string name, Skill[] skills, Status status) {
        Profile memory profile = proileMap[_id];
        return(profile.employeeCode, profile.name, profile.skills, profile.status);
    }
    function getProileIds() view public returns(uint[]) {
        return profileIds;
    }


    function setJob(address _employerCode, string _name, Skill[] _requiredSkills) public {
        uint _id = jobId++;
        Job storage job = jobMap[_id];
        job.id = _id;
        job.employerCode = _employerCode;
        job.name = _name;
        job.requiredSkills = _requiredSkills;
        job.status = Status.VACANT;
        //appliedEmployeeCodes
        jobIds.push(_id);
        Employer storage employer = employerMap[_employerCode];
        employer.jobIds.push(_id);
    }
    function getJob(uint _id) view public returns(address employerCode, string name, Skill[] requiredSkills, address[] appliedEmployeeCodes, Status status) {
        Job memory job = jobMap[_id];
        return(job.employerCode, job.name, job.requiredSkills, job.appliedEmployeeCodes, job.status);
    }
    function getJobIds() view public returns(uint[]) {
        return jobIds;
    }

    //test
    //remix 0xca35b7d915458ef540ade6068dfe2f44e8fa733c, 0x14723a09acff6d2a60dcdf7aa4aff308fddc160c, 0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db

    address employeeCode1; // = 0xa30ea249288854c80e1498573c9a844deef264d6;
    address employeeCode2; // = 0x13080693728f49c3e15483a84425c2b42edd3444;
    address employerCode1; // = 0xe6aaf0e009c677475217c7f30cc3956609603323;

    function setInitialData(address _ad1, address _ad2, address _ad3) public {
        employeeCode1 = _ad1;
        employeeCode2 = _ad2;
        employerCode1 = _ad3;
        setEmployees();
        setProfiles();
        //setEmployers();
        //setJobs();
    }

    function setEmployees() internal {
        // setEmployee(employeeCode1, "Mr.Smith");
        // setEmployee(employeeCode2, "Mrs.Smith");
    }

    function setProfiles() internal {
        Skill[] memory skills = new Skill[](2);
        skills[0] = Skill.JAVA;
        skills[1] = Skill.JS;
        setProfile(employeeCode1, 'developerProile', skills);

        Skill[] memory skills2 = new Skill[](2);
        skills2[0] = Skill.JS;
        skills2[1] = Skill.KOTLIN;
        setProfile(employeeCode2, 'developerProile', skills2);
    }

    function setEmployers() internal {
        setEmployer(employerCode1, 'Optimus');
        //setEmployer(employeeCode2, 'Maximus');
    }

    function setJobs() internal {
        Skill[] memory skills = new Skill[](2);
        skills[0] = Skill.JAVA;
        skills[1] = Skill.MYSQL;
        setJob(employerCode1, 'SE', skills);

        Skill[] memory skills2 = new Skill[](2);
        skills2[0] = Skill.JS;
        skills2[1] = Skill.MONGO;
        setJob(employerCode1, 'SSE', skills2);
    }

}