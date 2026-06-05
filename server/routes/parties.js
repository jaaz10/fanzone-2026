const express = require("express");
const store = require("../store");

const router = express.Router();

router.get("/", (req, res) => {
  const parties = store.getParties(req.query.city);
  res.json({ ok: true, parties });
});

router.get("/cities", (_req, res) => {
  res.json({ ok: true, cities: store.getCities() });
});

router.get("/:id", (req, res) => {
  const party = store.getPartyById(req.params.id);

  if (!party) {
    return res.status(404).json({ ok: false, message: "Event not found." });
  }

  res.json({ ok: true, party });
});

module.exports = router;
