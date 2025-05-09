// map.js

function renderMap(data) {
  const map = L.map('projectMap').setView([-1.95, 30.06], 8); // Kigali-centered map

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(map);

  const sectorColors = {
    Energy: 'red',
    Transport: 'blue',
    "Water & Sanitation": 'green',
    Other: 'purple'
  };

  data.forEach(item => {
    if (item.lat && item.lng) {
      const marker = L.circleMarker([item.lat, item.lng], {
        color: sectorColors[item.sector] || 'gray',
        radius: 8,
        fillOpacity: 0.8
      });

      marker.bindPopup(`
        <strong>${item.project}</strong><br>
        Sector: ${item.sector}<br>
        Status: ${item.status}<br>
        Date: ${item.date}
      `);

      marker.addTo(map);
    }
  });
}
