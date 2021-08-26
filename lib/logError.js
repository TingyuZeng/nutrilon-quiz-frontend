import axios from "axios";

export default function logError({
  error,
  location,
  message = "",
  hashid = null,
}) {
  if (typeof window !== "undefined") {
    location = window.location.pathname;
    hashid = localStorage.getItem("NUTRILON_PLAYER") || null;

    console.log(`location = ${location}`);
    console.log(`hashid = ${hashid}`);
  }

  axios
    .post("/api/logError", {
      hashid,
      error,
      location,
      message,
    })
    .then((response) => console.log(`Succeed in logging error.`))
    .catch((error) => console.log(error));
}
