// Chart: Performance Over Time
function renderPerformanceChart(data, ctx) {
  const dates = [...new Set(data.map(item => item.date))].sort();
  const completedCounts = dates.map(date =>
    data.filter(item => item.date <= date && item.status === "Completed").length
  );
  const plannedCounts = dates.map(date =>
    data.filter(item => item.date <= date).length
  );

  new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Completed Tasks",
          data: completedCounts,
          borderColor: "#00703c",
          backgroundColor: "rgba(0,112,60,0.2)",
          fill: true,
        },
        {
          label: "Planned Tasks",
          data: plannedCounts,
          borderColor: "#ff9800",
          backgroundColor: "rgba(255,152,0,0.2)",
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Project Performance Over Time" },
      },
    },
  });
}

// Chart: Work Progress by User
function renderWorkProgressChart(users, ctx) {
  const labels = users.map(u => u.name);
  const completed = users.map(u => u.completed);
  const overdue = users.map(u => u.overdue);
  const pending = users.map(u => u.pending);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Completed",
          data: completed,
          backgroundColor: "#4caf50",
        },
        {
          label: "Overdue",
          data: overdue,
          backgroundColor: "#f44336",
        },
        {
          label: "Pending",
          data: pending,
          backgroundColor: "#ffc107",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: "Work Progress by User" },
        tooltip: { mode: "index", intersect: false },
        legend: { position: "bottom" },
      },
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: false,
      },
    },
  });
}
