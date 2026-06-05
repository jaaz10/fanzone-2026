const AUTH_KEY = "fanzone_users";
const SESSION_KEY = "fanzone_session";
const REG_KEY = "fanzone_registrations";

function getUsers() {
  return JSON.parse(localStorage.getItem(AUTH_KEY) || "[]");
}

function saveUsers(users) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(users));
}

function getCurrentUser() {
  const email = localStorage.getItem(SESSION_KEY);
  if (!email) return null;
  return getUsers().find((u) => u.email === email) || null;
}

function signup(name, email, password) {
  const users = getUsers();
  if (users.some((u) => u.email === email)) {
    return { ok: false, message: "An account with this email already exists." };
  }
  users.push({ name, email, password });
  saveUsers(users);
  localStorage.setItem(SESSION_KEY, email);
  return { ok: true };
}

function login(email, password) {
  const user = getUsers().find((u) => u.email === email && u.password === password);
  if (!user) {
    return { ok: false, message: "Invalid email or password." };
  }
  localStorage.setItem(SESSION_KEY, email);
  return { ok: true };
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
}

function requireAuth(redirectTo) {
  if (!getCurrentUser()) {
    window.location.href = redirectTo || "login.html";
    return false;
  }
  return true;
}

function getRegistrations() {
  return JSON.parse(localStorage.getItem(REG_KEY) || "[]");
}

function saveRegistrations(regs) {
  localStorage.setItem(REG_KEY, JSON.stringify(regs));
}

function getUserRegistrations(email) {
  return getRegistrations().filter((r) => r.userEmail === email);
}

function getPartyById(id) {
  return VIEWING_PARTIES.find((p) => p.id === id);
}

function createRegistration(data) {
  const regs = getRegistrations();
  const existing = regs.find(
    (r) => r.userEmail === data.userEmail && r.partyId === data.partyId
  );
  if (existing) {
    return { ok: false, message: "You are already registered for this event." };
  }
  const reg = {
    id: "reg_" + Date.now(),
    ...data,
    createdAt: new Date().toISOString(),
  };
  regs.push(reg);
  saveRegistrations(regs);
  return { ok: true, registration: reg };
}

function updateRegistration(id, updates) {
  const regs = getRegistrations();
  const idx = regs.findIndex((r) => r.id === id);
  if (idx === -1) return { ok: false, message: "Registration not found." };
  regs[idx] = { ...regs[idx], ...updates };
  saveRegistrations(regs);
  return { ok: true };
}

function cancelRegistration(id) {
  const regs = getRegistrations().filter((r) => r.id !== id);
  saveRegistrations(regs);
  return { ok: true };
}

function updateNav() {
  const nav = document.getElementById("main-nav");
  if (!nav) return;

  const user = getCurrentUser();
  const greeting = document.getElementById("user-greeting");

  if (user && greeting) {
    greeting.textContent = `Hi, ${user.name}`;
    greeting.style.display = "inline";
  }

  const authLinks = nav.querySelectorAll("[data-auth]");
  authLinks.forEach((link) => {
    const needsAuth = link.dataset.auth === "in";
    link.style.display = user ? (needsAuth ? "inline-block" : "none") : needsAuth ? "none" : "inline-block";
  });
}
