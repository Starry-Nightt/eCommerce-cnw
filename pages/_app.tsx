import { App, FloatButton } from "antd";
import "../styles/globals.css";
import Providers from "@/redux/providers";
import LayoutDefault from "@/layouts/default/layout-default";
import { useEffect } from "react";
import { store } from "@/redux/store";
import createLoadingInterceptor from "@/interceptors/loading.interceptor";
import { ArrowUpOutlined } from "@ant-design/icons";
import useToggle from "@/hooks/use-toggle";

function MyApp({ Component, pageProps }) {
  const [visible, toggle] = useToggle(false);

  useEffect(() => {
    createLoadingInterceptor(store);
  }, []);

  useEffect(() => {
    if (!window) return;

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    if (!window) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (window.scrollY >= 400) toggle(true);
    else toggle(false);
  };

  return (
    <App>
      <Providers>
        {Component.getLayout ? (
          Component.getLayout(<Component {...pageProps} />)
        ) : (
          <LayoutDefault>
            <Component {...pageProps} />
          </LayoutDefault>
        )}

        <FloatButton
          shape="square"
          type="primary"
          className={`${visible ? "visible" : "invisible"}`}
          style={{ right: 24 }}
          icon={<ArrowUpOutlined />}
          onClick={scrollToTop}
        />
      </Providers>
    </App>
  );
}

export default MyApp;
