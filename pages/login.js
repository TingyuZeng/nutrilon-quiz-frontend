import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    const queryString = window.location.search;
    const queryObject = new URLSearchParams(queryString);
    const code = queryObject.get("code");

    if (!code) router.push("/");

    const getUser = async () => {
      axios
        .get("/api/code", { params: { code } })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    };

    getUser();
  }, []);

  return <div>login</div>;
};

export default Login;
