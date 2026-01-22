const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GalleryNFT", function () {
  it("Should mint and track ownership", async function () {
    const [owner] = await ethers.getSigners();
    const NFT = await ethers.getContractFactory("GalleryNFT");
    const nft = await NFT.deploy("ipfs://test/");

    await nft.mint(1, { value: ethers.utils.parseEther("0.01") });
    expect(await nft.balanceOf(owner.address)).to.equal(1);
    expect(await nft.ownerOf(1)).to.equal(owner.address);
  });
});
