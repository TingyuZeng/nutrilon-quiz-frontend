//https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code

import axios from "axios";
import hashCode from "../../lib/hashCode";

export default function handler(req, res) {
  // Check if the user exists in the database
  if (req.method === "GET") {
    const { code, playerCode } = req.query;

    // query backend by playerCode
    if (playerCode) {
      axios
        .get(`${process.env.BACKEND}/players/${playerCode}`)
        .then((response) => {
          console.log("Got player info from the database");
          res.status(200).json(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // query by code via WeChat API
    else if (code) {
      axios
        .get(
          `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${process.env.APPID}&secret=${process.env.APPSECRET}&code=${code}&grant_type=authorization_code`
        )
        .then((response) => {
          const { openid } = response.data;
          console.log(`openid = ${openid}`);

          // Todo: error handling, returned data contains no WeChat openid
          if (!openid) {
            console.log("returned data contains no WeChat openid");
          }

          // Query db
          axios
            .get(`${process.env.BACKEND}/players?openid=${openid}`)
            .then((response) => {
              console.log("Getting data from the backend");
              console.log(response.data);
              // TODO: if cannot find the player in the database
              if (Array.isArray(response.data) && response.data.length !== 1) {
                res.status(204).json({ message: "player not found" });
              } else {
                res.status(200).json(response.data[0]);
              }
            })
            // TODO: error when querying the db
            .catch((error) => {
              console.log("Cannot access the Game DB");
            });
        })
        // Todo: error when requesting data from WeChat
        .catch((error) => {
          console.log("Cannot access WeChat API");
        });
    }
  }

  // Create a new user
  else {
    const code = req.body.code;

    axios
      .get(
        `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${process.env.APPID}&secret=${process.env.APPSECRET}&code=${code}&grant_type=authorization_code`
      )
      .then((response) => {
        const { access_token, openid } = response.data;
        console.log(`openid = ${openid}`);

        // Todo: error handling, returned data contains no WeChat openid
        if (!openid || !access_token) {
          res.status(400).json({
            error: "openid or token not found",
            message: "Please try again.",
          });
        }

        // Query WeChat API to get userinfo
        axios
          .get(
            `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`
          )
          .then((response) => {
            console.log("Getting user data from WeChat API");
            console.log(response.data);
            const { nickname, headimgurl } = response.data;

            // Generate hashid
            const hashid = openid
              .substr(-5)
              .concat(hashCode(openid).toString());
            console.log(hashid);

            // Double check if this player exists
            axios
              .get(`${process.env.BACKEND}/players?openid=${openid}`)
              .then((response) => {
                // If this player exists, send back the info rather than creating
                if (response.data.length !== 0) {
                  res.status(200).json(response.data[0]);
                }
                // Create player entry in database
                else {
                  axios
                    .post(`${process.env.BACKEND}/players`, {
                      openid,
                      hashid,
                      nickname,
                      headimgurl,
                    })
                    .then((response) => {
                      res.status(200).json(response.data);
                    })
                    .catch((error) => {
                      console.log("Cannot create a user on the database");
                    });
                }
              })
              .catch((error) => {
                console.log("Cannot access the backend");
              });
          })
          // TODO: error when retrieving userinfo from WeChat
          .catch((error) => {
            console.log(
              "Cannot access WeChat API with the given token and openid"
            );
          });
      })
      // Todo: error when requesting data from WeChat
      .catch((error) => {
        console.log("Cannot access WeChat API");
      });
  }
}
