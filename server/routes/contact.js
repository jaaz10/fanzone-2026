const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/", (req, res) => {
  const { name, email, message, partyId } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ ok: false, message: "Name, email, and message are required." });
  }

  if (partyId) {
    const party = db.prepare("SELECT id FROM viewing_parties WHERE id = ?").get(partyId);
    if (!party) {
      return res.status(404).json({ ok: false, message: "Event not found." });
    }
  }

  db.prepare("INSERT INTO contact_messages (name, email, party_id, message) VALUES (?, ?, ?, ?)").run(
    name.trim(),
    email.trim().toLowerCase(),
    partyId || null,
    message.trim()
  );

  res.status(201).json({ ok: true, message: "Message sent to organizers." });
});

module.exports = router;
