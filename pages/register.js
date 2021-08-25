import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const [player, setPlayer] = useState({});

  useEffect(() => {
    const queryString = window.location.search;
    const queryObject = new URLSearchParams(queryString);
    const code = queryObject.get("code");

    if (!code) router.push("/");

    const createUser = async () => {
      axios
        .post("/api/getPlayer", { code })
        .then((res) => {
          setPlayer(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };

    createUser();
  }, []);

  return (
    <>
      <div>REGISTER</div>
      {player.nickname && <div>username: {player.nickname}</div>}
    </>
  );
};

export default Login;
