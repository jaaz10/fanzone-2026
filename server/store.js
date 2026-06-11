const fs = require("fs");
const path = require("path");

const dataDir = process.env.DATA_DIR || path.join(__dirname, "data");
const dbPath = path.join(dataDir, "fanzone.json");

const SEED_PARTIES = [
  { id: "vp1", title: "Mexico vs South Africa — Opening Match", city: "Chicago", venue: "Fútbol House Sports Bar", date: "2026-06-11", time: "2:00 PM", spots: 100 },
  { id: "vp2", title: "USA vs Paraguay — Group D", city: "Los Angeles", venue: "SoFi Fan Zone", date: "2026-06-12", time: "6:00 PM", spots: 200 },
  { id: "vp3", title: "Brazil vs Morocco — Group C", city: "Miami", venue: "Copacabana Sports Lounge", date: "2026-06-13", time: "6:00 PM", spots: 150 },
  { id: "vp4", title: "England vs Croatia — Group L", city: "Dallas", venue: "Three Lions Pub", date: "2026-06-17", time: "3:00 PM", spots: 80 },
  { id: "vp5", title: "Argentina vs Algeria — Group J", city: "New York", venue: "Buenos Aires Grill & Screen", date: "2026-06-16", time: "9:00 PM", spots: 120 },
  { id: "vp6", title: "USA vs Australia — Group D", city: "Seattle", venue: "Emerald City Soccer Club", date: "2026-06-19", time: "12:00 PM", spots: 90 },
  { id: "vp7", title: "France vs Senegal — Group I", city: "Toronto", venue: "Le Mondial Café", date: "2026-06-16", time: "3:00 PM", spots: 60 },
  { id: "vp8", title: "World Cup Final Watch Party", city: "New York", venue: "MetLife Fan Festival", date: "2026-07-19", time: "3:00 PM", spots: 500 },
];

function defaultData() {
  return {
    users: [],
    viewing_parties: SEED_PARTIES,
    registrations: [],
    contact_messages: [],
    counters: { users: 0, registrations: 0, contact_messages: 0 },
  };
}

function load() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(dbPath)) {
    const data = defaultData();
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    return data;
  }

  const data = JSON.parse(fs.readFileSync(dbPath, "utf8"));
  if (!data.viewing_parties?.length) {
    data.viewing_parties = SEED_PARTIES;
    save(data);
  }
  return data;
}

function save(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

let data = load();

function refresh() {
  data = load();
}

function nextId(key) {
  data.counters[key] = (data.counters[key] || 0) + 1;
  save(data);
  return data.counters[key];
}

function findUserByEmail(email) {
  return data.users.find((u) => u.email === email) || null;
}

function createUser({ name, email, password_hash }) {
  const user = {
    id: nextId("users"),
    name,
    email,
    password_hash,
    created_at: new Date().toISOString(),
  };
  data.users.push(user);
  save(data);
  return user;
}

function getParties(city) {
  const parties = [...data.viewing_parties].sort((a, b) => a.date.localeCompare(b.date));
  return city ? parties.filter((p) => p.city === city) : parties;
}

function getCities() {
  return [...new Set(data.viewing_parties.map((p) => p.city))].sort();
}

function getPartyById(id) {
  return data.viewing_parties.find((p) => p.id === id) || null;
}

function getRegistrationsForUser(userId) {
  return data.registrations
    .filter((r) => r.user_id === userId)
    .map((r) => {
      const party = getPartyById(r.party_id);
      return {
        id: r.id,
        guests: r.guests,
        phone: r.phone,
        notes: r.notes,
        created_at: r.created_at,
        party_id: party?.id,
        party_title: party?.title,
        city: party?.city,
        date: party?.date,
      };
    })
    .sort((a, b) => (a.date || "").localeCompare(b.date || ""));
}

function findRegistration(userId, partyId) {
  return data.registrations.find((r) => r.user_id === userId && r.party_id === partyId) || null;
}

function createRegistration({ user_id, party_id, guests, phone, notes }) {
  const reg = {
    id: nextId("registrations"),
    user_id,
    party_id,
    guests,
    phone,
    notes: notes || "",
    created_at: new Date().toISOString(),
  };
  data.registrations.push(reg);
  save(data);
  return reg;
}

function getRegistrationById(id, userId) {
  const reg = data.registrations.find((r) => String(r.id) === String(id));
  if (!reg || reg.user_id !== userId) return null;
  return reg;
}

function updateRegistration(id, userId, updates) {
  const reg = getRegistrationById(id, userId);
  if (!reg) return false;
  Object.assign(reg, updates);
  save(data);
  return true;
}

function deleteRegistration(id, userId) {
  const before = data.registrations.length;
  data.registrations = data.registrations.filter(
    (r) => !(String(r.id) === String(id) && r.user_id === userId)
  );
  if (data.registrations.length === before) return false;
  save(data);
  return true;
}

function createContactMessage({ name, email, party_id, message }) {
  const msg = {
    id: nextId("contact_messages"),
    name,
    email,
    party_id: party_id || null,
    message,
    created_at: new Date().toISOString(),
  };
  data.contact_messages.push(msg);
  save(data);
  return msg;
}

module.exports = {
  refresh,
  findUserByEmail,
  createUser,
  getParties,
  getCities,
  getPartyById,
  getRegistrationsForUser,
  findRegistration,
  createRegistration,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
  createContactMessage,
};
