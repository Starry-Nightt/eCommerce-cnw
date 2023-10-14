import { App } from "antd";
import "../styles/globals.css";
import Providers from "@/redux/proviers";

function MyApp({ Component, pageProps }) {
  return (
    <App>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </App>
  );
}

export default MyApp;
