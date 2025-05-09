// chart.js - handles chart styling and configuration only

export function generatePerformanceChart(ctx, dataset) {
  return new Chart(ctx, {
    type: "line",
    data: dataset,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Project Performance Over Time",
        },
        legend: {
          position: "top",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
