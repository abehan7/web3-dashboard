import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "../styles/AutoHeightImage.css";

import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl={process.env.NEXT_PUBLIC_DAPP_URL}
      appId={process.env.NEXT_PUBLIC_APP_ID}
    >
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
