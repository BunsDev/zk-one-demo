import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import { UseWalletProvider } from 'use-wallet'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <UseWalletProvider
          // 
          connectors={{
            injected: {
            chainId: [1, 4]
            },
            walletconnect: {
              chainId:[1,4],
              rpcUrl:
                "https://rinkeby.infura.io/v3/980077b1d0bc4258a30c5978eea1afc1",
            },
          }}
        >
    
      <Component {...pageProps} />
        </UseWalletProvider>

    </ChakraProvider>
  )
}

export default MyApp
