import { getPlaiceholder } from "plaiceholder";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../store/store";
import logError from "../lib/logError";
import Img from "../component/ui/Image/Img";
import BgLanding from "../component/ui/Background/BgLanding";
import LoaderDrop from "../component/ui/Loader/LoaderDrop";

const Landing = (props) => {
  const { loaderProps, bgProps } = props;
  const [loaded, setLoaded] = useState(false);
  const [synced, setSynced] = useState(false);
  const router = useRouter();
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();

  // For future reference - update player info
  const testHandler = (name) => {
    if (player.nickname !== "Alimama") {
      setLastNickname(player.nickname);
    }
    const hashid = localStorage.getItem("NUTRILON_PLAYER");
    axios
      .put("/api/updatePlayerInfo", {
        hashid,
        current: player,
        update: { nickname: name },
      })
      .then((res) => {
        dispatch(playerActions.sync(res.data));
        console.log(`player ${player.nickname} updated!`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // For fun
  const [lastNickname, setLastNickname] = useState("");

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
        dispatch(playerActions.sync(res.data));
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
      {!loaded && <LoaderDrop loaderProps={loaderProps} bgProps={bgProps} />}

      {loaded && !synced && (
        <div>
          <div>player not found</div>
        </div>
      )}
      {loaded && synced && (
        <div>
          <BgLanding />
          <div style={{ position: "absolute", bottom: "50px" }}>
            <div>nickname: {player.nickname}</div>
            <button onClick={testHandler.bind(null, "Alimama")}>
              Change your name to Alimama
            </button>
            <button onClick={testHandler.bind(null, lastNickname)}>
              Change your name back
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Landing;

export const getStaticProps = async () => {
  const { base64: dropletBase64, img: dropletImg } = await getPlaiceholder(
    "https://res.cloudinary.com/npc2021/image/upload/v1630414882/asset_droplet_97fae8690e.png"
  );

  const { base64: bgBase64, img: bgImg } = await getPlaiceholder(
    "https://res.cloudinary.com/npc2021/image/upload/v1630077352/bg_landing_90a0720ec7.png"
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
