const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  const { city } = req.query;

  let parties;
  if (city) {
    parties = db
      .prepare("SELECT * FROM viewing_parties WHERE city = ? ORDER BY date")
      .all(city);
  } else {
    parties = db.prepare("SELECT * FROM viewing_parties ORDER BY date").all();
  }

  res.json({ ok: true, parties });
});

router.get("/cities", (_req, res) => {
  const rows = db.prepare("SELECT DISTINCT city FROM viewing_parties ORDER BY city").all();
  res.json({ ok: true, cities: rows.map((r) => r.city) });
});

router.get("/:id", (req, res) => {
  const party = db.prepare("SELECT * FROM viewing_parties WHERE id = ?").get(req.params.id);

  if (!party) {
    return res.status(404).json({ ok: false, message: "Event not found." });
  }

  res.json({ ok: true, party });
});

module.exports = router;
