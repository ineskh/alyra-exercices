
const ArtipToken = artifacts.require("ArtipToken"); 
const ArtipCrowdSale = artifacts.require("ArtipCrowdSale"); ArtipToken

module.exports = function(deployer) {
  deployer.deploy(ArtipToken);
  deployer.deploy(ArtipCrowdSale, "0x13706550eA6dDA91EcE780EBe03Dd2dEc12BDA18");
};