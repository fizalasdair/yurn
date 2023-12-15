import React from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Head from "next/head";
import "../styles/globals.css";
import { AppProps } from "next/app";


// This is the chain your dApp will work on.
const activeChain = "base";

function MyApp({ Component, pageProps }: AppProps) {
 
  return (
    <ThirdwebProvider activeChain={{
      // === Required information for connecting to the network === \\
      chainId: 8453, // Chain ID of the network
      // Array of RPC URLs to use
      rpc: ["https://mainnet.base.org/"],

      // === Information for adding the network to your wallet (how it will appear for first time users) === \\
      // Information about the chains native currency (i.e. the currency that is used to pay for gas)
      nativeCurrency: {
        decimals: 18,
        name: "ETH",
        symbol: "ETH",
      },
      shortName: "Base", // Display value shown in the wallet UI
      slug: "Base", // Display value shown in the wallet UI
      testnet: false, // Boolean indicating whether the chain is a testnet or mainnet
      chain: "Base", // Name of the network
      name: "Base", // Name of the network
    }} clientId={"ccdd6e844260a885b0064ae59a32825f"}>
      <Head>
        <title>BASE DOGE</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Bringing the meme culture to base mainnet"
        />
        <meta
          name="keywords"
          content="Base Doge Mainnet"
        />
      </Head>
      <Component {...pageProps} />
  
    </ThirdwebProvider>
  );
}

export default MyApp;
