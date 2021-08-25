import axios from "axios";

export default function handler(req, res) {
  if (req.method !== "PUT") {
    res.status(400).json({
      error: "request rejected",
      message: "Invalid request method chosen.",
    });
  }

  // openid must be included
  const { openid } = req.body;
  if (!openid) {
    res.status(400).json({
      error: "openid not found",
      message: "Please try again.",
    });
  }

  // Verify the body
  const bodyKeys = Object.keys(req.body);
  const validKeys = [
    "openid",
    "username",
    "avatar",
    "headimgurl",
    "shopurl",
    "score1",
    "score2",
    "score3",
    "score4",
    "scoreTotal",
    "currentLevel",
    "life",
    "lastCertificateDate",
    "certificates",
  ];
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
    .put(`${process.env.BACKEND}/players?openid=${openid}`, { ...req.body })
    .then((response) => res.status(200).json({ ...response }))
    .catch((error) => {
      console.log(error);
      res.status(500).json({});
    });
}
