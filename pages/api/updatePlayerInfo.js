import axios from "axios";
import { initialState as playerState } from "../../store/playerSlice";

export default function handler(req, res) {
  if (req.method !== "PUT") {
    res.status(400).json({
      error: "request rejected",
      message: "Invalid request method chosen.",
    });
  }

  // id must be included
  const { id, ...updateItems } = req.body;

  if (!id) {
    res.status(400).json({
      error: "player id not found",
      message: "Please try again.",
    });
  }

  // Verify the body
  const bodyKeys = Object.keys(req.body);
  const validKeys = Object.keys(playerState);
  const mixedSet = new Set([...bodyKeys, ...validKeys]);
  const isValid = mixedSet.size === validKeys.length;
  if (!isValid) {
    res.status(400).json({
      error: "invalid api",
      message: "Invalid request to the backend.",
    });
  }

  // Send request to backend
  axios
    .put(`${process.env.BACKEND}/players/${id}`, { ...updateItems })
    .then((response) => {
      console.log(`player ${id} updated.`);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log("failed at backend");
      console.log(error);
      res.status(500).json({});
    });
}
