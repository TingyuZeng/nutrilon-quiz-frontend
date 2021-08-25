import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home({ APPID, LOGINURL }) {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("happy");
  };

  useEffect(() => {
    const queryString = window.location.search;
    const queryObject = new URLSearchParams(queryString);
    const registered = queryObject.get("registered");

    if (registered === "false") {
      console.log("This player is not registered!");
      return;
    }

    console.log("getting open information from WeChat...");
    window.location.assign(
      `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${LOGINURL}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
    );
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
