const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
        "5777": {
              "events": {},
              "links": {},
              "address": "",
              "transactionHash": ""
        },
        "3": {
          "events": {},
          "links": {},
          "address": "",
          "transactionHash": ""
        },
    develop: {
      //port: 8545
    }
  }
};
