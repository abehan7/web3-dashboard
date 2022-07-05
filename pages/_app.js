import { MoralisProvider } from "react-moralis";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "../styles/AutoHeightImage.css";

function MyApp({ Component, pageProps }) {
  // console.log(ChainId);
  return (
    <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
      <MoralisProvider
        serverUrl={process.env.NEXT_PUBLIC_DAPP_URL}
        appId={process.env.NEXT_PUBLIC_APP_ID}
      >
        <Component {...pageProps} />
      </MoralisProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
