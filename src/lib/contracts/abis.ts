export const RISE_PASSPORT_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "string",
        name: "discordId",
        type: "string",
      },
      {
        internalType: "string",
        name: "roleId",
        type: "string",
      },
      {
        internalType: "string",
        name: "roleName",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "mintingKey",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "svgData",
        type: "string",
      },
      {
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getPassportData",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "string",
            name: "discordId",
            type: "string",
          },
          {
            internalType: "string",
            name: "roleId",
            type: "string",
          },
          {
            internalType: "string",
            name: "roleName",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "mintedAt",
            type: "uint256",
          },
        ],
        internalType: "struct RisePassportNFT.PassportData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getTokenSVG",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "discordId",
        type: "string",
      },
      {
        internalType: "string",
        name: "roleId",
        type: "string",
      },
    ],
    name: "passportExists",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "discordId",
        type: "string",
      },
      {
        internalType: "string",
        name: "newRoleId",
        type: "string",
      },
    ],
    name: "canMintHigherRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "discordId",
        type: "string",
      },
    ],
    name: "getUserPassports",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "discordId",
        type: "string",
      },
    ],
    name: "getAddressByDiscord",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "discordId",
        type: "string",
      },
      {
        internalType: "string",
        name: "roleId",
        type: "string",
      },
    ],
    name: "getTokenIdByAddressAndDiscord",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMintingKeyHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "discordId",
        type: "string",
      },
    ],
    name: "isDiscordRegistered",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "newMintingKeyHash",
        type: "bytes32",
      },
    ],
    name: "updateMintingKey",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "discordId",
        type: "string",
      },
      {
        internalType: "address",
        name: "newWalletAddress",
        type: "address",
      },
    ],
    name: "updateWalletForDiscord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "discordId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "roleId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "roleName",
        type: "string",
      },
    ],
    name: "PassportMinted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "discordId",
        type: "string",
      },
      {
        indexed: true,
        internalType: "address",
        name: "oldWallet",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newWallet",
        type: "address",
      },
    ],
    name: "WalletUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "discordId",
        type: "string",
      },
      {
        indexed: true,
        internalType: "address",
        name: "oldWallet",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newWallet",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "admin",
        type: "address",
      },
    ],
    name: "AdminWalletOverride",
    type: "event",
  },
] as const;
