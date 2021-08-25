import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../store/store";

const Landing = () => {
  const router = useRouter();
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const testHandler = () => {
    axios.put("/updatePlayerInfo", { username: "happy" });
  };

  useEffect(() => {
    if (player.openid) return;
    const queryString = window.location.search;
    const queryObject = new URLSearchParams(queryString);
    const code = queryObject.get("code");

    if (!code) router.push("/");

    const createUser = async () => {
      axios
        .post("/api/getPlayer", { code })
        .then((res) => {
          dispatch(playerActions.sync(res.data));
          console.log("player data synced");
        })
        .catch((err) => console.log(err));
    };

    createUser();
  }, []);

  return (
    <>
      <div>Landing - this is the start of the game</div>
      {player.username && <div>username: {player.username}</div>}
      <button onClick={testHandler}>Change name test</button>
    </>
  );
};

export default Landing;
