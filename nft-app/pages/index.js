import Head from 'next/head'
import ProductList from '../components/ProductList'
import products from '../utils/products'
import Link from "next/link";
import { useAppContext } from '../context/state';
import { NFT_CONTRACT_ADDRESS, abi } from '../constants'
import { useEffect } from 'react';
import { Contract } from 'ethers';
import { useState } from 'react';
export default function Home() {
  let { tokenIds, setTokenIds, library, connected } = useAppContext();
  const [_document, set_document] = useState(null)
  
  const getTokenIdsMinted = async () => {
    try {
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, library);
      // call the tokenIds from the contract
      const _tokenIds = await nftContract.tokenIds();
      //_tokenIds is a `Big Number`. We need to convert the Big Number to a string
      setTokenIds(_tokenIds.toString());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (library) {
       getTokenIdsMinted()
    }
  }, [library, tokenIds])
  

  useEffect(() => {
      set_document(document)
  }, [])

  const secondaryConnect = () => {
    _document.getElementById("connectBtn").click()
  }

  return (
    <div>
      <Head>
        <title>Faith Arts</title>
        <meta name="description" content="Whitelist-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main">
        <div className='main-left'>
          <h1 className="title">20 Unique Faith Artworks with over 10 hand-drawn art!</h1>
          <div className="description">
            Its an NFT collection for people that love artworks.
          </div>
          <div className="description">
            {library ? tokenIds: "?"}/20 have been minted
          </div>
          <div>
  
            {connected ?
                      <Link href="#mint-section">
                        <button className='mint' href="#mint-section">Explore</button>
                      </Link> 
                              :
                              <li className="nav-item heading-connect" style={{"cursor":"pointer"}} onClick={secondaryConnect}>
                              <a className="nav-link button contact" style={{"padding-left":"20px","padding-right":"20px","color":"white"}}>Connect wallet</a>
                            </li>
            }
            
          </div>
        </div>

        <div className='main-right'>
          <img className="image" alt='Faith Artworks' src="./faithArts/image0.jpg" />
        </div>
      </div>

    <div className='text-center pt-5' id='mint-section'>
      <p className='sub-head-title mt-5'>Get 1 of 1 of Faith Artworks</p>
    </div>

      <div className='row m-0'>
        <ProductList products={products[0]} />
        <ProductList products={products[1]} />
        <ProductList products={products[2]} />
        <ProductList products={products[3]} />
      </div>
    </div>
  )
}
