// Load data and initialize dashboard
document.addEventListener("DOMContentLoaded", async () => {
  const summaryContainer = document.getElementById("summary");
  const performanceCtx = document.getElementById("performanceChart").getContext("2d");
  const workCtx = document.getElementById("workProgressChart").getContext("2d");

  const data = await fetch("data.json").then(res => res.json());
  const users = await fetch("users.json").then(res => res.json());

  renderSummary(data);
  renderPerformanceChart(data, performanceCtx);
  renderWorkProgressChart(users, workCtx);
  renderMap(data);
});

// Render summary stats
function renderSummary(data) {
  const summaryContainer = document.getElementById("summary");
  const total = data.length;
  const completed = data.filter(item => item.status === "Completed").length;
  const overdue = data.filter(item => item.status === "Overdue").length;
  const upcoming = data.filter(item => item.status === "Due Soon").length;

  const html = `
    <div class="summary-card"><h3>Total Tasks</h3><p>${total}</p></div>
    <div class="summary-card"><h3>Completed</h3><p>${completed}</p></div>
    <div class="summary-card"><h3>Overdue</h3><p>${overdue}</p></div>
    <div class="summary-card"><h3>Due Soon</h3><p>${upcoming}</p></div>
  `;
  summaryContainer.innerHTML = html;
}
