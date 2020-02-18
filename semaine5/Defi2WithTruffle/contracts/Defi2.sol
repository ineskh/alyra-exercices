pragma solidity ^0.5.16;

pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract Defi2 {
    
    using SafeMath for uint;
    mapping (address => Utilisateur) public utilisateur; 
    mapping (address => bool) public bannies;
    address public admin;
    enum etatDemande {OUVERTE, ENCOURS, FERMER}
    Demande [] public demandes;
    
    struct Utilisateur {
        string nom;
        string prenom;
        address adr;
        uint reputation;
    }
    
    struct Demande {
        uint renumeration;
        uint delais;
        string decrireTache;
        etatDemande etat; 
        uint minReputation;
        address [] candidatsAddress;
        mapping(address => Utilisateur) candidats;
        address entrepriseAddress;
        address candidatAccepte;
        bytes32 linkDepot;
        bool autorisePayment;
        
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
    /*
     *Event ajouter demande
     *address du demandeur 
     *valeur a payer
    */
    event eventAjouterDemande(address demandeur, uint val);
    /*
     *Event candidat payé
     *address du candidat 
     *renumeration
    */
    event eventCandidatPaye(address candidat, uint val);
    
    constructor() public {
        admin = msg.sender;
    }
    
    function inscription(string memory _nom, string memory _prenom) public estInscrit(msg.sender) nEstPasBannie(msg.sender) { // mais le modifier nEstPasBannie ne sert a rien puisque il ya le modifier estInscrit
        Utilisateur memory user = Utilisateur(_nom, _prenom, msg.sender, 1);
        utilisateur[msg.sender] = user;
    }
    
    function bannie (address _address) public  nEstPasBannie(_address) estAdmin  {
        require (utilisateur[_address].adr == _address, "n'est pas inscrit");
        bannies[_address] = true;
        utilisateur[_address].reputation = 0;
    }
    
    function ajouterDemande(uint _renumeration, uint _delais, string memory _decrireTache, etatDemande _etat, uint _minReputation) public payable {
      require(_renumeration > 0 , "il faut une renumeration > 0");
      require(utilisateur[msg.sender].adr == msg.sender, "utilisateur n'est pas inscrit");
      require(_delais > 0, "il faut un delais > 0");
      require(msg.value >= _renumeration.mul(2).div(100)+_renumeration, "msg.value : n'est pas suffisant");
      require(bytes(_decrireTache).length > 0, "Il faut une description des taches");
      require(_etat == etatDemande.OUVERTE || _etat == etatDemande.FERMER , "l'etat de la Demande est indefini");
      require(_minReputation > 0, "la reputation minimale doit etre > 0");
      Demande memory dem ;
      dem.renumeration = _renumeration;
      dem.delais = _delais;
      dem.decrireTache = _decrireTache;
      dem.etat = _etat;
      dem.minReputation = _minReputation;
      dem.entrepriseAddress = msg.sender;
      demandes.push(dem);
      uint val = _renumeration.mul(2).div(100);
      emit eventAjouterDemande(msg.sender, val);

    }
    
    function changerEtatDemande(uint _indiceDemande, etatDemande _etat) public estInscrit(msg.sender) {
        require(demandes[_indiceDemande].entrepriseAddress == msg.sender);
        demandes[_indiceDemande].etat = _etat;
    }
    
    function postuler(uint _indiceDemande) public estInscrit(msg.sender) {
      require(_indiceDemande < demandes.length, "la demandes n'existe pas");
      require(demandes[_indiceDemande].etat == etatDemande.OUVERTE, "la demande n'est pas ouverte");
      demandes[_indiceDemande].candidatsAddress.push(msg.sender);
      demandes[_indiceDemande].candidats[msg.sender] = utilisateur[msg.sender];
      demandes[_indiceDemande].etat = etatDemande.ENCOURS;
    }
    
    function accepterOffre(uint _indiceDemande,address _candidatAccepte) public estInscrit(msg.sender) estInscrit(_candidatAccepte){
        require(_indiceDemande < demandes.length, "la demandes n'existe pas");
        require(demandes[_indiceDemande].entrepriseAddress == msg.sender, "vous n'etes pas le titulaire de la demande");
        require(demandes[_indiceDemande].etat == etatDemande.OUVERTE, "la demande n'est pas ouverte");
        require(demandes[_indiceDemande].minReputation <= demandes[_indiceDemande].candidats[_candidatAccepte].reputation, "ce profile ne peux pas etre accepté");
        demandes[_indiceDemande].candidatAccepte = _candidatAccepte;
        demandes[_indiceDemande].etat = etatDemande.ENCOURS;
        
    }
    
    function hashDepot(bytes  memory _link) public pure returns (bytes32) {
        return keccak256(_link);
    }
    
    function livraison(uint _indiceDemande, bytes32 _linkDepot) public estInscrit(msg.sender) {
        require(_indiceDemande < demandes.length, "la demandes n'existe pas");
        require(demandes[_indiceDemande].candidatAccepte == msg.sender, "vous n'etes pas le candidat accepté pour cette demande");
        require(demandes[_indiceDemande].etat == etatDemande.ENCOURS, "la demande n'est pas en cours");
        demandes[_indiceDemande].linkDepot = _linkDepot;
        demandes[_indiceDemande].etat = etatDemande.FERMER;
        utilisateur[msg.sender].reputation.add(1);
        demandes[_indiceDemande].autorisePayment =true;
        
    }
    
    function renumeration(uint _indiceDemande) public estInscrit(msg.sender) payable {
        require(_indiceDemande < demandes.length, "la demandes n'existe pas");
        require(demandes[_indiceDemande].candidatAccepte == msg.sender, "vous n'etes pas le candidat accepté pour cette demande");
        require(demandes[_indiceDemande].autorisePayment == true, "Payment pas encore autorisé");
        msg.sender.transfer(demandes[_indiceDemande].renumeration);
        demandes[_indiceDemande].autorisePayment = true;
        emit eventCandidatPaye(msg.sender,demandes[_indiceDemande].renumeration);
    }
}