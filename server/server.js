const path = require("path");
const express = require("express");
const cors = require("cors");

require("./db");

const authRoutes = require("./routes/auth");
const partiesRoutes = require("./routes/parties");
const registrationsRoutes = require("./routes/registrations");
const contactRoutes = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, "..");

const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:8000",
  "https://jaaz10.github.io",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "fanzone-2026-api" });
});

app.use("/api/auth", authRoutes);
app.use("/api/parties", partiesRoutes);
app.use("/api/registrations", registrationsRoutes);
app.use("/api/contact", contactRoutes);

app.use(express.static(ROOT));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  const file = path.join(ROOT, req.path === "/" ? "index.html" : req.path);
  res.sendFile(file, (err) => {
    if (err) res.status(404).send("Not found");
  });
});

app.listen(PORT, () => {
  console.log(`FanZone 2026 running at http://localhost:${PORT}`);
});
