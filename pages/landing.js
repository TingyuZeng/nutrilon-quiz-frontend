import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../store/store";
import logError from "../lib/logError";
import Img from "../component/ui/Image/Img";
import BgLanding from "../component/ui/Background/BgLanding";

const Landing = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [synced, setSynced] = useState(false);
  const router = useRouter();
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();

  // For future reference - update player info
  const testHandler = () => {
    const hashid = localStorage.getItem("NUTRILON_PLAYER");
    axios
      .put("/api/updatePlayerInfo", {
        hashid,
        current: player,
        update: { nickname: "Tingyu" },
      })
      .then((res) => {
        dispatch(playerActions.sync(res.data));
        console.log(`player ${player.nickname} updated!`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      {!loaded && (
        <div style={{ marginBottom: "20px", color: "blue" }}>
          <div>LANDING - this is the start of the game</div>
          <div>showing loader first, until setloaded = true</div>
        </div>
      )}

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
            <button onClick={testHandler}>Change your name to Alimama</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Landing;
