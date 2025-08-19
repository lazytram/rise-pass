require("@nomicfoundation/hardhat-toolbox");
require("dotenv/config");

const { riseTestnet } = require("wagmi/chains");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    riseTestnet: {
      type: "http",
      url: riseTestnet.rpcUrls.default.http[0],
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: riseTestnet.id,
    },
  },
};
