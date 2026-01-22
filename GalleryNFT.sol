// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract GalleryNFT is ERC721Enumerable, Ownable {
    using Strings for uint256;

    uint256 public constant MAX_SUPPLY = 1000;
    uint256 public constant MINT_PRICE = 0.01 ether;
    string public baseTokenURI;

    constructor(string memory _baseURI) ERC721("ArtGallery", "ART") {
        baseTokenURI = _baseURI;
    }

    function mint(uint256 _quantity) public payable {
        uint256 supply = totalSupply();
        require(supply + _quantity <= MAX_SUPPLY, "Max supply exceeded");
        require(msg.value >= MINT_PRICE * _quantity, "Insufficient funds");

        for (uint256 i = 0; i < _quantity; i++) {
            _safeMint(msg.sender, supply + i + 1);
        }
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseTokenURI = _newBaseURI;
    }

    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}
