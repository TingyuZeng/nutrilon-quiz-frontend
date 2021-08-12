//https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code

import axios from "axios";

export default function handler(req, res) {
  const { code } = req.query;

  // Get user token
  axios
    .get(
      `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${process.env.APPID}&secret=${process.env.APPSECRET}&code=${code}&grant_type=authorization_code`
    )
    .then((response) => {
      const { access_token, openid } = response.data;

      // Todo: error handling
      if (!access_token || !openid) {
        res.redirect("/");
      }

      // Get user info
      axios
        .get(
          `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`
        )
        .then((response) => {
          res.status(200).json(response.data);
        })
        // Todo: error handling
        .catch((error) => res.redirect("/"));
    })
    // Todo: error handling
    .catch((error) => res.redirect("/"));
}
