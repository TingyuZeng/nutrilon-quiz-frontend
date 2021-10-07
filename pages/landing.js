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
      {!loaded && <LoaderDrop />}

      {loaded && !synced && (
        <div>
          <div>player not found</div>
        </div>
      )}

      {loaded && synced && !player.avatar && <AvatarScreen />}

      {loaded && synced && player.avatar && <LandingScreen />}

      <Bg />
    </>
  );
};

export default Landing;
