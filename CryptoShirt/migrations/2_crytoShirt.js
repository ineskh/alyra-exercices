const CryptoShirt = artifacts.require("CryptoShirt");

module.exports = function(deployer) {
  deployer.deploy(CryptoShirt);
};