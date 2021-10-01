import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const WeChatAuth = ({ children }) => {
  const router = useRouter();
  const player = useSelector((state) => state.player);
  useEffect(() => {
    if (!player.id || !localStorage.getItem("NUTRILON_PLAYER"))
      router.push("/");
  }, []);
  return <>{children}</>;
};

export default WeChatAuth;
