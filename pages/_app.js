import { AnimatePresence } from "framer-motion";
import { Provider } from "react-redux";
import WeChatAuth from "../component/Auth/WeChatAuth";
import ClientOnlyPortal from "../component/ui/ClientOnlyPortal/ClientOnlyPortal";
import NotificationModal from "../component/Notification/NotificationModal";
import store from "../store/store";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
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
  );
}

export default MyApp;
