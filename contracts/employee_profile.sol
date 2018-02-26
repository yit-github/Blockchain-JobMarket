pragma solidity ^0.4.18;

contract employee_profile {

    struct profiles {

        uint256 hourlyRate;
        bytes16 description;
        bytes32[] skills;
    }

    mapping (address => profiles) emp_pro;
    address[] public profileList;

    event set_profile(

         uint256 hourlyRate,
         bytes16 description,
         bytes32[] skills
    );

  function setprofile(address _address, uint256 _hourlyRate, bytes16 _description, bytes32[] _skill) public {

        var profile = emp_pro[_address];

        profile.hourlyRate = _hourlyRate;
        profile.description = _description;

        for(uint i = 0; i <_skill.length; i++)
           {
               profile.skills.push(_skill[i]);
           }

        profileList.push(_address) -1;
        set_profile(_hourlyRate,_description, _skill);
    }

  function getprofiles() view public returns(address[]) {
      return profileList;
  }

  function getprofile(address _address) view public returns (uint256, bytes16,bytes32[]) {
      return (emp_pro[_address].hourlyRate, emp_pro[_address].description,emp_pro[_address].skills);
  }
}
