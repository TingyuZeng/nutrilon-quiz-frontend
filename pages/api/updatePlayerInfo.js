import axios from "axios";
import { initialState as playerState } from "../../store/playerSlice";

export default function handler(req, res) {
  if (req.method !== "PUT") {
    res.status(400).send("Invalid request method.");
  }

  // hashid must be included
  // it should be stored in localStorage
  const { hashid, current, update } = req.body;

  if (!hashid) {
    res.status(400).send("Hashid not found");
  }

  // Cannot update player id
  if ("id" in update) res.status(400).send("Cannot change id");
  // Verify the other update items
  const updateKeys = Object.keys(update);
  const validKeys = Object.keys(playerState);
  const mixedSet = new Set([...updateKeys, ...validKeys]);
  const isValid = mixedSet.size === validKeys.length;
  if (!isValid) res.status(400).send("Invalid update");

  (async () => {
    try {
      // Verify the player
      // Get the id from hashid
      const idRes = await axios.get(
        `${process.env.BACKEND}/players/getid/${hashid}`
      );
      const validId = idRes.data;

      // Verify the id
      const isValidPlayer = validId === current.id;

      // If the player info is not correct, abort the update
      if (!isValidPlayer) res.status(400).send("INVALID PLAYER");

      // Update the valid player's info
      const response = await axios.put(
        `${process.env.BACKEND}/players/${validId}`,
        update
      );

      // Success
      if (response.data) res.status(200).json(response.data);
      // Fail
      res.status(500).send("Update failed");
    } catch (error) {
      res.status(500).send(error);
    }
  })();
}
