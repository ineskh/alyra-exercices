pragma solidity ^0.5.16;

pragma experimental ABIEncoderV2;

contract Whiteliste {
    
    //Personne [] public whiteliste;
    mapping(address=>Personne) public whiteliste;
    address admin;
    uint endTime;
    
    struct Personne {
        string nom;
        string prenom;
    }
    
    modifier onlyAdmin{
        require(admin == msg.sender, "erreur: not admin");
        _;
    }
    
    modifier isExpired{
        require(now <= endTime, "erreur: expired time");
        _;
    }
    
    constructor() public {
        admin = msg.sender;
        endTime = now + 10 days;
    }

    function ajouterPersonne (string memory _nom, string memory _prenom, address _address) public onlyAdmin isExpired{
        Personne memory p = Personne(_nom, _prenom);
        //whiteliste.push(p);
        whiteliste[_address] = p;
    }
    
    
    

}