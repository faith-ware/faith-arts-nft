import { useAppContext } from "../context/state";
import { abi, NFT_CONTRACT_ADDRESS } from "../constants";
import { Contract, utils } from "ethers";
import { useEffect, useState } from "react";
import MintedModal from "./MintedModal";

function ProductItem(props) {
    let {library, signer, connected, mintedNfts, setMintedNfts, tokenIds, setTokenIds} = useAppContext();
    let [ loading, setLoading ] = useState(false);
    let [showed, showModal ] = useState(false);
    const [docm, set_docm] = useState(null)

    useEffect(() => {
        set_docm(document);
    }, [])

    let mintButton = () => {
        if (connected) {
            if (mintedNfts) {
              if (mintedNfts.includes(props.id)) {
                  return <button className='ntf-mint nft-minted' onClick={() => mint(props.id)}>Minted</button>;
              } else if (loading) {
                return <button className='ntf-mint'>Minting..</button>;
              }
              else{
                  return <button className='ntf-mint' onClick={() => mint(props.id)}>Mint</button>;
              }
          }
        }
        
    }
    
    const close = () => {
        showModal(false);
    }

    const mint = async (params) => {
        try {
            const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);

            const tx = await nftContract.mint(params, {
                    value: utils.parseEther("0.00031")
            })
            setLoading(true);
            await tx.wait();
            setTokenIds(tokenIds + 1);
            setLoading(false);
            showModal(true);
            modalClick();
        } catch(err) {
            console.log(err);
        }
    }

  
    const modalClick = () => {
        if (showModal) {
            setTimeout(() => {
                docm.getElementById("mintedModalBtn").click(); 
            }, 100);
        }
    }

    return (
            <div className="category-card">
                <img src={props.image} alt="Faith Artworks" className="product-img" />
                <div className="d-flex justify-content-between mb-0 p-0" style={{"height":"25px", "color" : "gray"}}>
                    <small className="mt-1">Description</small>
                    <small className="mt-1">Price</small>
                </div>
                <div className="d-flex justify-content-between mb-0 p-0" style={{"height":"40px"}}>
                    <p className="card-bd mt-1">Faith Arts #{props.id}</p>
                    <p className="text-bold card-bd mt-1">
                    <i className="fab fa-ethereum"></i> 0.000005</p>
                </div>
                {mintButton()}
                {showed ?
                <MintedModal description={props.id} close={close} /> : null}
            </div>
    )
}

export default ProductItem;
