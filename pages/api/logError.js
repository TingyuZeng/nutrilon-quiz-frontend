import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send({ message: "invalid method" });
  }

  let { hashid, error, message, location } = req.body;
  if (!error) {
    res.status(400).send({ message: "insufficient information" });
  }
  error = JSON.stringify(error);

  // The error is not relevant to a player
  if (hashid === null) {
    axios
      .post(`${process.env.BACKEND}/errors`, {
        error,
        message,
        location,
      })
      .then((response) => {
        console.log("succeed logging the error");
        res.status(200).json({ message: "succeed logging the error" });
      })
      .catch((err) => {
        console.log("failed to log the error");
        console.log(err);
        res.status(500).send({
          message: "failed to log the error",
        });
      });
  }

  // Get the player id if possible
  else {
    axios
      .get(`${process.env.BACKEND}/players/getid/${hashid}`)
      .then((response) => {
        const player = response.data;
        console.log(`The player id is ${player}`);
        axios
          .post(`${process.env.BACKEND}/errors`, {
            player,
            error,
            message,
            location,
          })
          .then((response) => {
            console.log("succeed logging the error");
            res.status(200).json({ message: "succeed logging the error" });
          })
          .catch((err) => {
            console.log("failed to log the error");

            res.status(500).send({
              message: "failed to log the error",
            });
          });
      })
      .catch((err) => {
        console.log("failed at getting the player id");
        // In case the player id cannot be retrieved
        // Logging the error as player = null
        axios
          .post(`${process.env.BACKEND}/errors`, {
            player: null,
            error,
            message,
            location,
          })
          .then((response) => {
            console.log("succeed logging the error");
            res.status(200).json({ message: "succeed logging the error" });
          })
          .catch((err) => {
            console.log("failed to log the error");
            res.status(500).send({
              message: "failed to log the error",
            });
          });
      });
  }
}
