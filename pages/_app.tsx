import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';

const defaultProvider = jsonRpcProvider({
  rpc: (chain) => {
    if (chain.id === 80001) {
      return { http: 'https://rpc.valist.io/mumbai' };
    } else {
      return { http: 'https://rpc.valist.io/polygon' };
    }
  },
});

const { chains, provider } = configureChains(
  [chain.polygon, chain.polygonMumbai],
  [defaultProvider],
);

const { connectors } = getDefaultWallets({ 
  appName: 'Valist', 
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp
