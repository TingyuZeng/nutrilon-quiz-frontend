import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../store/store";
import logError from "../lib/logError";

const Landing = () => {
  const router = useRouter();
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const testHandler = () => {
    axios
      .put("/api/updatePlayerInfo", {
        id: player.id,
        nickname: "Tingyu",
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
      {player.nickname && <div>nickname: {player.nickname}</div>}
      <button onClick={testHandler}>Change name test</button>
    </>
  );
};

export default Landing;
