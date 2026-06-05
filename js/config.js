function getApiBase() {
  if (window.FANZONE_API) return window.FANZONE_API;

  const host = window.location.hostname;
  const port = window.location.port;

  if ((host === "localhost" || host === "127.0.0.1") && port === "3000") {
    return "/api";
  }

  if (host === "localhost" || host === "127.0.0.1") {
    return "http://localhost:3000/api";
  }

  if (host === "jaaz10.github.io") {
    return "https://fanzone-2026-api.onrender.com/api";
  }

  return "/api";
}
