pragma solidity 0.6.1;

import "./SafeMath.sol";

/// @title CryptoShirt is an ERC721 token
/// @author Ines Khoufi
/// @notice This contract is a game where players can create their own cryptshirt
/// The cryptoShirt is an ERC721 Token and it has a name and value initialised at 0 when it is created
/// The value of the cryptoshirt increases when his owner change.
contract CryptoShirt  {
    using SafeMath for uint;
    struct ShirtCharacteristics {
        string shirtName;
        uint value;
    }
    ShirtCharacteristics[] public shirts;

    mapping (uint => address) public shirtToOwner;
    mapping (address => uint) public ownerToShirtCount;
    // Mapping from token ID to approved address
    mapping (uint256 => address) internal tokenApproval;
    // Mapping from owner to operator approvals
    mapping (address => mapping (address => bool)) internal operatorApprovals;
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    /// @notice Function to create new crypto shirt
    /// @dev need to pay 20 finney to get new shirt but exchanging shirt is free
    /// @param _shirtName cryptoshirt name
    function createNewShirt (string calldata _shirtName) external payable {
        require(msg.value >= 20 finney, "need 20 finney for a new cryptoshirt");
        shirts.push(ShirtCharacteristics(_shirtName,0));
        uint id = shirts.length.sub(1);
        shirtToOwner[id] = msg.sender;
        ownerToShirtCount[msg.sender] = ownerToShirtCount[msg.sender].add(1);
    }

    /// @dev Gets the balance of the specified address
    /// @param _owner address to query the balance of
    /// @return uint256 representing the number of shirts owned by the passed address

    function balanceOf(address _owner) public view returns (uint256) {
        require(_owner != address(0), "address is Zero");
        return ownerToShirtCount[_owner];
     }

   /// @dev Gets the owner of the specified token ID
   /// @param _tokenId uint256 ID of the token to query the owner of
   /// @return owner address currently marked as the owner of the given token ID
    function ownerOf(uint256 _tokenId) public view returns (address) {
        require(shirtToOwner[_tokenId] != address(0), "Shirt ID does not exist");
        return shirtToOwner[_tokenId];
    }

    /// @notice transfer the shirt ownership
    /// @param _from owner address, _to destination address, _tokenId shirt ID
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external {
        require(_from != address(0), 'Address from is null');
        require(_to != address(0), 'Address to is null');
        require(ownerOf(_tokenId) != address(0), 'shirt ID does not exist');
        require(ownerOf(_tokenId) == _from, 'From address is not owner of the shirt');
        require(msg.sender == _from || operatorApprovals[_from][msg.sender] || tokenApproval[_tokenId] == msg.sender, 'transfer not approved');
        ownerToShirtCount[_from]--;
        ownerToShirtCount[_to]++;
        shirtToOwner[_tokenId] = _to;
        emit Transfer(_from, _to, _tokenId);
    }

    /// @notice Approves another address to transfer the given token ID
    /// @param _to address to be approved for the given token ID
    /// @param _tokenId uint256 ID of the token to be approved
    function approve(address _to, uint256 _tokenId) external {
        require(_to != address(0), 'Address _to is null');
        require(ownerOf(_tokenId) != address(0), 'shirt ID does not exist');
        //require(ownerOf(_tokenId) == msg.sender, 'You are not the shirt owner');
        tokenApproval[_tokenId] = _to;
        emit Approval(msg.sender, _to, _tokenId);
    }
    /// @notice get the approved address to transfer a given token id
    /// @param _tokenId cryptoshirt ID
    /// @return address approved
    function getApproved(uint256 _tokenId) external view returns(address) {
        require(shirtToOwner[_tokenId] != address(0), 'shirt ID does not exist');
        return tokenApproval[_tokenId];
    }

   /// @dev Sets or unsets the approval of a given operator
   /// An operator is allowed to transfer all tokens of the sender on their behalf
   /// @param _to operator address to set the approval
   /// @param _approved representing the status of the approval to be set
   function setApprovalForAll(address _to, bool _approved) public {
        require(_to != msg.sender, "You are the address te be approved");
        operatorApprovals[msg.sender][_to] = _approved;
        emit ApprovalForAll(msg.sender, _to, _approved);
  }
   /// @dev Tells whether an operator is approved by a given owner
   /// @param _owner owner address which you want to query the approval of
   /// @param _operator operator address which you want to query the approval of
   /// @return bool whether the given operator is approved by the given owner
   function isApprovedForAll(address _owner, address _operator) public view returns (bool) {
        return operatorApprovals[_owner][_operator];
    }
    /// @notice setter to set the value of the crypto shirt
    /// @param _tokenId that represents the cryptoshirt
    /// @param _value the value de be changed
    function setShirtCharacteristic(uint _tokenId, uint _value) external {
        shirts[_tokenId].value = _value;
    }

    /// @notice getter : to get the value of the cryptoshirt
    /// @param _tokenId of the the cryptoshirt
    function getShirtCharacteristic(uint _tokenId) external view returns (uint){
        return shirts[_tokenId].value;
    }
}
