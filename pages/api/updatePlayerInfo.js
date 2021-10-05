import axios from "axios";
import { errorHandler } from "../../lib/api/error-handler";
import { initialState as playerState } from "../../store/playerSlice";

export default function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(400).json({ message: "Invalid method" });
  }

  // hashid must be included
  // it should be stored in localStorage
  const { hashid, id, update } = req.body;

  if (!hashid) return res.status(400).json({ message: "Hashid not found" });

  // Cannot update player id
  if ("id" in update)
    return res.status(400).json({ message: "Cannot change id" });

  // Verify the other update items
  const updateKeys = Object.keys(update);
  const validKeys = Object.keys(playerState);
  const mixedSet = new Set([...updateKeys, ...validKeys]);
  const isValid = mixedSet.size === validKeys.length;
  if (!isValid)
    return res.status(400).json({ message: "Invalid update request" });

  (async () => {
    try {
      // Verify the player
      // Get the id from hashid
      const idRes = await axios.get(
        `${process.env.BACKEND}/players/getid/${hashid}`
      );
      const validId = idRes.data;

      // Verify the id
      const isValidPlayer = validId === id;

      // If the player info is not correct, abort the update
      if (!isValidPlayer) throw "Invalid user";

      // Update the valid player's info
      const response = await axios.put(
        `${process.env.BACKEND}/players/${validId}`,
        update
      );

      // Success
      if (response.data) return res.status(200).json(response.data);
      // Fail
      else throw "Connection failed";
    } catch (error) {
      errorHandler(error, res);
    }
  })();
}
