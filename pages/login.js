import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Login = (props) => {
  const router = useRouter();
  const [player, setPlayer] = useState({});

  const newPlayerHandler = () => {
    const { APPID, REGISTERURL } = props;
    window.location.assign(
      `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${REGISTERURL}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
    );
  };
  const existingPlayerHandler = () => {};

  useEffect(() => {
    const queryString = window.location.search;
    const queryObject = new URLSearchParams(queryString);
    const code = queryObject.get("code");

    if (!code) router.push("/");

    const getUser = async () => {
      axios
        .get("/api/getPlayer", { params: { code } })
        // TODO: Store player data in Redux
        .then((res) => {
          if (res.status === 204) {
            console.log("response status 204");
            setPlayer({ exist: "not found" });
          } else {
            console.log("response status 200");
            setPlayer(res.data);
          }
        })
        .catch((err) => console.log(err));
    };

    getUser();
  }, []);

  return (
    <>
      <div style={{ marginBottom: "20px", color: "blue" }}>
        <div>LOGIN</div>
        <div>showing loader first, until setloaded = true</div>
        <div>
          Here we provider two buttons: 1 - check the agreement; 2 - continue to
          play the game
        </div>
      </div>

      {player.exist && (
        <div>
          <div>player not found</div>
          <button onClick={newPlayerHandler}>continue</button>
        </div>
      )}
      {player.username && (
        <div>
          <div>username: {player.username}</div>
          <button onClick={existingPlayerHandler}>continue</button>
        </div>
      )}
    </>
  );
};

export default Login;

export async function getStaticProps() {
  const APPID = process.env.APPID;
  const REGISTERURL = process.env.REGISTERURL;
  return {
    props: {
      APPID,
      REGISTERURL,
    },
  };
}
