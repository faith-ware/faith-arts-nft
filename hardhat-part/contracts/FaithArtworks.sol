// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FaithArtworks is ERC721Enumerable, Ownable {
    string _baseTokenURI;

    uint256[] public mintedIds;

    // price of one artwork
    uint256 public _price = 0.00031 ether;

    //max number of Artworks
    uint256 public maxTokenIds = 20;

    // total number of tokenIds minted
    uint256 public tokenIds;

    // ERC721 constructor takes in a `name` and a `symbol` to the token collection.
    constructor (string memory baseURI) ERC721("Faith Artworks", "FA") {
        _baseTokenURI = baseURI;
    }

    // mint allows an user to mint 1 NFT per transaction.
    function mint(uint _id) public payable {
        require(_id != 0);
        require(_id <= 20);
        require(tokenIds < maxTokenIds, "Exceeded maximum Faith Artworks supply");
        require(msg.value >= _price, "Ether sent is not correct");
        tokenIds += 1;
        mintedIds.push(_id);
        _safeMint(msg.sender, _id);
    }

    //_baseURI overides the Openzeppelin's ERC721 implementation which by default returned an empty string for the baseURI

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function getArrp() public view returns(uint256[] memory){
        return mintedIds;
     }

    // withdraw sends all the ether in the contract to the owner
    function withdraw() public onlyOwner  {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) =  _owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

     // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}