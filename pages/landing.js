import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../store/playerSlice";

import logError from "../lib/logError";
import Bg from "../component/ui/Background/Bg";
import LoaderDrop from "../component/ui/Loader/LoaderDrop";
import AvatarScreen from "../component/Screens/Avatar/AvatarScreen";
import LandingScreen from "../component/Screens/Landing/LandingScreen";
import { uiActions } from "../store/uiSlice";

const Landing = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [synced, setSynced] = useState(false);
  const [isFirst, setIsFirst] = useState(false);
  const router = useRouter();
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();

  useEffect(() => {
    // If player info is present, just continue
    if (player.openid && localStorage.getItem("NUTRILON_PLAYER")) {
      setSynced(true);
      setLoaded(true);
      return;
    }

    // Otherwise, query player info
    const queryString = window.location.search;
    const queryObject = new URLSearchParams(queryString);
    const code = queryObject.get("code");

    if (!code) {
      router.push("/");
      return;
    }

    axios
      .post("/api/getPlayer", { code })
      // Store player data in Redux
      .then((res) => {
        console.log("response status 200");
        dispatch(playerActions.replacePlayerInfo(res.data));
        dispatch(playerActions.login(res.data.hashid));
        setSynced(true);
        console.log("player data synced");
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          uiActions.showNotification({
            text: "服务器开小差了，请再次尝试。",
            qrcode: true,
            handler: "goHome",
          })
        );
        logError({ error, message: "Cannot get userinfo from WeChat" });
        setTimeout(() => router.push("/"), 5000);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (player.avatar === null || ![0, 1, 2].includes(Number(player.avatar))) {
      dispatch(
        uiActions.showNotification({
          text: "Jump on a bike with Ice Bear and together go on a journey through the Netherlands. Let Ice Bear guide you to Nutrilon’s key locations and discover everything you need to know about the brand! On your way unlock exclusive prices and marketing materials and become a Brand Ambassador. For those of you who complete all levels a certificate is waiting for you!",
          handler: "close",
          bear: true,
          title: "欢迎启程",
        })
      );
      setIsFirst(true);
    } else {
      setIsFirst(false);
    }
  }, [player.avatar]);

  return (
    <>
      {!loaded && <LoaderDrop />}

      {loaded && !synced && (
        <div>
          <div>player not found</div>
        </div>
      )}

      {loaded && synced && isFirst && <AvatarScreen />}

      {loaded && synced && !isFirst && <LandingScreen />}

      <Bg />
    </>
  );
};

export default Landing;
