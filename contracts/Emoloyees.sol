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

contract Employees is Owned {

  struct Employee {

        uint256 id;
        bytes16 fName;
        bytes16 lName;
        bytes16 email;
        bytes16 phoneNo;
            }

  mapping (address => Employee) emp;
  address[] public EmployeeList;

  event employeeReg  (
       uint256 id,
       bytes16 fName,
       bytes16 lName,
       bytes16 email,
       bytes16 phoneNo
    );

  function setEmployee(address _address, uint256 _id, bytes16 _fName, bytes16 _lName, bytes16 email,bytes16 phoneNo) onlyOwner public {

        var employee = emp[_address];

        employee.id = _id;
        employee.fName = _fName;
        employee.lName = _lName;
        employee.email = email;
        employee.phoneNo =phoneNo;

        EmployeeList.push(_address) -1;
        employeeReg(_id,_fName, _lName,email,phoneNo);
    }


    function getEmployees() view public returns(address[]) {
        return EmployeeList;
    }

    function getEmployee(address _address) view public returns (uint256, bytes16, bytes16,bytes16,bytes16) {
        return (emp[_address].id, emp[_address].fName, emp[_address].lName,emp[_address].email,emp[_address].phoneNo);
    }
}
