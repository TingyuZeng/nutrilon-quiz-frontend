import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../store/store";
import logError from "../lib/logError";

export default function Home({ APPID, LOGINURL }) {
  const router = useRouter();
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the user exists on his phone
    const playerCode = localStorage.getItem("NUTRILON_PLAYER");
    if (playerCode) {
      axios
        .get("/api/getPlayer", { params: { playerCode } })
        .then((response) => {
          dispatch(playerActions.sync(response.data));
          console.log("Received player info.");
          router.push("/landing");
        })
        .catch((error) => {
          console.log(error);
          logError({
            error,
            message: "Failed at getting player info by hashid",
          });
        });
    }

    // Getting userinfo from WeChat (scope: base)
    else {
      console.log("getting open information from WeChat...");
      window.location.assign(
        `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${LOGINURL}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
      );
    }
  }, []);

  return (
    <>
      <div>Loading...</div>
      <div>Note: just show the loader here.</div>
    </>
  );
}

export async function getStaticProps() {
  const APPID = process.env.APPID;
  const LOGINURL = process.env.LOGINURL;
  return {
    props: {
      APPID,
      LOGINURL,
    },
  };
}
