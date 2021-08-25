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
  }

  axios
    .post("/api/logError", {
      hashid,
      error,
      location,
      message,
    })
    .then()
    .catch((error) => console.log(error));
}
