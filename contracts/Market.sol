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
        string email;
        string phoneNo;
        string statement;
        uint rate;
        uint[] profileIds;
        uint defaultProfileId;
        uint id;
        Status status;
    }

    struct Profile {
        uint id;
        address employeeCode;
        string name;
        string cvHash;
        Skill[] skills;
        Status status;
    }

    struct Employer {
        address code;
        string name;
        string email;
        string company;
        string add;
        string country;
        uint[] jobIds;
        Status status;
    }


    struct Job {
        uint id;
        address employerCode;
        Skill[] requiredSkills;
        address[] appliedEmployeeCodes;
        Status status;
        string JobTitle;
        uint hourlyRate;
        string Description;
    }


    function setEmployee(string _name, string _email, string _phoneNo, string _statement, uint _rate) public {
        address _address = msg.sender;
        setEmployeeWithAddress(_address, _name, _email, _phoneNo, _statement, _rate);
    }
    function setEmployeeWithAddress(address _address, string _name, string _email, string _phoneNo, string _statement, uint _rate) public {
        Employee storage employee = employeeMap[_address];
        employee.code = _address;
        employee.name = _name;
        employee.email = _email;
        employee.phoneNo = _phoneNo;
        employee.statement = _statement;
        employee.rate = _rate;
        employee.status = Status.ACTIVE;
        employeeCodes.push(_address);
    }
    function getEmployee(address _address) view public returns(string,string,string,string,uint, uint[], uint, Status) {
        Employee memory employee = employeeMap[_address];
        return(employee.name,employee.email,employee.phoneNo,employee.statement,employee.rate, employee.profileIds, employee.defaultProfileId, employee.status);
    }
    function getEmployeeCodes() view public returns(address[] codes) {
        return employeeCodes;
    }


    function setEmployer(string _name, string _email, string _company, string _add, string _country) public {
        address _address = msg.sender;
        setEmployerWithAddress(_address, _name, _email, _company, _add, _country);
    }
    function setEmployerWithAddress(address _address, string _name, string _email, string _company, string _add, string _country) public {
        Employer storage employer = employerMap[_address];
        employer.code = _address;
        employer.name = _name;
        employer.email = _email;
        employer.company = _company;
        employer.add = _add;
        employer.country = _country;
        employer.status = Status.ACTIVE;
        employerCodes.push(_address);
    }
    function getEmployer(address _address) view public returns(string name,string email, string company, string add, string country, uint[] jobIds, Status status) {
        Employer memory employer = employerMap[_address];
        return (employer.name,employer.email,employer.company,employer.add,employer.country, employer.jobIds, employer.status);
    }
    function getEmployerCodes() view public returns(address[]) {
        return employerCodes;
    }


    function setProfile(string _name, Skill[] _skills, string _cvHash, bool _defaultProfile) public {
            address _employeeCode = msg.sender;
            setProfileWithAddress(_employeeCode, _name, _skills, _cvHash, _defaultProfile);
    }
    function setProfileWithAddress(address _employeeCode, string _name, Skill[] _skills, string _cvHash, bool _defaultProfile) public {
        //throw if employee not found
        uint _id = profileId++;
        Profile storage profile = profileMap[_id];
        profile.id = _id;
        profile.employeeCode = _employeeCode;
        profile.name = _name;
        profile.skills = _skills;
        profile.cvHash = _cvHash;
        profile.status = Status.ACTIVE;
        allProfileIds.push(_id);
        Employee storage employee = employeeMap[_employeeCode];
        employee.profileIds.push(_id);
        if(_defaultProfile) {
            employee.defaultProfileId = _id;
        }
    }
    function getProfile(uint _id) view public returns(address, string, Skill[], string, Status) {
        Profile memory profile = profileMap[_id];
        return(profile.employeeCode, profile.name, profile.skills, profile.cvHash, profile.status);
    }
    function getAllProfileIds() view public returns(uint[] ids) {
        return allProfileIds;
    }

    function setJob(string _JobTitle, Skill[] _requiredSkills, uint _hourlyRate, string _Description) public {
        address _employerCode = msg.sender;
        setJobWithAddress(_employerCode, _JobTitle, _requiredSkills,_hourlyRate,_Description);
    }
    function setJobWithAddress(address _employerCode, string _JobTitle, Skill[] _requiredSkills, uint _hourlyRate, string _Description) public {
        uint _id = jobId++;
        Job storage job = jobMap[_id];
        job.id = _id;
        job.employerCode = _employerCode;
        job.JobTitle = _JobTitle;
        job.hourlyRate= _hourlyRate;
        job.Description=_Description;
        job.requiredSkills = _requiredSkills;
        job.status = Status.VACANT;
        //appliedEmployeeCodes
        allJobIds.push(_id);
        Employer storage employer = employerMap[_employerCode];
        employer.jobIds.push(_id);
    }

    function updateJobAppliedEmployees(uint _jobId) public {
        Job storage job = jobMap[_jobId];
        job.appliedEmployeeCodes.push(msg.sender);
    }
    function getJob(uint _id) view public returns(address, string, Skill[], uint, string, address[], Status) {
        Job memory job = jobMap[_id];
        return(job.employerCode, job.JobTitle, job.requiredSkills, job.hourlyRate, job.Description, job.appliedEmployeeCodes, job.status);
    }

    function getJobIdFromAddress(address _address) view public returns (uint[]) {
        return (employerMap[_address].jobIds);
    }

    function getAllJobIds() view public returns(uint[] postedJobIds) {
        return allJobIds;
    }

    //has duplicates
    function findEmployeeProfilesByJob(uint _jobId) view public returns(uint[] matchingProfiles) {
        uint noOfProfiles = profileId -1;
        Skill[] memory requiredSkills = jobMap[_jobId].requiredSkills;
        uint[] memory matchingProfileIds = new uint[](noOfProfiles * requiredSkills.length);
        uint index = 0;

        for(uint r=0; r<requiredSkills.length; r++) {
            Skill required = requiredSkills[r];

            for(uint p=1; p<=noOfProfiles; p++) {

                Skill[] memory skills = profileMap[p].skills;
                for(uint s=0; s<skills.length; s++) {
                    Skill skill = skills[s];

                    if(skill == required) {
                        matchingProfileIds[index++] = p;
                        break;
                    }
                }
            }
        }
        return matchingProfileIds;
    }

    function findJobsByEmployee() view public returns(uint[]) {
        uint defaultProfileId = employeeMap[msg.sender].defaultProfileId;
        uint noOfJobs = jobId -1;
        Skill[] memory skills = profileMap[defaultProfileId].skills;
        uint[] memory matchingJobIds = new uint[](skills.length * noOfJobs);
        uint index = 0;

        for(uint s=0; s<skills.length; s++) {
            Skill skill = skills[s];

            for(uint j=1; j<=noOfJobs; j++) {
                Job memory job = jobMap[j];

                Skill[] memory requiredSkills = job.requiredSkills;
                for(uint m=0; m<requiredSkills.length; m++) {
                    Skill required = requiredSkills[m];

                    if(skill == required) {
                        matchingJobIds[index++] = j;
                        break;
                    }

                }
            }

        }

        return matchingJobIds;
    }

    //has duplicates
    function findJobsByProfile(uint _profileId) view public returns(uint[] matchingIds) {
        uint noOfJobs = jobId -1;
        Skill[] memory skills = profileMap[_profileId].skills;
        uint[] memory matchingJobIds = new uint[](skills.length * noOfJobs);
        uint index = 0;

        for(uint s=0; s<skills.length; s++) {
            Skill skill = skills[s];

            for(uint j=1; j<=noOfJobs; j++) {
                Job memory job = jobMap[j];

                Skill[] memory requiredSkills = job.requiredSkills;
                for(uint m=0; m<requiredSkills.length; m++) {
                    Skill required = requiredSkills[m];

                    if(skill == required) {
                        matchingJobIds[index++] = j;
                        break;
                    }

                }
            }

        }

        return matchingJobIds;
    }

    function findJobsBySkill(Skill _skill) view public returns(uint[] matchingIds) {
        uint noOfJobs = jobId -1;

        uint[] memory matchingJobIds = new uint[](noOfJobs);

        uint index = 0;
        for(uint j=1; j<=noOfJobs; j++) {
            Job memory job = jobMap[j];

            Skill[] memory requiredSkills = job.requiredSkills;
            for(uint m=0; m<requiredSkills.length; m++) {
                Skill required = requiredSkills[m];

                if(_skill == required) {
                    matchingJobIds[index++] = j;
                    break;
                }

            }
        }
        return matchingJobIds;
    }

    function uintToSkill(uint _uint) pure public returns(string skill) {
        if(_uint == uint(Skill.JAVA))
            return "JAVA";
        if(_uint == uint(Skill.JS))
            return "JS";
        return "MONGO";
    }

}
