import { getPlaiceholder } from "plaiceholder";
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

const Landing = (props) => {
  const { loaderProps, bgProps } = props;
  const [loaded, setLoaded] = useState(false);
  const [synced, setSynced] = useState(false);
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
        logError({ error, message: "Cannot get userinfo from WeChat" });
        router.push("/");
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return (
    <>
      {!loaded && <LoaderDrop loaderProps={loaderProps} />}

      {loaded && !synced && (
        <div>
          <div>player not found</div>
        </div>
      )}

      {loaded && synced && !player.avatar && <AvatarScreen />}

      {loaded && synced && player.avatar && <LandingScreen />}

      <Bg bgProps={bgProps} />
    </>
  );
};

export default Landing;

export const getStaticProps = async () => {
  const { base64: dropletBase64, img: dropletImg } = await getPlaiceholder(
    "https://res.cloudinary.com/npc2021/image/upload/v1631799581/asset_droplet_97fae8690e.png"
  );

  const { base64: bgBase64, img: bgImg } = await getPlaiceholder(
    "https://res.cloudinary.com/npc2021/image/upload/v1631793369/bg_landing_90a0720ec7.png"
  );

  return {
    props: {
      loaderProps: {
        ...dropletImg,
        blurDataURL: dropletBase64,
      },
      bgProps: {
        ...bgImg,
        blurDataURL: bgBase64,
      },
    },
  };
};
