require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').Hardhacd fr  tUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    ganache: {
      url: 'http://127.0.0.1:7545',
    },
    testnet: {
      url: 'https://testnet.evm.nodes.onflow.org',
      accounts: [`5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a`], // In practice, this should come from an environment variable and not be commited
      gas: 100000000, // Example gas limit
    },


} }
