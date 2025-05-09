// chart.js

function renderCharts(data) {
  renderPerformanceChart(data);
  renderWorkProgressChart(data);
  renderBaselineChart(data);
}

// Performance Chart (Line)
function renderPerformanceChart(data) {
  const ctx = document.getElementById("performanceChart").getContext("2d");

  const labels = data.map(item => item.date);
  const completed = data.map(item => item.completed);
  const planned = data.map(item => item.planned);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Planned",
          data: planned,
          borderColor: "orange",
          fill: false,
          tension: 0.2
        },
        {
          label: "Completed",
          data: completed,
          borderColor: "green",
          fill: false,
          tension: 0.2
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top"
        },
        title: {
          display: true,
          text: "Project Performance Over Time"
        }
      }
    }
  });
}

// Work Progress Chart (Bar)
function renderWorkProgressChart(data) {
  const ctx = document.getElementById("workProgressChart").getContext("2d");

  const users = [...new Set(data.map(item => item.user))];
  const completed = users.map(user => data.filter(d => d.user === user && d.status === "completed").length);
  const active = users.map(user => data.filter(d => d.user === user && d.status === "active").length);
  const overdue = users.map(user => data.filter(d => d.user === user && d.status === "overdue").length);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: users,
      datasets: [
        {
          label: "Completed",
          data: completed,
          backgroundColor: "green"
        },
        {
          label: "Active",
          data: active,
          backgroundColor: "blue"
        },
        {
          label: "Overdue",
          data: overdue,
          backgroundColor: "red"
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Work Progress by User"
        }
      }
    }
  });
}

// Baseline Chart (Gantt-style bar chart)
function renderBaselineChart(data) {
  const ctx = document.getElementById("baselineChart").getContext("2d");

  const labels = data.map(d => d.task);
  const startDates = data.map(d => new Date(d.start).getTime());
  const endDates = data.map(d => new Date(d.end).getTime());

  const durations = endDates.map((end, index) => (end - startDates[index]) / (1000 * 60 * 60 * 24)); // days
  const startOffsets = startDates.map(date => (date - Math.min(...startDates)) / (1000 * 60 * 60 * 24)); // days offset

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Planned Duration",
          data: durations,
          backgroundColor: "steelblue",
          base: startOffsets
        }
      ]
    },
    options: {
      indexAxis: "y",
      plugins: {
        title: {
          display: true,
          text: "Baseline Timeline"
        },
        legend: {
          display: false
        }
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
          title: {
            display: true,
            text: "Days"
          }
        },
        y: {
          stacked: true
        }
      }
    }
  });
}
