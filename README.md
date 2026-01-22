# NFT Minting & Gallery DApp

A standalone Web3 application that allows users to mint unique NFTs and immediately view them in a gallery. This project utilizes the `ERC721Enumerable` extension to enable "On-Chain Indexing," allowing the frontend to discover all tokens owned by a specific wallet directly from the smart contract.

## Features
- **ERC-721 Enumerable:** Efficiently tracks token ownership on-chain.
- **Minting Engine:** Public minting functionality with supply tracking.
- **Auto-Gallery:** Frontend automatically renders all NFTs owned by the user.
- **Metadata Support:** Compatible with IPFS JSON standards.

## Quick Start
1. **Install:** `npm install`
2. **Deploy:** `npx hardhat run deploy.js --network goerli`
3. **Configure:** Paste the new contract address into `app.js`.
4. **Run:** Open `index.html` in your browser.

## Tech Stack
- Solidity (OpenZeppelin)
- Hardhat
- Vanilla JavaScript (Ethers.js)
