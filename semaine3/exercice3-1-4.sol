pragma solidity ^0.5.16;

contract Assemblee {

 address[] membres;
 Decision[] decisions;
 
 struct Decision {
   string description;
   uint votesPour;
   uint votesContre;
   mapping (address => bool)  aVote;
 }

 modifier existIndice(uint indice) {
     require(indice < decisions.length);
     _;
 }
 
 modifier estMembre(address utilisateur) {
     require(verifMembre(utilisateur), "Il faut être membre!");
     _;
 }
 
 modifier aVoter(uint indice) {
     require(decisions[indice].aVote[msg.sender]==false, "A déjà voter");
     _;
 }
 
 function rejoindre() public {
   membres.push(msg.sender);
 }
 
 function verifMembre(address utilisateur) public view returns (bool) {
    for(uint i; i < membres.length; i++) {
        if (membres[i] == utilisateur) {
            return true;
        }
    }
    return false;
 }
 
 function proposerDecision(string memory _description) public estMembre(msg.sender) {
    Decision memory decisionSimple;
    decisionSimple.description = _description;
    //decisionSimple.aVote[msg.sender] = false;
    decisions.push(decisionSimple);
 }
 
 function voter(uint indice, bool value) public existIndice(indice) estMembre(msg.sender) aVoter(indice) {
    if (value) {
            decisions[indice].votesPour++;
        } else {
            decisions[indice].votesContre++;
        }
    decisions[indice].aVote[msg.sender]=true;
 }

 function comptabiliser(uint indice) public existIndice(indice) view returns (int) {
     return int(decisions[indice].votesPour-decisions[indice].votesContre);
     
}

}
