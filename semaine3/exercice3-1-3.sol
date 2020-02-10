pragma solidity ^0.5.16;

contract Assemblee {

 address[] membres;
 string[] descriptionDecisions;
 uint[] votesPour;
 uint[] votesContre;

 modifier existIndice(uint indice){
     require(indice < descriptionDecisions.length);
     _;
 }
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
 
 function proposerDecision(string memory description) public {
   if(estMembre(msg.sender)){
     descriptionDecisions.push(description);
     votesPour.push(0);
     votesContre.push(0);
   }
 }
 
 function voter(uint indice, bool value) public existIndice(indice) {
    if(estMembre(msg.sender)) { 
        if (value) {
                votesPour[indice]++;
            } else {
                votesContre[indice]++;
            }
    }
     
}

 function comptabiliser(uint indice) public existIndice(indice) view returns (int) {
     return int(votesPour[indice]-votesContre[indice]);
     
}

}
