pragma solidity 0.5.16;

pragma experimental ABIEncoderV2;

import "./SafeMath.sol";
/// @title Défi #2: Place de marché d’illustrateurs indépendants
/// @author Ines Khoufi
/// @notice Ce contrat assure les fonctionalités suivantes: Mécanisme de réputation, Liste de demandes, Mécanisme de contractualisation
/// @dev Des fonctions basiques

contract Defi2 {
    using SafeMath for uint;
    address private admin;
    enum etatDemande {OUVERTE, ENCOURS, FERMER}
    Demande[] private demandes;
    Utilisateur[] ListUtilisateurs;
    mapping (address => Utilisateur) public utilisateur;
    mapping (address => bool) public bannies;

    struct Utilisateur {
        string nom;
        string prenom;
        address adr;
        uint reputation;
    }
    struct Demande {
        uint renumeration;
        uint delais;
        uint minReputation;
        string decrireTache;
        etatDemande etat;
        address[] candidatsAddress;
        address entrepriseAddress;
        address candidatAccepte;
        bytes32 linkDepot;
        bool autorisePayment;
        //mapping(address => Utilisateur) candidats;
    }
    modifier nestInscrit(){
        require(utilisateur[msg.sender].adr != msg.sender, "Utilisateur déja inscrit");
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

    /// @notice Cette fonction d'inscrire un utilisateur
    /// @param _nom le nom de l'utilisateur
    /// @param _prenom le prenom de l'utilisateur

    function inscription(string memory _nom, string memory _prenom) public nestInscrit()
    nEstPasBannie(msg.sender){
        Utilisateur memory user = Utilisateur(_nom, _prenom, msg.sender, 1);
        utilisateur[msg.sender] = user;
        ListUtilisateurs.push(user);
    }

    ///@notice Cette fonction permet a l'Administrateur de Bannir un utilisateur
    ///@param _address addresse de l'utilisateur qui va etre bannie

    function bannie (address _address) public  nEstPasBannie(_address) estAdmin  {
        require (utilisateur[_address].adr == _address, "n'est pas inscrit");
        bannies[_address] = true;
        utilisateur[_address].reputation = 0;
    }

    /// @notice Cette fonction permet d'ajouter une demande d'offre d'emploi
    /// @param _renumeration Renumeration proposée
    /// @param _delais delais de la demande
    /// @param _decrireTache decription de l'offre
    /// @param _etat etat de la demande (Ouverte,encours,fermé)
    /// @param _minReputation la reputation minimale necessaire pour postuler à l'offre

    function ajouterDemande(uint _renumeration, uint _delais, string memory _decrireTache, etatDemande _etat,
    uint _minReputation) public payable {
      require(_renumeration > 0, "Il faut une renumeration > 0");
      require(utilisateur[msg.sender].adr == msg.sender, "utilisateur n'est pas inscrit");
      require(_delais > 0, "il faut un delais > 0");
      require(msg.value >= _renumeration.add(_renumeration.mul(2).div(100)), "msg.value : n'est pas suffisant");
      require(bytes(_decrireTache).length > 0, "Il faut une description des taches");
      require(_etat == etatDemande.OUVERTE || _etat == etatDemande.FERMER, "l'etat de la Demande est indefini");
      require(_minReputation > 0, "la reputation minimale doit etre > 0");
      Demande memory dem;
      dem.renumeration = _renumeration;
      dem.delais = _delais;
      dem.decrireTache = _decrireTache;
      dem.etat = _etat;
      dem.minReputation = _minReputation;
      dem.entrepriseAddress = msg.sender;
      demandes.push(dem);
      uint val = _renumeration.add(_renumeration.mul(2).div(100));
      emit eventAjouterDemande(msg.sender, val);
    }

    /// @notice Cette fonction permet a un utilisateur (createur de la demande) de changer l'etat de la demande
    /// @param _indiceDemande indice de la demande
    /// @param _etat etat de la demande (Ouverte,encours,fermé)

    function changerEtatDemande(uint _indiceDemande, etatDemande _etat) public nestInscrit() {
        require(demandes[_indiceDemande].entrepriseAddress == msg.sender, "vous n'etes pas le createur de la demande");
        demandes[_indiceDemande].etat = _etat;
    }

    /// @notice Cette fonction permet a un utilisateur (candidat) de postuler à une demande (offre)
    /// @param _indiceDemande indice de la demande

    function postuler(uint _indiceDemande) public {
      require (utilisateur[msg.sender].adr == msg.sender, "n'est pas inscrit");
      require(_indiceDemande < demandes.length, "la demandes n'existe pas");
      require(demandes[_indiceDemande].etat == etatDemande.OUVERTE, "la demande n'est pas ouverte");
      demandes[_indiceDemande].candidatsAddress.push(msg.sender);
     // demandes[_indiceDemande].candidats[msg.sender] = utilisateur[msg.sender];
    }

    /// @notice Cette fonction permet a un utilisateur (representant de l'entreprise) d'accepter une candidature
    /// @param _indiceDemande indice de la demande
    /// @param _candidatAccepte l'adresse du candidat accepté

    function accepterOffre(uint _indiceDemande,address _candidatAccepte) public {
        require (utilisateur[msg.sender].adr == msg.sender, "n'est pas inscrit");
        require (utilisateur[_candidatAccepte].adr == _candidatAccepte, "n'est pas inscrit");
        require(_indiceDemande < demandes.length, "la demandes n'existe pas");
        require(demandes[_indiceDemande].entrepriseAddress == msg.sender, "vous n'etes pas le titulaire de la demande");
        require(demandes[_indiceDemande].etat == etatDemande.OUVERTE, "la demande n'est pas ouverte");
        //require(demandes[_indiceDemande].minReputation <= demandes[_indiceDemande].candidats[_candidatAccepte].reputation,
       //  "ce profile ne peux pas etre accepté");
        demandes[_indiceDemande].candidatAccepte = _candidatAccepte;
        demandes[_indiceDemande].etat = etatDemande.ENCOURS;
    }

    /// @notice Cette fonction calcule un hash avec la fonction keccak256
    /// @param _link le lien du depo github
    /// @return le hash du lien
    function hashDepot(string memory _link) public pure returns (bytes32) {
        return keccak256(bytes(_link));
    }

    /// @notice Cette fonction calcule un hash avec la fonction keccak256
    /// @param _indiceDemande l'indice de la demande
    /// @param _linkDepot le hash du lien du depo github
 

    function livraison(uint _indiceDemande, bytes32 _linkDepot) public {
        require (utilisateur[msg.sender].adr == msg.sender, "n'est pas inscrit");
        require(_indiceDemande < demandes.length, "la demandes n'existe pas");
        require(demandes[_indiceDemande].candidatAccepte == msg.sender, "vous n'etes pas le candidat accepté pour cette demande");
        require(demandes[_indiceDemande].etat == etatDemande.ENCOURS, "la demande n'est pas en cours");
        demandes[_indiceDemande].linkDepot = _linkDepot;
        demandes[_indiceDemande].etat = etatDemande.FERMER;
        demandes[_indiceDemande].autorisePayment = true;
        utilisateur[msg.sender].reputation = utilisateur[msg.sender].reputation.add(1);
    }

    /// @notice Cette fonction permet de payer un uilisateur (candidat accepté)
    /// @param _indiceDemande indice de la demande

    function renumeration(uint _indiceDemande) public  payable {
        require (utilisateur[msg.sender].adr == msg.sender, "n'est pas inscrit");
        require(_indiceDemande < demandes.length, "la demandes n'existe pas");
        require(demandes[_indiceDemande].candidatAccepte == msg.sender, "vous n'etes pas le candidat accepté pour cette demande");
        require(demandes[_indiceDemande].autorisePayment == true, "Payment pas encore autorisé");
        msg.sender.transfer(demandes[_indiceDemande].renumeration);
        demandes[_indiceDemande].autorisePayment = true;
        emit eventCandidatPaye(msg.sender,demandes[_indiceDemande].renumeration);
    }

    function getAdmin() public view returns(address) {
        return admin;
    }

    function getAllDemandes() public view returns(Demande[] memory) {
        return demandes;
    }
    function getAllUtilisateur() public view returns(Utilisateur[] memory) {
        return ListUtilisateurs;
    }

    function getDemande(uint _indice) public view returns(Demande memory) {
        return demandes[_indice];
    }
    function getUtilisateur(address _address) public view returns(Utilisateur memory) {
        return utilisateur[_address];
    }
   
    function getBannies(address _address) public view returns(bool) {
        return bannies[_address];
    }
    
}