import { AnimatePresence } from "framer-motion";
import { Provider } from "react-redux";
import WeChatAuth from "../component/Auth/WeChatAuth";
import ClientOnlyPortal from "../component/ui/ClientOnlyPortal/ClientOnlyPortal";
import NotificationModal from "../component/Notification/NotificationModal";
import store from "../store/store";
import "../styles/globals.scss";
import Script from "next/script";
import Head from "next/head";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    (function (d) {
      var config = {
          kitId: "mkr5szk",
          scriptTimeout: 3000,
          async: true,
        },
        h = d.documentElement,
        t = setTimeout(function () {
          h.className =
            h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";
        }, config.scriptTimeout),
        tk = d.createElement("script"),
        f = false,
        s = d.getElementById("adobe-font"),
        a;
      h.className += " wf-loading";
      tk.src = "https://use.typekit.net/" + config.kitId + ".js";
      tk.async = true;
      tk.onload = tk.onreadystatechange = function () {
        a = this.readyState;
        if (f || (a && a != "complete" && a != "loaded")) return;
        f = true;
        clearTimeout(t);
        try {
          Typekit.load(config);
        } catch (e) {}
      };
      s.parentNode.insertBefore(tk, s);
    })(document);
  }, []);

  return (
    <>
      <Provider store={store}>
        <WeChatAuth>
          <ClientOnlyPortal selector="[data-notification]">
            <AnimatePresence>
              <NotificationModal />
            </AnimatePresence>
          </ClientOnlyPortal>

          <Component {...pageProps} />
        </WeChatAuth>
      </Provider>
    </>
  );
}

export default MyApp;
