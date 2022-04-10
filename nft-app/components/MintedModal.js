import { NFT_CONTRACT_ADDRESS } from "../constants"
import { useEffect } from "react";
export default function MintedModal(props) {
    let nftId = props.description;
    let openseaUrl = "https://testnets.opensea.io/assets/" + NFT_CONTRACT_ADDRESS + "/" + nftId;
    

    return (
        <div>
            <div>
                {/* Button trigger modal */}
                <button type="button" className="btn btn-primary" id="mintedModalBtn" style={{"display": "none"}} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Launch modal
                </button>
                {/* Modal */}
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title text-dark" id="staticBackdropLabel">Congratulations!</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => props.close()} />
                        </div>
                        <div className="modal-body text-dark">
                        <p>Your <b><i>Faith Arts #{props.description}</i></b> just minted!</p>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => props.close()}>Close</button>
                        <button type="button" className="btn btn-primary">
                            <a href={openseaUrl} target="_blank" rel="noreferrer" className="text-decoration-none text-light">View on opensea</a> 
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>

    )
}