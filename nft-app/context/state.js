import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
    const [connected, setConnected] = useState(false);
    const [provider, setProvider] = useState();
    const [library, setLibrary] = useState();
    const [account, setAccount] = useState();
    const [network, setNetwork] = useState();
    const [signer, setSigner] = useState();
    const [mintedNfts, setMintedNfts] = useState();
    const [tokenIds, setTokenIds] = useState();

    let sharedState = {
        connected, setConnected,
        provider,setProvider, 
        library, setLibrary,
        account, setAccount,
        network, setNetwork,
        signer, setSigner,
        mintedNfts, setMintedNfts,
        tokenIds, setTokenIds
    }

    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext);
}