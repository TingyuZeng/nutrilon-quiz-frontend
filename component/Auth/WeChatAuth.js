import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const WeChatAuth = ({ children }) => {
  const router = useRouter();
  //   const player = useSelector((state) => state.player);
  useEffect(() => {
    if (!localStorage.getItem("NUTRILON_PLAYER") && router.pathname !== "/test")
      window.location.assign(
        `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${LANDINGURL}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
      );
  }, []);
  return <>{children}</>;
};

export default WeChatAuth;
