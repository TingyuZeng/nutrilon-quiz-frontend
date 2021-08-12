import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Home({ APPID, REDIRECTURL }) {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("happy");
  };

  useEffect(() => {
    const { code } = router.query;
    console.log(code);
    if (code) setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded === true) return;
    console.log("getting info from WeChat...");
    console.log(APPID, REDIRECTURL);
    window.location.assign(
      `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${REDIRECTURL}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
    );
    setLoaded(true);
  }, []);

  return (
    <form onSubmit={submitHandler}>
      <button>submit</button>
    </form>
  );
}

export async function getStaticProps() {
  const APPID = process.env.APPID;
  const REDIRECTURL = process.env.REDIRECTURL;
  return {
    props: {
      APPID,
      REDIRECTURL,
    },
  };
}
