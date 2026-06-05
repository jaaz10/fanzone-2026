function showAlert(container, message, type) {
  if (!container) return;
  container.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
}

function formatDate(dateStr) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function renderEventCard(party, options = {}) {
  const { showRegister = true } = options;
  const registerBtn = showRegister
    ? `<a href="register.html?party=${party.id}" class="btn btn-primary btn-sm">Register</a>`
    : "";

  return `
    <div class="event-card" data-city="${party.city}">
      <div>
        <span class="badge">${party.city}</span>
        <h3>${party.title}</h3>
        <p class="event-meta">${party.venue}</p>
        <p class="event-meta">${formatDate(party.date)} · ${party.time} · ${party.spots} spots</p>
      </div>
      ${registerBtn}
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  updateNav();

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
      window.location.href = "index.html";
    });
  }
});
