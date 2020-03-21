pragma solidity 0.6.1;
import "./SafeMath.sol";
import "./cryptoShirt.sol";

contract CryptoShirtGame  {
    using SafeMath for uint;
    CryptoShirt private cryptoshirt;
   /// @notice when someone ask for exchanging its cryptoshirt with another someone
    struct RequestExchange {
           uint _token1;
           uint _token2;
           address ownerT1;
           address ownerT2;
           bool accepted;
           bool exchange;
   }
    RequestExchange[] public listePotentialRequest;
    constructor (CryptoShirt _cryptoshirt) public {
       cryptoshirt = _cryptoshirt;
    }
    /// @notice A player asks for exchanging his cryptoShirt with another
    /// @param _myToken is the player shirt
    /// @param _tokenWanted is the shirt of the other player
    function requestExchangingShirt(uint _myToken, uint _tokenWanted) public {
        require(cryptoshirt.ownerOf(_tokenWanted) != address(0), 'shirt ID does not exist');
        require(cryptoshirt.ownerOf(_myToken) != address(0), 'shirt ID does not exist');
        require(cryptoshirt.ownerOf(_myToken) == msg.sender, "You are not the owner");
        RequestExchange memory R = RequestExchange (_myToken,_tokenWanted, msg.sender, cryptoshirt.ownerOf(_tokenWanted), false, false);
        listePotentialRequest.push(R);
    }
    /// @notice Once a request for exchanging is emitted
    /// the second player can accept the exchanging by calling this function
    /// @param _requestID corresponds to the request to accept
    function acceptExchangingShirt(uint _requestID) public {
        require(_requestID < listePotentialRequest.length, "Request does not exist");
        require(listePotentialRequest[_requestID].accepted == false, "Exchange shirt already done");
        require(listePotentialRequest[_requestID].ownerT2 == msg.sender, "You are not the owner of the shirt");
        listePotentialRequest[_requestID].accepted = true;
    }
    /// @notice One of the two player could call this function
    /// @dev this function need approval before calling
    /// the approval should be done to the contract address since this the safeTransferFrom is called by the contract and not the ownerT
    /// @param _requestID corresponds to the request of the exchange
    function makeExchange(uint _requestID) public {
        require(_requestID < listePotentialRequest.length, "Request does not exist");
        require(listePotentialRequest[_requestID].accepted == true, "Exchange shirt not accepted");
        require(listePotentialRequest[_requestID].exchange == false, "Exchange already done");
        require(msg.sender == listePotentialRequest[_requestID].ownerT1 || msg.sender == listePotentialRequest[_requestID].ownerT2,
        "Your are considered by this echange");
        cryptoshirt.safeTransferFrom(listePotentialRequest[_requestID].ownerT2,
                                     listePotentialRequest[_requestID].ownerT1, listePotentialRequest[_requestID]._token2);
        cryptoshirt.safeTransferFrom(listePotentialRequest[_requestID].ownerT1,
                                     listePotentialRequest[_requestID].ownerT2, listePotentialRequest[_requestID]._token1);
        listePotentialRequest[_requestID].exchange = true;
        cryptoshirt.setShirtCharacteristic(listePotentialRequest[_requestID]._token1,
        cryptoshirt.getShirtCharacteristic(listePotentialRequest[_requestID]._token1).add(10));
        cryptoshirt.setShirtCharacteristic(listePotentialRequest[_requestID]._token2,
        cryptoshirt.getShirtCharacteristic(listePotentialRequest[_requestID]._token2).add(10));
    }
}