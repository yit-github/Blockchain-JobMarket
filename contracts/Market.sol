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


    /*

     //test
     function setEmployees() public {

     }
     function setEmployers() {

     }

     function skillToUint(bytes32 _skill) public pure returns(uint) {
     uint skillInUint;
     if(_skill == "JAVA") {
     skillInUint = uint(Skill.JAVA);
     } else if(_skill == "JS") {
     skillInUint = uint(Skill.JS);
     } else if(_skill == "SCALA") {
     skillInUint = uint(Skill.SCALA);
     } else if(_skill == "KOTLIN") {
     skillInUint = uint(Skill.KOTLIN);
     } else {
     skillInUint = uint(Skill.OTHER);
     }
     return skillInUint;
     }

     function uintToSkill(uint _skill) public pure returns(string) {
     if(_skill == uint(Skill.JAVA)) {
     return "JAVA";
     } else if(_skill == uint(Skill.JS)) {
     return "JS";
     }  else if(_skill == uint(Skill.SCALA)) {
     return "SCALA";
     } else if(_skill == uint(Skill.KOTLIN)) {
     return "KOTLIN";
     } else {
     return "OTHER";
     }
     }

     */

    /*
     function findEmployees(bytes32 _vacantInString) view public returns(address[] addresses) {
     uint _vacant = skillToUint(_vacantInString);
     address[] codes;
     for(uint i=0; i<employeeCodes.length; i++) {
     uint[] skills = employeeMap[employeeCodes[i]].skills;
     for(uint j=0; j<skills.length; j++) {
     if(_vacant == skills[j]) {
     codes.push(employeeCodes[i]);
     break;
     }
     }
     }
     return codes;
     }
     function findEmployees() view public returns(address[] addresses) {     //has duplicates
     address[] codes;
     var vacants = employerMap[msg.sender].vacants;
     for(uint v=0; v<vacants.length; v++) {
     for(uint e=0; e<employeeCodes.length; e++) {
     uint[] skills = employeeMap[employeeCodes[e]].skills;
     for(uint s=0; s<skills.length; s++) {
     if(skills[s] == vacants[v]) {
     codes.push(employeeCodes[e]);
     break;
     }
     }
     }
     }
     return codes;
     }

     function findEmployers(bytes32 _skillInString) view public returns(address[] addresses) {
     uint _skill = skillToUint(_skillInString);
     address[] codes;
     for(uint i=0; i<employerCodes.length; i++) {
     uint[] vacants = employerMap[employerCodes[i]].vacants;
     for(uint j=0; j<vacants.length; j++) {
     if(_skill == vacants[j]) {
     codes.push(employerCodes[i]);
     break;
     }
     }
     }
     return codes;
     }
     function findEmployers() view public returns(address[] addresses) {
     address[] codes;
     var skills = employeeMap[msg.sender].skills;
     for(uint s=0; s<skills.length; s++) {
     for(uint e=0; e<employerCodes.length; e++) {
     uint[] vacants = employerMap[employerCodes[e]].vacants;
     for(uint v=0; v<vacants.length; v++) {
     if(vacants[v] == skills[s]) {
     codes.push(employerCodes[e]);
     break;
     }
     }
     }
     }
     return codes;
     }
     */

}