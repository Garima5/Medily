// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract EHR {
    struct Record {
        string cid;
        address patientID;
        address doctorID;
        uint256 timeAdded;
    }

    struct Patient {
        address id;
        Record[] records;
    }

    struct Doctor {
        address id;
    }

    uint public ran;

    mapping(address => Patient) public patients;
    mapping(address => Doctor) public doctors;

    // Events
    event DoctorAdded(address doctorID);
    event PatientAdded(address patientID);
    event RecordAdded(string cid, address patientID, address doctorID);

    // Modifier to ensure only registered doctors can call certain functions
    modifier senderIsDoctor() {
        require(doctors[msg.sender].id == msg.sender, "Only registered doctors can perform this action");
        _;
    }

    // Modifier to ensure the patient exists before performing an action
    modifier patientExists(address _patientId) {
        require(patients[_patientId].id == _patientId, "This patient does not exist");
        _;
    }

    // Modifier to ensure that the sender exists (either as a doctor or patient)
    modifier senderExists() {
        require(doctors[msg.sender].id == msg.sender || patients[msg.sender].id == msg.sender, "Sender must be a registered doctor or patient");
        _;
    }

    // Function to register a doctor
    function addDoctor() public {
        require(doctors[msg.sender].id != msg.sender, "This doctor already exists");
        doctors[msg.sender].id = msg.sender;
        emit DoctorAdded(msg.sender);
    }

    // Function to add a patient (only doctors can add patients)
    function addPatient(address _patientID) public senderIsDoctor {
        require(patients[_patientID].id != _patientID, "This patient already exists");
        patients[_patientID].id = _patientID;
        emit PatientAdded(_patientID);
    }

    // Function to add a record (only doctors can add records, and the patient must exist)
    function addRecord(string memory _cid, address _patientID) public senderIsDoctor patientExists(_patientID) {
        Record memory record = Record(_cid, _patientID, msg.sender, block.timestamp);
        patients[_patientID].records.push(record);
        emit RecordAdded(_cid, _patientID, msg.sender);
    }

    // Function to get patient records (either the patient or a doctor can access this)
    function getRecords(address _patientID) public view senderExists patientExists(_patientID) returns (Record[] memory) {
        return patients[_patientID].records;
    }

    function returnRandomVal() public returns(uint ){
        ran = 10;
        return ran;
    }

    
}
