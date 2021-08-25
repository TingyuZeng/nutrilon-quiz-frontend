import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ message: "invalid method" });
  }

  const { hashid, error, message, location } = req.body;
  if (!error || !location) {
    res.status(400).json({ message: "insufficient information" });
  }

  axios
    .get(`${process.env.BACKEND}/players/getid/${hashid}`)
    .then((response) => {
      const player = response.data;
      axios
        .post(`${process.env.BACKEND}/errors`, {
          player,
          error,
          message,
          location,
        })
        .then((response) => {
          console.log("succeed logging the error");
          console.log(response.data);
        })
        .catch((error) => {
          console.log("failed to log the error");
          console.log(error);
        });
    })
    .catch((error) => {
      console.log("failed at getting the player id");
      console.log(error);
    });
}
