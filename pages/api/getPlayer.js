//https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code

import axios from "axios";
import hashCode from "../../lib/hashCode";

export default function handler(req, res) {
  // Check if the user exists in the database
  if (req.method === "GET") {
    const { code, hashid } = req.query;

    // query backend by hashid
    if (hashid) {
      axios
        .get(`${process.env.BACKEND}/players/${hashid}`)
        .then((response) => {
          console.log("Got player info from the database");
          res.status(200).json(response.data);
        })
        .catch((error) => {
          // In case the hashid is invalid
          if (error.response.status === 404) {
            console.log("Error: invalid hashid.");
            res
              .status(404)
              .send({ error: "invalid hashid", message: "Please try again!" });
          }
          // Other errors
          console.log(error);
          res.status(500).send(error);
        });
    }
    // query by code via WeChat API (scope=base)
    else if (code) {
      axios
        .get(
          `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${process.env.APPID}&secret=${process.env.APPSECRET}&code=${code}&grant_type=authorization_code`
        )
        .then((response) => {
          const { openid } = response.data;
          console.log(`openid = ${openid}`);

          // error handling, returned data contains no WeChat openid
          if (!openid) {
            console.log("Error: returned data contains no WeChat openid");
            res.status(400).send();
          }

          // Query db
          axios
            .get(`${process.env.BACKEND}/players?openid=${openid}`)
            .then((response) => {
              console.log("Getting data from the backend");
              console.log(response.data);
              // TODO: if cannot find the player in the database
              if (Array.isArray(response.data) && response.data.length !== 1) {
                res.status(204).send({ message: "player not found" });
              } else {
                res.status(200).json(response.data[0]);
              }
            })
            // error when querying the db
            .catch((error) => {
              console.log("Error: cannot access the Game DB");
              res.status(500).send(error);
            });
        })
        // error when requesting data from WeChat
        .catch((error) => {
          console.log("Error: cannot access WeChat API (base)");
          res.status(500).send(error);
        });
    }
  }

  // Check via WeChat API(scope = userinfo)
  // if the user doesn't exist then create a new user
  else {
    const code = req.body.code;
    if (!code) {
      res.status(400).send({
        error: "code not found",
        message: "Please try again.",
      });
    }

    axios
      .get(
        `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${process.env.APPID}&secret=${process.env.APPSECRET}&code=${code}&grant_type=authorization_code`
      )
      .then((response) => {
        const { access_token, openid } = response.data;
        console.log(`openid = ${openid}`);

        // error handling, returned data contains no WeChat openid
        if (!openid || !access_token) {
          res.status(400).send({
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
                      console.log(
                        "Error: cannot create a user on the database"
                      );
                      res.status(500).send(error);
                    });
                }
              })
              .catch((error) => {
                console.log("Error: cannot access the backend");
                res.status(500).send(error);
              });
          })
          // error when retrieving userinfo from WeChat
          .catch((error) => {
            console.log(
              "Error: cannot access WeChat API with the given token and openid"
            );
            res.status(500).send(error);
          });
      })
      // error when requesting data from WeChat
      .catch((error) => {
        console.log("Error: cannot access WeChat API (userinfo)");
        res.status(500).send(error);
      });
  }
}
