import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classes from "../styles/Home.module.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../store/playerSlice";
import logError from "../lib/logError";
import Loader from "../component/ui/Loader/Loader";

export default function Home({ APPID, LANDINGURL }) {
  const router = useRouter();
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the user exists on his phone
    const hashid = localStorage.getItem("NUTRILON_PLAYER");
    if (hashid) {
      axios
        .get("/api/getPlayer", { params: { hashid } })
        .then((response) => {
          console.log(response.data);
          dispatch(playerActions.replacePlayerInfo(response.data));
          console.log("Received player info.");
          router.push("/landing");
        })
        .catch((error) => {
          console.error(error);
          // If the hashid is invalid
          if (error.response.status === 404) {
            dispatch(playerActions.logout());
            router.reload();
          } else {
            console.log(error);
            logError({
              error,
              message: "Failed at getting player info by hashid",
            });
          }
        });
    }

    // Getting userinfo from WeChat (scope: userinfo)
    else {
      console.log("getting open information from WeChat...");
      window.location.assign(
        `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${LANDINGURL}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
      );
    }
  }, []);

  return (
    <div className={classes.bg}>
      <Loader />
    </div>
  );
}

export async function getStaticProps() {
  const APPID = process.env.APPID;
  const LANDINGURL = process.env.LANDINGURL;
  return {
    props: {
      APPID,
      LANDINGURL,
    },
  };
}
