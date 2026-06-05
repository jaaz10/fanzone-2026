const express = require("express");
const store = require("../store");
const { authRequired } = require("../middleware/auth");

const router = express.Router();

router.use(authRequired);

router.get("/", (req, res) => {
  const registrations = store.getRegistrationsForUser(req.user.id);
  res.json({ ok: true, registrations });
});

router.post("/", (req, res) => {
  const { partyId, guests, phone, notes } = req.body;

  if (!partyId || !guests || !phone?.trim()) {
    return res.status(400).json({ ok: false, message: "Event, guests, and phone are required." });
  }

  if (!store.getPartyById(partyId)) {
    return res.status(404).json({ ok: false, message: "Event not found." });
  }

  if (store.findRegistration(req.user.id, partyId)) {
    return res.status(409).json({ ok: false, message: "You are already registered for this event." });
  }

  const reg = store.createRegistration({
    user_id: req.user.id,
    party_id: partyId,
    guests,
    phone: phone.trim(),
    notes: notes?.trim() || "",
  });

  res.status(201).json({ ok: true, id: reg.id });
});

router.put("/:id", (req, res) => {
  const { guests, phone, notes } = req.body;

  if (!store.getRegistrationById(req.params.id, req.user.id)) {
    return res.status(404).json({ ok: false, message: "Registration not found." });
  }

  if (!guests || guests < 1 || guests > 4) {
    return res.status(400).json({ ok: false, message: "Guests must be between 1 and 4." });
  }

  if (!phone?.trim()) {
    return res.status(400).json({ ok: false, message: "Phone number is required." });
  }

  store.updateRegistration(req.params.id, req.user.id, {
    guests,
    phone: phone.trim(),
    notes: notes?.trim() || "",
  });

  res.json({ ok: true });
});

router.delete("/:id", (req, res) => {
  if (!store.deleteRegistration(req.params.id, req.user.id)) {
    return res.status(404).json({ ok: false, message: "Registration not found." });
  }

  res.json({ ok: true });
});

module.exports = router;
