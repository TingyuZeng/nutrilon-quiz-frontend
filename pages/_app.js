import { Provider } from "react-redux";
import WeChatAuth from "../component/Auth/WeChatAuth";
import store from "../store/store";
import "../styles/globals.scss";
import "../styles/normalize.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <WeChatAuth>
        <Component {...pageProps} />
      </WeChatAuth>
    </Provider>
  );
}

export default MyApp;
