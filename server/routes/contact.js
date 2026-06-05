const express = require("express");
const store = require("../store");

const router = express.Router();

router.post("/", (req, res) => {
  const { name, email, message, partyId } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ ok: false, message: "Name, email, and message are required." });
  }

  if (partyId && !store.getPartyById(partyId)) {
    return res.status(404).json({ ok: false, message: "Event not found." });
  }

  store.createContactMessage({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    party_id: partyId || null,
    message: message.trim(),
  });

  res.status(201).json({ ok: true, message: "Message sent to organizers." });
});

module.exports = router;
