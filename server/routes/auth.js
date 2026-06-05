const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db");
const { signToken, authRequired } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name?.trim() || !email?.trim() || !password) {
    return res.status(400).json({ ok: false, message: "Name, email, and password are required." });
  }

  if (password.length < 4) {
    return res.status(400).json({ ok: false, message: "Password must be at least 4 characters." });
  }

  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email.trim().toLowerCase());
  if (existing) {
    return res.status(409).json({ ok: false, message: "An account with this email already exists." });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const result = db
    .prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)")
    .run(name.trim(), email.trim().toLowerCase(), passwordHash);

  const user = { id: result.lastInsertRowid, name: name.trim(), email: email.trim().toLowerCase() };
  const token = signToken(user);

  res.status(201).json({ ok: true, token, user });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password) {
    return res.status(400).json({ ok: false, message: "Email and password are required." });
  }

  const user = db
    .prepare("SELECT id, name, email, password_hash FROM users WHERE email = ?")
    .get(email.trim().toLowerCase());

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ ok: false, message: "Invalid email or password." });
  }

  const token = signToken(user);
  res.json({ ok: true, token, user: { id: user.id, name: user.name, email: user.email } });
});

router.get("/me", authRequired, (req, res) => {
  res.json({ ok: true, user: { id: req.user.id, name: req.user.name, email: req.user.email } });
});

module.exports = router;
