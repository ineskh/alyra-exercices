pragma solidity ^0.5.16;

contract Assemblee {

address[] membres;

 function rejoindre() public {
   membres.push(msg.sender);
 }
 
 function estMembre(address utilisateur) public view returns (bool) {
    for(uint i; i < membres.length; i++) {
        if (membres[i] == utilisateur) {
            return true;
        }
    }
    return false;
 }

}