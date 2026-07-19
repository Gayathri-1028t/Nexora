function Settings() {
  return (
    <div className="container">
      <h1>⚙ Settings</h1>

      <div className="card">
        <h2>Application Settings</h2>

        <p>Configure Nexora preferences and monitoring options.</p>

        <div style={{ marginTop: "20px" }}>
          <label>
            <input type="checkbox" defaultChecked />
            &nbsp; Enable Real-Time Monitoring
          </label>

          <br />
          <br />

          <label>
            <input type="checkbox" defaultChecked />
            &nbsp; Enable Notifications
          </label>

          <br />
          <br />

          <label>
            <input type="checkbox" />
            &nbsp; Enable Email Alerts
          </label>
        </div>
      </div>
    </div>
  );
}

export default Settings;
