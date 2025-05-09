function exportDashboardToPDF() {
  const element = document.body;
  const opt = {
    margin:       0.5,
    filename:     `AfDB_Project_Report_${new Date().toISOString().split("T")[0]}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().from(element).set(opt).save();
}

// Attach to button click
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("exportPDF");
  if (btn) btn.addEventListener("click", exportDashboardToPDF);
});
