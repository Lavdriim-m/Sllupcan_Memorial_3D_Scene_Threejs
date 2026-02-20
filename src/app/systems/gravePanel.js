import { GRAVE_SETS } from "./gravesData";

// DOM references
const panel = document.getElementById("grave-panel");
const closeBtn = document.getElementById("grave-panel-close");
const toggleBtn = document.getElementById("grave-panel-toggle");

const nameEl = document.getElementById("grave-name");
const datesEl = document.getElementById("grave-dates");
const titleEl = document.getElementById("grave-title");
const peopleEl = document.getElementById("grave-people");

// Opens the grave panel for a grave SET (Top1, Bottom3, etc.)
export function openGravePanel(graveSetId) {
  const data = GRAVE_SETS[graveSetId];

  // Safe fallback
  const safe = data ?? {
    label: graveSetId,
    people: [],
  };

  // Header
  nameEl.textContent = safe.label ?? graveSetId;
  datesEl.textContent = safe.people.length
    ? `Ketu pushojne trupat e ${safe.people.length} deshmoreve.`
    : "No data available";
  titleEl.textContent = "";

  // Clear previous content
  peopleEl.innerHTML = "";

  // Render people
  if (!safe.people.length) {
    peopleEl.innerHTML =
      `<p class="grave-panel__muted">No information available yet.</p>`;
  } else {
    safe.people.forEach((p, index) => {
      const bornDied =
        p.born || p.died
        ? `
            <div>${p.born ?? ""}</div>
            <div>${p.died ?? ""}</div>
        `
        : "";

      const card = document.createElement("div");
      card.className = "person-card";

      card.innerHTML = `
        <div class="person-card__top">
          <div>
            <div class="person-card__name">${p.name ?? "Unknown"}</div>
            <div class="person-card__dates">${bornDied}</div>
          </div>
          <button class="person-card__btn" type="button">More</button>
        </div>
        <div class="person-card__bio">
          ${p.bio ?? ""}
        </div>
      `;

      const btn = card.querySelector(".person-card__btn");
      const bio = card.querySelector(".person-card__bio");

      btn.addEventListener("click", () => {
        const isOpen = bio.style.display === "block";
        bio.style.display = isOpen ? "none" : "block";
        btn.textContent = isOpen ? "More" : "Less";
      });

      peopleEl.appendChild(card);
    });
  }

  // Show panel
  panel.classList.add("is-open");
  panel.classList.add("is-collapsed");
  panel.setAttribute("aria-hidden", "false");

  toggleBtn.textContent = "Expand";
}

// Closes the grave panel
export function closeGravePanel() {
  panel.classList.remove("is-open");
  panel.classList.remove("is-collapsed");
  panel.setAttribute("aria-hidden", "true");
  toggleBtn.textContent = "Collapse";
}

// UI buttons
closeBtn.addEventListener("click", closeGravePanel);

toggleBtn.addEventListener("click", () => {
    panel.classList.toggle("is-collapsed");
    toggleBtn.textContent = panel.classList.contains("is-collapsed")
        ? "Expand"
        : "Collapse";
});