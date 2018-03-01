pragma solidity  ^0.4.18;

contract Market {
    //Runs out of gas when findEmployeesForSender() is executed
    //Chrome browser goes unresponsive if gas limit is increased

    enum Skill {JAVA, JS, SCALA, KOTLIN, OTHER}

    struct Employee {
        string name;
        uint[] skills;
    }

    struct Employer {
        string name;
        uint[] vacants;
    }

    mapping (address => Employee) employeeMap;
    address[] employeeCodes;

    mapping(address => Employer) employerMap;
    address[] employerCodes;

    function setEmployee(string _name, uint[] _skills) public {
        var employee = employeeMap[msg.sender];
        employee.name = _name;
        for(uint i=0; i<_skills.length; i++) {
            employee.skills.push(_skills[i]);
        }

        bool alreadyIn = false;
        for(uint e=0; e<employeeCodes.length; e++) {
            if(msg.sender == employeeCodes[e]) {
                alreadyIn = true;
                break;
            }
        }
        if(!alreadyIn)
            employeeCodes.push(msg.sender) - 1;
    }
    function getEmployee(address _address) view public returns(string, uint[]) {
        return(employeeMap[_address].name, employeeMap[_address].skills);
    }
    function getEmployees() view public returns(address[]) {
        return employeeCodes;
    }

    function setEmployer(string _name, uint[] _vacants) public {
        var employer = employerMap[msg.sender];
        employer.name = _name;
        for(uint i=0; i<_vacants.length; i++) {
            employer.vacants.push(_vacants[i]);
        }

        bool alreadyIn = false;
        for(uint e=0; e<employerCodes.length; e++) {
            if(msg.sender == employerCodes[e]) {
                alreadyIn = true;
                break;
            }
        }
        if(!alreadyIn)
            employerCodes.push(msg.sender) - 1;
    }
    function getEmployer(address _address) view public returns(string, uint[]) {
        return (employerMap[_address].name, employerMap[_address].vacants);
    }
    function getEmployers() view public returns(address[]) {
        return employerCodes;
    }

    function setEmployeeSkill(bytes32 _skill) public {
        uint skillInUint = _skillInUint(_skill);
        employeeMap[msg.sender].skills.push(skillInUint);
    }
    function getEmployeeSkills() view public returns(uint[]) {
        return (employeeMap[msg.sender].skills);
    }

    function findEmployees(bytes32 _vacantInString) view public returns(address[] addresses) {
        uint _vacant = _skillInUint(_vacantInString);
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
    function findEmployeesForSender() view public returns(address[] addresses) {
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

        address[] distincts;
        distincts[0] = codes[0];

        for(uint c=0; c<codes.length; c++) {
            bool duplicate = false;

            for(uint d=c+1; d<codes.length; d++) {
                if(codes[d] == codes[c]) {
                    duplicate = true;
                    break;
                }
            }

            if(!duplicate) {
                distincts.push(codes[c]);
            }
        }
        return distincts;
    }

    function findEmployer(bytes32 _skillInString) view public returns(address[] addresses) {
        uint _skill = _skillInUint(_skillInString);
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
    function findEmployersForSender() view public returns(address[] addresses) {
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

        address[] distincts;
        distincts[0] = codes[0];

        for(uint c=0; c<codes.length; c++) {
            bool duplicate = false;

            for(uint d=c+1; d<codes.length; d++) {
                if(codes[d] == codes[c]) {
                    duplicate = true;
                    break;
                }
            }

            if(!duplicate) {
                distincts.push(codes[c]);
            }
        }
        return distincts;
    }

    function _skillInUint(bytes32 _skill) view public returns(uint) {
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

}