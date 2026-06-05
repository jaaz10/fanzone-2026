const express = require("express");
const db = require("../db");
const { authRequired } = require("../middleware/auth");

const router = express.Router();

router.use(authRequired);

router.get("/", (req, res) => {
  const regs = db
    .prepare(
      `SELECT r.id, r.guests, r.phone, r.notes, r.created_at,
              p.id AS party_id, p.title AS party_title, p.city, p.date
       FROM registrations r
       JOIN viewing_parties p ON p.id = r.party_id
       WHERE r.user_id = ?
       ORDER BY p.date`
    )
    .all(req.user.id);

  res.json({ ok: true, registrations: regs });
});

router.post("/", (req, res) => {
  const { partyId, guests, phone, notes } = req.body;

  if (!partyId || !guests || !phone?.trim()) {
    return res.status(400).json({ ok: false, message: "Event, guests, and phone are required." });
  }

  const party = db.prepare("SELECT id FROM viewing_parties WHERE id = ?").get(partyId);
  if (!party) {
    return res.status(404).json({ ok: false, message: "Event not found." });
  }

  const existing = db
    .prepare("SELECT id FROM registrations WHERE user_id = ? AND party_id = ?")
    .get(req.user.id, partyId);

  if (existing) {
    return res.status(409).json({ ok: false, message: "You are already registered for this event." });
  }

  const result = db
    .prepare("INSERT INTO registrations (user_id, party_id, guests, phone, notes) VALUES (?, ?, ?, ?, ?)")
    .run(req.user.id, partyId, guests, phone.trim(), notes?.trim() || "");

  res.status(201).json({ ok: true, id: result.lastInsertRowid });
});

router.put("/:id", (req, res) => {
  const { guests, phone, notes } = req.body;
  const reg = db.prepare("SELECT * FROM registrations WHERE id = ? AND user_id = ?").get(req.params.id, req.user.id);

  if (!reg) {
    return res.status(404).json({ ok: false, message: "Registration not found." });
  }

  if (!guests || guests < 1 || guests > 4) {
    return res.status(400).json({ ok: false, message: "Guests must be between 1 and 4." });
  }

  if (!phone?.trim()) {
    return res.status(400).json({ ok: false, message: "Phone number is required." });
  }

  db.prepare("UPDATE registrations SET guests = ?, phone = ?, notes = ? WHERE id = ?").run(
    guests,
    phone.trim(),
    notes?.trim() || "",
    req.params.id
  );

  res.json({ ok: true });
});

router.delete("/:id", (req, res) => {
  const result = db
    .prepare("DELETE FROM registrations WHERE id = ? AND user_id = ?")
    .run(req.params.id, req.user.id);

  if (result.changes === 0) {
    return res.status(404).json({ ok: false, message: "Registration not found." });
  }

  res.json({ ok: true });
});

module.exports = router;
