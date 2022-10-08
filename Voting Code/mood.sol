//License-Identifier : MIT
pragma solidity 0.8.17;

contract mood{
    string public userMood;

    function setMood(string memory str) public{
        userMood = str;
    }

    function getMood() public view returns(string memory){
        return(userMood);
    }
    
}