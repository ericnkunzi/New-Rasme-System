// General config constants

const CONFIG = {
  apiEndpoint: "https://api.kobotoolbox.org/api/v2/assets/YOUR_ASSET_UID/data.json",
  updateIntervalMinutes: 60, // For automation schedule (optional)
  sectorColors: {
    Transport: "red",
    Energy: "blue",
    "Water & Sanitation": "green",
    Other: "orange"
  },
  mapCenter: [-1.95, 30.06], // Kigali-Rwanda
  mapZoom: 8
};
