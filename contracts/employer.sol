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

        struct Employer {
        uint256 country;
        bytes16 fName;
        bytes16 lName;

          }

    mapping (address => Employer) user;
    address[] public employerList;

    event employerReg(
       uint256 country,
       bytes16 fName,
       bytes16 lName

    );

     function setEmployer(address _address, uint256 _country, bytes16 _fName, bytes16 _lName) onlyOwner public {
        var employer = user[_address];

        employer.country = _country;
        employer.fName = _fName;
        employer.lName = _lName;


        employerList.push(_address) -1;

        employerReg(_country,_fName, _lName);
    }


    function getemployers() view public returns(address[]) {
        return employerList;
    }

    function getemployer(address _address) view public returns (uint256, bytes16, bytes16) {
        return (user[_address].country, user[_address].fName, user[_address].lName);
    }



   }
