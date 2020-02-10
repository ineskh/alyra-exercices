pragma solidity ^0.5.16;

contract Defi2 {
    
    
    mapping (address => Utilisateur) public utilisateur; 
    mapping (address => bool) public bannies;
    address admin;
    
    
    struct Utilisateur {
        string nom;
        string prenom;
        address adr;
        int reputation;
    }
    constructor() public {
        admin = msg.sender;
    }
    modifier estInscrit(address _address){
        require(utilisateur[_address].adr != msg.sender, "Utilisateur déja inscrit");
        _;
    }
    modifier estAdmin(){
        require(admin == msg.sender, "Vous n'êtes pas administrateur");
        _;
    }
    modifier nEstPasBannie(address _address){
        require(bannies[_address] == false, "déja bannie");
        _;
    }
    
    function inscription(string memory _nom, string memory _prenom) public estInscrit(msg.sender) nEstPasBannie(msg.sender) { // mais le modifier nEstPasBannie ne sert a rien puisque il ya le modifier estInscrit
        Utilisateur memory user = Utilisateur(_nom,_prenom,msg.sender,1);
        utilisateur[msg.sender] = user;
    }
    
    function bannie (address _address) public estInscrit(_address) nEstPasBannie(_address) estAdmin  {
        bannies[_address] = true;
        utilisateur[_address].reputation = 0;
    }
    
}