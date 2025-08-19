const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying RisePassportNFT...");

  // Pour le déploiement local, utiliser le premier compte du nœud Hardhat
  const [deployer] = await ethers.getSigners();
  console.log("Deploying from address:", deployer.address);

  // Générer une clé de minting (à garder secrète)
  const mintingKey = ethers.randomBytes(32);
  const mintingKeyHash = ethers.keccak256(mintingKey);

  console.log("Minting Key Hash:", mintingKeyHash);
  console.log(
    "⚠️  SAVE THIS MINTING KEY SECURELY:",
    ethers.hexlify(mintingKey)
  );

  // Vérifier le solde du wallet
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Wallet balance:", ethers.formatEther(balance), "ETH");

  if (balance === 0n) {
    throw new Error("Wallet has no balance to deploy contract");
  }

  const RisePassportNFT = await ethers.getContractFactory(
    "RisePassportNFT",
    deployer
  );
  const passportNFT = await RisePassportNFT.deploy(
    "Letest",
    "MS",
    mintingKeyHash
  );

  await passportNFT.waitForDeployment();

  const address = await passportNFT.getAddress();
  console.log("RisePassportNFT deployed to:", address);
  console.log("Contract address:", address);
  console.log("Minting key hash:", mintingKeyHash);
  console.log("⚠️  IMPORTANT: Save the minting key securely!");
  console.log("⚠️  Add this to your .env.local:");
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`);
  console.log(`NEXT_PUBLIC_MINTING_KEY=${ethers.hexlify(mintingKey)}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
