const express = require("express");
const bcrypt = require("bcryptjs");
const store = require("../store");
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

  const normalizedEmail = email.trim().toLowerCase();
  if (store.findUserByEmail(normalizedEmail)) {
    return res.status(409).json({ ok: false, message: "An account with this email already exists." });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const user = store.createUser({
    name: name.trim(),
    email: normalizedEmail,
    password_hash: passwordHash,
  });

  const token = signToken(user);
  res.status(201).json({ ok: true, token, user: { id: user.id, name: user.name, email: user.email } });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password) {
    return res.status(400).json({ ok: false, message: "Email and password are required." });
  }

  const user = store.findUserByEmail(email.trim().toLowerCase());

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
