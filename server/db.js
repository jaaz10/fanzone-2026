const Database = require("better-sqlite3");
const path = require("path");

const dbPath = process.env.DATABASE_PATH || path.join(__dirname, "fanzone.db");
const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS viewing_parties (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    city TEXT NOT NULL,
    venue TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    spots INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    party_id TEXT NOT NULL,
    guests INTEGER NOT NULL,
    phone TEXT NOT NULL,
    notes TEXT DEFAULT '',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (party_id) REFERENCES viewing_parties(id),
    UNIQUE(user_id, party_id)
  );

  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    party_id TEXT,
    message TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

const SEED_PARTIES = [
  ["vp1", "USA vs Mexico — Opening Match Watch Party", "Los Angeles", "Downtown Sports Bar & Grill", "2026-06-11", "5:00 PM", 80],
  ["vp2", "Brazil vs Argentina — Group Stage", "Miami", "Bayfront Fan Zone", "2026-06-18", "7:30 PM", 120],
  ["vp3", "Germany vs Spain — Knockout Round", "New York", "Brooklyn Soccer Hall", "2026-07-02", "2:00 PM", 60],
  ["vp4", "Canada vs France — Group Stage", "Toronto", "Maple Leaf Pub", "2026-06-22", "12:00 PM", 45],
  ["vp5", "World Cup Final Watch Party", "Los Angeles", "Stadium Plaza", "2026-07-19", "1:00 PM", 200],
  ["vp6", "England vs Italy — Quarter Final", "Chicago", "Windy City Sports Lounge", "2026-07-08", "3:00 PM", 75],
];

const partyCount = db.prepare("SELECT COUNT(*) AS count FROM viewing_parties").get().count;

if (partyCount === 0) {
  const insert = db.prepare(
    "INSERT INTO viewing_parties (id, title, city, venue, date, time, spots) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );
  const seed = db.transaction((parties) => {
    for (const party of parties) insert.run(...party);
  });
  seed(SEED_PARTIES);
}

module.exports = db;
