function Reports() {
  return (
    <div className="container">
      <h1>📄 Reports</h1>

      <div className="card">
        <h2>Security Reports</h2>

        <p>
          Generate and download security reports, alert logs, and monitoring
          summaries.
        </p>

        <button
          style={{
            marginTop: "20px",
          }}
        >
          📥 Download Report
        </button>
      </div>
    </div>
  );
}

export default Reports;
