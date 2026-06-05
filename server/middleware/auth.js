const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "fanzone-dev-secret-change-in-production";

function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

function authRequired(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ ok: false, message: "Login required." });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ ok: false, message: "Session expired. Please log in again." });
  }
}

module.exports = { signToken, authRequired, JWT_SECRET };
