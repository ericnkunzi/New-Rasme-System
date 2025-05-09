// map.js - handles the interactive project map using Leaflet

export function initMap(mapId, projects) {
  const map = L.map(mapId).setView([-1.95, 30.06], 8); // Centered on Rwanda

  // Add OpenStreetMap tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  // Define colors by sector
  const sectorColors = {
    Transport: "red",
    "Water & Sanitation": "blue",
    Energy: "green",
    Other: "orange",
  };

  // Add markers
  projects.forEach((project) => {
    if (project.latitude && project.longitude) {
      const color = sectorColors[project.sector] || "gray";

      const marker = L.circleMarker([project.latitude, project.longitude], {
        radius: 8,
        color: color,
        fillOpacity: 0.8,
      }).addTo(map);

      marker.bindPopup(`
        <strong>${project.project_name}</strong><br/>
        Sector: ${project.sector}<br/>
        Status: ${project.status}<br/>
        Collected: ${project.submission_time || "N/A"}
      `);
    }
  });
}
