

pragma solidity ^0.4.18;

contract Employee {

    struct Employee {
        uint id;
        string fName;
        string lName;
        bytes32[] skills;

    }

    mapping (address => Employee) instructors;
    address[] public EmployeeList;


     function setEmployee(address _address, uint _id, string _fName, string _lName) public {
        var employee = instructors[_address];

        employee.id = _id;
        employee.fName = _fName;
        employee.lName = _lName;

        EmployeeList.push(_address) -1;
    }


     function setSkill(address _address,bytes32[] _skill )public {

        var employee = instructors[_address];
      for(uint i = 0; i <_skill.length; i++)
         {
             employee.skills.push(_skill[i]);
         }
         EmployeeList.push(_address) -1;
    }



    function bytes32ToString(bytes32 x) public pure returns (string) {
        bytes memory bytesString = new bytes(32);
        uint charCount = 0;
        for (uint j = 0; j < 32; j++) {
            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (j = 0; j < charCount; j++) {
            bytesStringTrimmed[j] = bytesString[j];
        }
        return string(bytesStringTrimmed);
    }

    function bytes32ArrayToString(bytes32[] data) public pure returns (string) {
        bytes memory bytesString = new bytes(data.length * 32);
        uint urlLength;
        for (uint i=0; i<data.length; i++) {
            for (uint j=0; j<32; j++) {
                byte char = byte(bytes32(uint(data[i]) * 2 ** (8 * j)));
                if (char != 0) {
                    bytesString[urlLength] = char;
                    urlLength += 1;
                }
            }
        }
        bytes memory bytesStringTrimmed = new bytes(urlLength);
        for (i=0; i<urlLength; i++) {
            bytesStringTrimmed[i] = bytesString[i];
        }
        return string(bytesStringTrimmed);
    }




    function getEmployees() view public returns(address[]) {
        return EmployeeList;
    }

    function getEmployee(address _address) view public returns (uint, string, string) {
        return (instructors[_address].id, instructors[_address].fName, instructors[_address].lName);
    }


    function getSkill(address _address) view public returns (bytes32[]) {
        return (instructors[_address].skills);
    }


    function getSkillString(address _address) view public {
        bytes32ArrayToString(instructors[_address].skills);
    }



    function countEmployees() view public returns (uint) {
        return EmployeeList.length;
    }


}
