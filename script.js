// script.js

document.addEventListener("DOMContentLoaded", () => {
  loadUsers();
  loadData();
});

// Load user info from users.json
function loadUsers() {
  fetch("users.json")
    .then((response) => response.json())
    .then((users) => {
      const userContainer = document.getElementById("user-progress");
      userContainer.innerHTML = "";

      users.forEach((user) => {
        const userElement = document.createElement("div");
        userElement.classList.add("user-card");

        userElement.innerHTML = `
          <strong>${user.name}</strong><br>
          Completed: ${user.completed} | Active: ${user.active} | Overdue: ${user.overdue}
        `;
        userContainer.appendChild(userElement);
      });
    })
    .catch((error) => {
      console.error("Failed to load users.json", error);
    });
}

// Load project data from data.json and pass to charts and map
function loadData() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      renderCharts(data);
      renderMap(data);
    })
    .catch((error) => {
      console.error("Failed to load data.json", error);
    });
}
