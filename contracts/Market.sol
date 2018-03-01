
contract Market {

    enum Skill {JAVA, JS, SCALA, KOTLIN, OTHER}

    struct Employee {
        string name;
        uint[] skillsInUint;
    }

    struct Employer {
        string name;
    }

    mapping (address => Employee) employeeMap;
    address[] employeeCodes;

    mapping(address => Employer) employerMap;
    address[] employerCodes;

    function setEmployee(string _name) public {
        employeeMap[msg.sender].name = _name;
        employeeCodes.push(msg.sender) - 1;
    }

    function getEmployee() view public returns(string) {
        return(employeeMap[msg.sender].name);
    }

    function getEmployee(address _address) view public returns(string) {
        return(employeeMap[_address].name);
    }

    function setEmployer(string _name) public {
        employerMap[msg.sender].name = _name;
        employerCodes.push(msg.sender) -1;
    }

    function setSkill(bytes32 _skill) public {
        uint skillInUint = _skillInUint(_skill);
        employeeMap[msg.sender].skillsInUint.push(skillInUint);
    }

    function getSkills() view public returns(uint[]) {
        return (employeeMap[msg.sender].skillsInUint);
    }

    function findSkillful(bytes32 _wanted) view public returns(address[] addresses) {
        uint _wantedInUint = _skillInUint(_wanted);
        address[] codes;
        for(uint i=0; i<employeeCodes.length; i++) {
            uint[] skillsInUint = employeeMap[employeeCodes[i]].skillsInUint;
            for(uint j=0; j<skillsInUint.length; j++) {
                if(_wantedInUint == skillsInUint[j]) {
                    codes.push(employeeCodes[i]);
                    break;
                }
            }
        }
        return codes;
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