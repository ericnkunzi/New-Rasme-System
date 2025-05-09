// Render map with sector markers
function renderMap(data) {
  const map = L.map("map").setView([-1.95, 30.06], 8); // Centered on Rwanda

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  const sectorColors = {
    Transport: "red",
    Energy: "blue",
    "Water & Sanitation": "green",
    Other: "orange"
  };

  data.forEach(item => {
    if (!item.lat || !item.lng) return;

    const sector = item.sector || "Other";
    const color = sectorColors[sector] || "gray";

    const marker = L.circleMarker([item.lat, item.lng], {
      radius: 8,
      color,
      fillColor: color,
      fillOpacity: 0.7,
    });

    marker
      .bindPopup(`<strong>${item.project}</strong><br>${sector}<br>Status: ${item.status}`)
      .addTo(map);
  });
}
