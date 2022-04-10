const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
const { METADATA_URL } = require("../constants");

async function main() {
    const metadataUrl = METADATA_URL;

    const faithArtworksContract = await ethers.getContractFactory("FaithArtworks");

    const deployedFaithArtworksContract = await faithArtworksContract.deploy(
        metadataUrl
    );

    console.log(
        "Faith Artworks Contract Address:",
        deployedFaithArtworksContract.address
    );
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
})