import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
    GlowWalletAdapter,
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,

} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { FC, ReactNode, useMemo, useState } from 'react';
import '@solana/wallet-adapter-react-ui/styles.css';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { DarkTheme, LightTheme } from "./themes";

const GlobalStyle = createGlobalStyle`
body {
  background: #222222;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
.logged {
  display: flex;
  flex-direction: column;
  align-self: center !important;
  text-align: center !important;
  align-items: center !important;
  justify-content: center;
  height: 100vh;
}
`

const App: FC = () => {
    const [theme, setTheme] = useState(DarkTheme);
    const changeTheme = () => {
        setTheme(theme === DarkTheme ? LightTheme : DarkTheme);
    };

    return (

        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Context>
                <Content />
            </Context>
        </ThemeProvider>
    );
};


export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
    const network = WalletAdapterNetwork.Mainnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new LedgerWalletAdapter(),
            new PhantomWalletAdapter(),
            new GlowWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolletExtensionWalletAdapter(),
            new SolletWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
        ],
        [network]
    );



    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const Content: FC = () => {
    const { publicKey } = useWallet();

    return (
        <div className={publicKey ? "unlogged" : "logged"}>


            {publicKey ? "" : <h1>Please log in to access the platform</h1>}
            <WalletMultiButton />
            {publicKey ? "" : ""}



        </div>
    );
};
