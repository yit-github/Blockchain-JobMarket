pragma solidity  ^0.4.18;

contract Market {

    enum Status {ACTIVE, INACTIVE, VACANT, OFFERED, CANCELLED}
    enum Skill {JAVA, JS, MYSQL, MONGO, SCALA, KOTLIN, OTHER}

    uint profileId = 1;
    uint jobId = 1;

    mapping (address => Employee) employeeMap;
    address[] employeeCodes;

    mapping(address => Employer) employerMap;
    address[] employerCodes;

    mapping(uint => Profile) profileMap;
    uint[] allProfileIds;

    mapping(uint => Job) jobMap;
    uint[] allJobIds;

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
        address _address = msg.sender;
        setEmployeeWithAddress(_address, _name);
    }
    function setEmployeeWithAddress(address _address, string _name) public {
        Employee storage employee = employeeMap[_address];
        employee.code = _address;
        employee.name = _name;
        employee.status = Status.ACTIVE;
        employeeCodes.push(_address);
    }
    function getEmployee(address _address) view public returns(string name, uint[] ids, Status status) {
        Employee memory employee = employeeMap[_address];
        return(employee.name, employee.profileIds, employee.status);
    }
    function getEmployeeCodes() view public returns(address[] codes) {
        return employeeCodes;
    }


    function setEmployer(string _name) public {
        address _address = msg.sender;
        setEmployerWithAddress(_address, _name);
    }
    function setEmployerWithAddress(address _address, string _name) public {
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


    function setProfile(string _name, Skill[] _skills) public {
        address _employeeCode = msg.sender;
        setProfileWithAddress(_employeeCode, _name, _skills);
    }
    function setProfileWithAddress(address _employeeCode, string _name, Skill[] _skills) public {
        //throw if employee not found
        uint _id = profileId++;
        Profile storage profile = profileMap[_id];
        profile.id = _id;
        profile.employeeCode = _employeeCode;
        profile.name = _name;
        profile.skills = _skills;
        profile.status = Status.ACTIVE;
        allProfileIds.push(_id);
        Employee storage employee = employeeMap[_employeeCode];
        employee.profileIds.push(_id);
    }
    function getProfile(uint _id) view public returns(address employeeCode, string name, Skill[] skills, Status status) {
        Profile memory profile = profileMap[_id];
        return(profile.employeeCode, profile.name, profile.skills, profile.status);
    }
    function getAllProfileIds() view public returns(uint[] ids) {
        return allProfileIds;
    }

    function setJob(string _name, Skill[] _requiredSkills) public {
        address _employerCode = msg.sender;
        setJobWithAddress(_employerCode, _name, _requiredSkills);
    }
    function setJobWithAddress(address _employerCode, string _name, Skill[] _requiredSkills) public {
        uint _id = jobId++;
        Job storage job = jobMap[_id];
        job.id = _id;
        job.employerCode = _employerCode;
        job.name = _name;
        job.requiredSkills = _requiredSkills;
        job.status = Status.VACANT;
        //appliedEmployeeCodes
        allJobIds.push(_id);
        Employer storage employer = employerMap[_employerCode];
        employer.jobIds.push(_id);
    }
    function getJob(uint _id) view public returns(address employerCode, string name, Skill[] requiredSkills, address[] appliedEmployeeCodes, Status status) {
        Job memory job = jobMap[_id];
        return(job.employerCode, job.name, job.requiredSkills, job.appliedEmployeeCodes, job.status);
    }
    function getAllJobIds() view public returns(uint[] postedJobIds) {
        return allJobIds;
    }

    function findJobs(Skill skill) view public returns(uint[] jobIds) {
        uint[] memory matchingJobIds;
        uint matchingJobId;

        uint jobCount = 0;
        for(uint j=0; j<allJobIds.length; j++) {
            uint thisJobId = allJobIds[j];
            Job memory job = jobMap[thisJobId];

            Skill[] memory requiredSkills = job.requiredSkills;
            for(uint m=0; m<requiredSkills.length; m++) {
                Skill required = requiredSkills[m];

                if(skill == required) {

                    matchingJobId = thisJobId;
                    matchingJobIds[jobCount++] = thisJobId;
                    break;
                }

            }

        }

        //matchingJobIds[0] = matchingJobId;
        //return matchingJobIds;
        //uint storage x = 11;
        return matchingJobIds;
    }

    // function findJobs(uint _profileId) view public returns(uint jobIds) {
    //     uint[] memory matchingJobIds;
    //     //uint matchingJobId;

    //     Profile memory profile = profileMap[_profileId];
    //     Skill[] memory skills = profile.skills;

    //     uint jobCount = 0;
    //     for(uint s=0; s<skills.length; s++) {
    //         Skill skill = skills[s];

    //         for(uint j=0; j<allJobIds.length; j++) {
    //             uint thisJobId = allJobIds[j];
    //             Job memory job = jobMap[thisJobId];

    //             Skill[] memory requiredSkills = job.requiredSkills;
    //             for(uint m=0; m<requiredSkills.length; m++) {
    //                 Skill required = requiredSkills[m];

    //                 if(skill == required) {

    //                     matchingJobId = thisJobId;
    //                     //matchingJobIds[jobCount++] = thisJobId;
    //                     //break;
    //                 }

    //             }

    //         }
    //     }
    //     //matchingJobIds[0] = matchingJobId;
    //     //return matchingJobIds;
    //     //uint storage x = 11;
    //     return 11;
    // }


    //test
    function testSetInitialData() public {
        address addressE1 = 0xca35b7d915458ef540ade6068dfe2f44e8fa733c;
        address addressE2 = 0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db;
        address addressR1 = 0x14723a09acff6d2a60dcdf7aa4aff308fddc160c;
        address addressR2 = 0x583031d1113ad414f02576bd6afabfb302140225;

        setEmployeeWithAddress(addressE1, "e1");
        setEmployerWithAddress(addressR1, "r1");

        Skill[] memory skills1 = new Skill[](2);
        skills1[0] = Skill.JAVA;
        skills1[1] = Skill.MYSQL;

        Skill[] memory skills2 = new Skill[](2);
        skills2[0] = Skill.JS;
        skills2[1] = Skill.MONGO;

        setProfileWithAddress(addressE1, "p1", skills1);
        setProfileWithAddress(addressE1, "p2", skills2);

        setJobWithAddress(addressR1, "j1", skills1);
        setJobWithAddress(addressR1, "j2", skills1);
    }

    function uintToSkill(uint _uint) pure public returns(string skill) {
        if(_uint == uint(Skill.JAVA))
            return "JAVA";
        if(_uint == uint(Skill.JS))
            return "JS";
        return "MONGO";
    }

}