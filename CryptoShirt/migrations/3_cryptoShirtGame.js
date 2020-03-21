const CryptoShirtGame = artifacts.require("CryptoShirtGame");
const CryptoShirt = artifacts.require("CryptoShirt");

module.exports = function(deployer) {
  deployer.deploy(CryptoShirtGame, CryptoShirt.address);
};