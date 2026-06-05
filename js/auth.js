let currentUser = null;

async function initAuth() {
  if (!getToken()) {
    currentUser = null;
    updateNav();
    return null;
  }

  try {
    const data = await apiFetch("/auth/me");
    currentUser = data.user;
  } catch {
    setToken(null);
    currentUser = null;
  }

  updateNav();
  return currentUser;
}

function getCurrentUser() {
  return currentUser;
}

async function signup(name, email, password) {
  try {
    const data = await apiFetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    setToken(data.token);
    currentUser = data.user;
    updateNav();
    return { ok: true };
  } catch (err) {
    return { ok: false, message: err.message };
  }
}

async function login(email, password) {
  try {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setToken(data.token);
    currentUser = data.user;
    updateNav();
    return { ok: true };
  } catch (err) {
    return { ok: false, message: err.message };
  }
}

function logout() {
  setToken(null);
  currentUser = null;
  updateNav();
}

async function requireAuth(redirectTo) {
  await initAuth();
  if (!getCurrentUser()) {
    window.location.href = redirectTo || "login.html";
    return false;
  }
  return true;
}

async function fetchParties(city) {
  const query = city ? `?city=${encodeURIComponent(city)}` : "";
  const data = await apiFetch(`/parties${query}`);
  return data.parties;
}

async function fetchCities() {
  const data = await apiFetch("/parties/cities");
  return data.cities;
}

async function fetchPartyById(id) {
  const data = await apiFetch(`/parties/${id}`);
  return data.party;
}

async function fetchRegistrations() {
  const data = await apiFetch("/registrations");
  return data.registrations;
}

async function createRegistration({ partyId, guests, phone, notes }) {
  try {
    await apiFetch("/registrations", {
      method: "POST",
      body: JSON.stringify({ partyId, guests, phone, notes }),
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, message: err.message };
  }
}

async function updateRegistration(id, updates) {
  try {
    await apiFetch(`/registrations/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, message: err.message };
  }
}

async function cancelRegistration(id) {
  try {
    await apiFetch(`/registrations/${id}`, { method: "DELETE" });
    return { ok: true };
  } catch (err) {
    return { ok: false, message: err.message };
  }
}

async function sendContactMessage({ name, email, message, partyId }) {
  try {
    const data = await apiFetch("/contact", {
      method: "POST",
      body: JSON.stringify({ name, email, message, partyId: partyId || null }),
    });
    return { ok: true, message: data.message };
  } catch (err) {
    return { ok: false, message: err.message };
  }
}

function updateNav() {
  const nav = document.getElementById("main-nav");
  if (!nav) return;

  const user = getCurrentUser();
  const greeting = document.getElementById("user-greeting");

  if (user && greeting) {
    greeting.textContent = `Hi, ${user.name}`;
    greeting.style.display = "inline";
  } else if (greeting) {
    greeting.style.display = "none";
  }

  const authLinks = nav.querySelectorAll("[data-auth]");
  authLinks.forEach((link) => {
    const needsAuth = link.dataset.auth === "in";
    link.style.display = user ? (needsAuth ? "inline-block" : "none") : needsAuth ? "none" : "inline-block";
  });
}
