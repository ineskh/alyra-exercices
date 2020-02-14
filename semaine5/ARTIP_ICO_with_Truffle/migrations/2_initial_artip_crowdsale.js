const ArtipCrowdSale = artifacts.require("ArtipCrowdSale");

module.exports = function(deployer) {
  deployer.deploy(ArtipCrowdSale, "0x13706550eA6dDA91EcE780EBe03Dd2dEc12BDA18");
};