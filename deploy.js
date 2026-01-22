const hre = require("hardhat");

async function main() {
  // Example IPFS Base URI (Metadata folder)
  const baseURI = "https://ipfs.io/ipfs/QmYourHashHere/";

  const NFT = await hre.ethers.getContractFactory("GalleryNFT");
  const nft = await NFT.deploy(baseURI);

  await nft.deployed();

  console.log("GalleryNFT deployed to:", nft.address);
  console.log("Base URI set to:", baseURI);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
