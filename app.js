// Replace with your deployed contract address
const contractAddress = "0xYOUR_CONTRACT_ADDRESS_HERE";

// Minimal ABI for ERC721Enumerable + Minting
const contractABI = [
    "function mint(uint256 _quantity) public payable",
    "function walletOfOwner(address _owner) public view returns (uint256[])", // Custom helper or use standard enumerable
    "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
    "function balanceOf(address owner) view returns (uint256)",
    "function tokenURI(uint256 tokenId) view returns (string)"
];

let provider, signer, contract;

document.getElementById('connectBtn').addEventListener('click', async () => {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        
        const address = await signer.getAddress();
        document.getElementById('connectBtn').innerText = address.slice(0, 6) + "...";
        loadGallery(address);
    } else {
        alert("Install MetaMask");
    }
});

document.getElementById('mintBtn').addEventListener('click', async () => {
    try {
        const tx = await contract.mint(1, { value: ethers.utils.parseEther("0.01") });
        document.getElementById('status').innerText = "Minting...";
        await tx.wait();
        document.getElementById('status').innerText = "Minted! Refresh to see.";
    } catch (err) {
        console.error(err);
        alert("Mint failed");
    }
});

async function loadGallery(address) {
    const grid = document.getElementById('galleryGrid');
    grid.innerHTML = "Loading...";
    
    try {
        const balance = await contract.balanceOf(address);
        grid.innerHTML = ""; // Clear loader

        if (balance.toNumber() === 0) {
            grid.innerHTML = "<p>No NFTs found.</p>";
            return;
        }

        // Fetch each token ID owned by user
        for (let i = 0; i < balance; i++) {
            const tokenId = await contract.tokenOfOwnerByIndex(address, i);
            const uri = await contract.tokenURI(tokenId);
            
            // For demo, we create a card. In production, fetch the JSON from URI first.
            const card = document.createElement('div');
            card.className = 'nft-card';
            card.innerHTML = `
                <h3>NFT #${tokenId}</h3>
                <p>Metadata: ${uri}</p>
            `;
            grid.appendChild(card);
        }
    } catch (err) {
        console.error("Gallery Error:", err);
    }
}
