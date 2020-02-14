pragma solidity ^0.5.12;

//import "github.com/OpenZeppelin/openzeppelin-contract/contracts/GSN/Context.sol";
//import "github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
//import "github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC20/ERC20Detailed.sol";


import "@openzeppelin/contracts/GSN/Context.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; 
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
 
contract ArtipToken is Context, ERC20, ERC20Detailed {
    
     /**
     * @dev Constructor that gives _msgSender() all of existing tokens.
     *
     */
    constructor () public ERC20Detailed("ArtipToken", "ARTIP", 18) {
        _mint(_msgSender(), 5 * (10 ** uint256(decimals())));
    }

}

 
contract ArtipCrowdSale is Context, ERC20, ArtipToken {

    uint private datePreSaleStart = 1580598000;
    uint private datePreSaleEnd = 1593468000;
    uint private dateSaleStart = 1593554400;
    uint private dateSaleEnd = 1601416800;
    uint private dateRemboursementStart = 1604185200;
    uint private dateRemboursementEnd = 1609369200;
    uint private minContrubPreSale = 10 ether;
    uint private maxContrubPreSale = 1000 ether;
    uint private minContrubSale = 5 ether;
    uint private maxContrubSale = 500 ether;
    uint private maxArtip = 6000000*10**(18) ;
    uint private preSalReduction = 20; //20%
    
    // The token being sold
    ArtipToken private  artiptoken;
    
    // Address where funds are collected
    address payable private _wallet;
    
    // How many token units a buyer gets per wei.
    uint256 private _rate = 1;
    
    // Amount of wei raised
    uint256 private _weiRaised;
    
    
    mapping(address=>Personne) public whiteliste;
    mapping(address=>uint) private listAcheteurs;
    
    address admin;
    
    struct Personne {
        string nom;
        string prenom;
        address _address;
    }
    
    modifier onlyAdmin{
        require(admin == msg.sender, "erreur: not admin");
        _;
    }
    
    /**
     * Event for token purchase logging
     * @param purchaser who paid for the tokens
     * @param beneficiary who got the tokens
     * @param value weis paid for purchase
     * @param amount amount of tokens purchased
     */
    event TokensAchete(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);
    
    constructor (address payable wallet) public {
        require(wallet != address(0), "Crowdsale: wallet is the zero address");
        _wallet = wallet;
        artiptoken = new ArtipToken();
        admin = msg.sender;
}

   
    
    function acheterArtipToken() public  payable {
        uint256 weiAmount = msg.value;
        address beneficiary= msg.sender;
        uint256 artip;
        _premiereValidation(beneficiary, weiAmount);
        
        if (whiteliste[msg.sender]._address == msg.sender && now < datePreSaleEnd){
            _preSaleValidation(weiAmount);
            artip = _getTokenAmount(weiAmount+weiAmount.mul(preSalReduction).div(100));
            
        } else {
             _SaleValidation(weiAmount);
             artip = _getTokenAmount(weiAmount);
            
        }
        _weiRaised = _weiRaised.add(weiAmount);
        _envoieTokens(beneficiary,artip);
        _forwardFunds();
        listAcheteurs[msg.sender].add(weiAmount);
    }
    
    function remboursement() public {
        require(now >= dateRemboursementStart && now <= dateRemboursementEnd , " remboursement non disponible actuellement");
        require(listAcheteurs[msg.sender]>0, "rien a rembourser");
        transfer(msg.sender, listAcheteurs[msg.sender]);
        _weiRaised.sub(listAcheteurs[msg.sender]);
        listAcheteurs[msg.sender]=0;
    }
    
    function _premiereValidation(address beneficiary, uint256 weiAmount) internal view {
        require(artiptoken.totalSupply() < maxArtip, "le maximum de artip est atteint");
        require(beneficiary != address(0), "Crowdsale: beneficiary is the zero address");
        require(weiAmount != 0, "Crowdsale: weiAmount is 0");
        require(now >= datePreSaleStart && now <= dateSaleEnd, " sale expiré !");
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
    }
    
    function _preSaleValidation(uint256 weiAmount) internal view {
        require(weiAmount >= minContrubPreSale && weiAmount <= maxContrubPreSale , "montant non valide");
        require(artiptoken.totalSupply().add(weiAmount) < maxArtip, "le maximum de artip est atteint");
        this;
    }
    
    function _SaleValidation(uint256 weiAmount) internal view {
        require(weiAmount >= minContrubSale && weiAmount <= maxContrubSale , "montant non valide");
        require(artiptoken.totalSupply().add(weiAmount) < maxArtip, "le maximum de artip est atteint");
        require(now >= dateSaleStart,"sale non disponible");
        this;
    }
    
    
    function _envoieTokens(address beneficiary, uint256 tokenAmount) internal {
        artiptoken.transfer(beneficiary, tokenAmount);
    }
    
    function _getTokenAmount(uint256 weiAmount) internal view returns (uint256) {
        return weiAmount.mul(_rate);
    }
    
     /**
     * @dev Determines how ETH is stored/forwarded on purchases.
     */
    function _forwardFunds() internal {
        _wallet.transfer(msg.value);
    }
    
    function ajouterPersonne (string memory _nom, string memory _prenom, address _address) public onlyAdmin {
        Personne memory p = Personne(_nom, _prenom, _address);
        whiteliste[_address] = p;
    }
}

