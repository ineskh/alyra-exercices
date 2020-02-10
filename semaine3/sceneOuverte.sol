pragma solidity ^0.5.16;

contract SceneOuverte {

    string[12] passagesArtistes;  
    uint creneauxLibres = 12;
    uint tour;

    function sInscrire(string memory nomDArtiste) public { 
        
        if (creneauxLibres > 0) {
            passagesArtistes[passagesArtistes.length-creneauxLibres] = nomDArtiste;
            creneauxLibres -= 1;
        }
        
    }

    function passerArtisteSuivant() public {
        
        if (tour < passagesArtistes.length) {
            
            tour += 1;
        }
        
        
    }
    
    function artisteEnCours() public view  returns (string memory) {
        
        if (tour < passagesArtistes.length) {
        
            return passagesArtistes[tour];
            
        }else {
            
            return "FIN";
        }
        
    }
    
}