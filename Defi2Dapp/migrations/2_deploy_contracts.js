var Defi2 = artifacts.require("./Defi2.sol");

module.exports = function(deployer, network ,accounts) {
  console.log(accounts);
  
  deployer.deploy(Defi2);
};
