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

        uint256 usertype;
        bytes16 fName;
        bytes16 lName;
        bytes16 email;
        bytes16 company;
        bytes16 country;
        bytes16 add;
        uint[] jobIds;

          }

    mapping (address => Employer) user;
    address[] public employerList;

    event employerReg(
       uint256 usertype,
        bytes16 fName,
        bytes16 lName,
        bytes16 email,
        bytes16 company,
        bytes16 country,
        bytes16 add

    );

     function setEmployer(address _address, uint256 _usertype, bytes16 _fName, bytes16 _lName,bytes16 _email,bytes16 _company,bytes16 _country,bytes16 _add) onlyOwner public {
        var employer = user[_address];

        employer.usertype = _usertype;
        employer.fName = _fName;
        employer.lName = _lName;
        employer.email=_email;
        employer.company=_company;
        employer.country=_country;
        employer.add=_add;

        employerList.push(_address) -1;
        employerReg(_usertype,_fName, _lName,_email,_company,_country,_add);
    }



    function getemployers() view public returns(address[]) {
        return employerList;
    }

    function getemployer(address _address) view public returns (uint256, bytes16, bytes16, bytes16, bytes16, bytes16, bytes16) {
        return (user[_address].usertype, user[_address].fName, user[_address].lName,user[_address].email,user[_address].company,user[_address].country,user[_address].add);
    }



   }
