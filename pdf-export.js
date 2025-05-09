// pdf-export.js

document.getElementById('exportBtn').addEventListener('click', () => {
  const element = document.body; // Export the whole page

  const opt = {
    margin:       0.5,
    filename:     'AfDB_RASME_Project_Report.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
});
