import { getPlaiceholder } from "plaiceholder";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../store/store";
import logError from "../lib/logError";
import Img from "../component/ui/Image/Img";
import Bg from "../component/ui/Background/Bg";
import LoaderDrop from "../component/ui/Loader/LoaderDrop";
import AvatarScene from "../component/Avatar/AvatarScene";
import Button from "../component/ui/Button/Button";
import Header from "../component/ui/Header/Header";

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
      <Bg bgProps={bgProps} />

      {!loaded && <LoaderDrop loaderProps={loaderProps} />}

      {loaded && !synced && (
        <div>
          <div>player not found</div>
        </div>
      )}

      {loaded && synced && !player.avatar && <AvatarScene />}

      {loaded && synced && player.avatar && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "8% 0",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Header>The game is under construction</Header>
          <Img src={player.headimgurl} height={200} width={200} />
          <Button>Thank you, {player.nickname}!</Button>
        </div>
      )}
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
