var Defi2 = artifacts.require("./Defi2.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
};
