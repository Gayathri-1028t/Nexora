function ExportCSV({ alerts }) {
  const exportCSV = () => {
    if (!alerts.length) {
      alert("No data available to export.");
      return;
    }

    const headers = ["Time", "File", "Status", "Threat"];

    const rows = alerts.map((alert) => [
      alert.time,
      alert.file,
      alert.status,
      alert.threat,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Nexora_Analytics_Report.csv");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={exportCSV}
      style={{
        background: "#16a34a",
        color: "#fff",
        border: "none",
        padding: "12px 20px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      📥 Export CSV
    </button>
  );
}

export default ExportCSV;
