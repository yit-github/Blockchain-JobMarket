pragma solidity  ^0.4.21;

contract Market {

    enum Status {ACTIVE, INACTIVE, VACANT, OFFERED, CANCELLED}
    enum Skill {JAVA, JS, SCALA, KOTLIN, OTHER}

    uint public jobId = 1;

    struct Employee {
        address code;
        string name;
        Skill[] skills;
        Status status;
    }

    struct Employer {
        address code;
        string name;
        Status status;
    }

    struct Job {
        uint id;
        address employerCode;
        address employeeCode;
        Skill[] requiredSkills;
        Status status;
    }

    mapping (address => Employee) employeeMap;
    address[] employeeCodes;

    mapping(address => Employer) employerMap;
    address[] employerCodes;

    mapping(uint => Job) jobMap;
    uint[] jobIds;

    function setEmployee(string _name, Skill[] _skills) public {
        setEmployee(msg.sender, _name, _skills);
    }
    function setEmployee(address _address, string _name, Skill[] _skills) public {
        Employee storage employee = employeeMap[_address];
        employee.code = _address;
        employee.name = _name;
        employee.skills = _skills;
        employeeCodes.push(_address);
    }
    function getEmployee(address _address) view public returns(string, Skill[]) {
        return(employeeMap[_address].name, employeeMap[_address].skills);
    }
    function getEmployees() view public returns(address[]) {
        return employeeCodes;
    }

    function setEmployer(string _name) public {
        setEmployer(msg.sender, _name);
    }
    function setEmployer(address _address, string _name) public {
        Employer storage employer = employerMap[_address];
        employer.code = _address;
        employer.name = _name;
        employerCodes.push(_address);
    }
    function getEmployer(address _address) view public returns(string) {
        return (employerMap[_address].name);
    }
    function getEmployers() view public returns(address[]) {
        return employerCodes;
    }

    function setJob(address _employerCode, Skill[] _requiredSkills) public {
        uint _jobId = jobId;
        job.id = _jobId;
        Job storage job = jobMap[_jobId];
        job.employerCode = _employerCode;
        job.requiredSkills = _requiredSkills;
        jobIds.push(_jobId);
        jobId++;
    }
    function setEmployeeToJob(uint _jobId, address _employeeCode) {
        jobMap[_jobId].employeeCode = _employeeCode;
    }
    function getJob(uint _id) view public returns(address, Skill[]) {
        return(jobMap[_id].employerCode, jobMap[_id].requiredSkills);
    }
    function getJobIds() view public returns(uint[]) {
        return jobIds;
    }

    //test
    function setEmployees() public {
        address address1 = 0xca35b7d915458ef540ade6068dfe2f44e8fa733c;
        Employee storage employee1 = employeeMap[address1];
        employee1.code = address1;
        employee1.name = "e1";
        employee1.skills = [Skill.JAVA, Skill.JS];
        employeeCodes.push(address1);
    }
    function setEmployers() {

    }






/*
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