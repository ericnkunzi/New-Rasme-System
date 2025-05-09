// Replace these with your real credentials
const API_TOKEN = "7a188f9457864dd166c64b0d070ba96fa95b24fc";
const FORM_UID = "aGr5kutzkG7nrHiEyH7vCt";

// API endpoint
const API_URL = `https://kf.kobotoolbox.org/api/v2/assets/${FORM_UID}/data.json`;

// Load data from KoboToolbox
async function loadData() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Token ${API_TOKEN}`,
      },
    });
    const result = await response.json();
    const records = result.results;

    // Transform and render charts
    renderCharts(records);
    renderMap(records);
    renderWorkProgress(records);
    renderTimeline(records);
  } catch (error) {
    console.error("Failed to fetch Kobo data:", error);
  }
}

function renderCharts(data) {
  // Count status types
  const total = data.length;
  const completed = data.filter(r => r.status === 'completed').length;
  const overdue = data.filter(r => r.status === 'overdue').length;
  const planned = data.filter(r => r.status === 'planned').length;
  const cancelled = data.filter(r => r.status === 'cancelled').length;

  const ctx = document.getElementById("performanceChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map((_, i) => `Entry ${i + 1}`),
      datasets: [
        {
          label: "Completed",
          data: data.map((r, i) => r.status === "completed" ? i + 1 : null),
          borderColor: "green",
          borderWidth: 2,
          fill: false,
        },
        {
          label: "Overdue",
          data: data.map((r, i) => r.status === "overdue" ? i + 1 : null),
          borderColor: "red",
          borderWidth: 2,
          fill: false,
        },
        {
          label: "Planned",
          data: data.map((r, i) => r.status === "planned" ? i + 1 : null),
          borderColor: "orange",
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Project Performance Over Time",
        },
      },
    },
  });
}

function renderWorkProgress(data) {
  const container = document.getElementById("workProgressChart");
  container.innerHTML = `<p>${data.length} total entries loaded from KoboToolbox.</p>`;
}

function renderTimeline(data) {
  const container = document.getElementById("baselineChart");
  container.innerHTML = `<p>${data.length} activities tracked across the baseline timeline.</p>`;
}

function renderMap(data) {
  const map = L.map("map").setView([-1.95, 30.06], 8);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
  }).addTo(map);

  const sectorColors = {
    energy: "red",
    water: "blue",
    transport: "green",
    other: "orange"
  };

  data.forEach(record => {
    if (record._geolocation && record._geolocation.length === 2) {
      const lat = record._geolocation[0];
      const lng = record._geolocation[1];
      const sector = record.sector || "other";
      const color = sectorColors[sector.toLowerCase()] || "gray";

      L.circleMarker([lat, lng], {
        radius: 8,
        fillColor: color,
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      }).addTo(map).bindPopup(`Sector: ${sector}`);
    }
  });
}

// Run everything
loadData();
