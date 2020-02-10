pragma solidity ^0.5.16;

contract Assemblee {

 address[] membres;
 Decision[] decisions;
 mapping(address => bool) admistrateurs;
 mapping(address => uint) blameMembre;
 string public nomAssemblee;
 
 struct Decision {
   string description;
   uint votesPour;
   uint votesContre;
   bool statut; //true => ouverte; false=>fermée
   mapping (address => bool)  aVote;
   mapping (address => uint)  voteAdmin; //celui qui a le max uint après le vote sera Admin (dans admistrateurs[adr] = true)
 }
 

 modifier existIndice(uint indice) {
     require(indice < decisions.length, "la proposition n'existe pas");
     _;
 }
 
 modifier estMembre(address utilisateur) {
     require(verifMembre(utilisateur), "Il faut être membre!");
     _;
 }
 
 modifier nEstPasMembre(address utilisateur) {
     require(verifMembre(utilisateur) == false, "Déjà membre");
     _;
 }
 
 modifier aVoter(uint indice) {
     require(decisions[indice].aVote[msg.sender] == false, "A déjà voter");
     _;
 }
 
 modifier estAdmin() {
    require(admistrateurs[msg.sender] == true, "n'est pas admistrateur");
    _;
 }
 modifier estOuverte (uint _indice){
     require(decisions[_indice].statut == true, "la proposition est fermée");
     _;
 }
 constructor(string memory nom) public {
     nomAssemblee = nom;
     //membres.push(msg.sender);
     rejoindre();
     admistrateurs[msg.sender] = true;
 }
 
 function nommerAdmin(address adr) public estMembre(adr) estAdmin {
     admistrateurs[adr] = true;
 }
 
 function demisionnerAdmin() public estAdmin {
     admistrateurs[msg.sender] = false;
 }
 
 function fermerProposition(uint indice) public  estAdmin existIndice(indice) estOuverte (indice) {
     decisions[indice].statut = false; 
 } 
 
 function blame(address _adr) public estAdmin() estMembre(_adr) {
     blameMembre[_adr]++;
     
     if(blameMembre[_adr] > 1) {
         uint i;
         while (membres[i] != _adr){
             i++;
         }
         membres[i] = membres[membres.length-1];
         membres.length--;
     }
     
 } 
 
 function rejoindre() public nEstPasMembre(msg.sender) {
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
    decisionSimple.statut = true;
    decisions.push(decisionSimple);
 }
 
 function voter(uint indice, bool value) public existIndice(indice) estOuverte(indice) estMembre(msg.sender) aVoter(indice) {
    if (value) {
            decisions[indice].votesPour++;
        } else {
            decisions[indice].votesContre++;
        }
    decisions[indice].aVote[msg.sender]=true;
 }

 function comptabiliser(uint indice) public existIndice(indice) estOuverte(indice) view returns (int) {
     return int(decisions[indice].votesPour-decisions[indice].votesContre);
     
}

}
