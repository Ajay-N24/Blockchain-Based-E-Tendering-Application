// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Tender {
    address public owner;
    constructor(){
        owner=msg.sender;
    }
    struct TenderDetails {
        string title;
        string tenderType;
        uint256 quantity;
        uint256 budget;
        string description;
        uint256 expiryDate;
        address createdBy;
    }
    mapping(address => TenderDetails[]) public userTenders;
    TenderDetails[] public allTenders;

    function createTender(
        string memory _title,
        string memory _tenderType,
        uint256 _quantity,
        uint256 _budget,
        string memory _description,
        uint256 _expiryDate
    ) external {
        TenderDetails memory newTender = TenderDetails({
            title: _title,
            tenderType: _tenderType,
            quantity: _quantity,
            budget: _budget,
            description: _description,
            expiryDate: _expiryDate,
            createdBy: msg.sender
        });
        userTenders[msg.sender].push(newTender);
        allTenders.push(newTender);
    }
    function getAllTenders() public view returns (TenderDetails[] memory) {
        return allTenders;
    }

    function getTendersByUser(address _user)
        external
        view
        returns (TenderDetails[] memory)
    {
        return userTenders[_user];
    }
    function isOwner() public view returns (bool){
        return (msg.sender==owner);
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
}
