function ActivityTimeline({ alerts }) {
  return (
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "30px",
      }}
    >
      <h2>🕒 Recent Activity</h2>

      {alerts.length === 0 ? (
        <p>No Recent Activity</p>
      ) : (
        alerts
          .slice()
          .reverse()
          .slice(0, 5)
          .map((alert, index) => (
            <div
              key={index}
              style={{
                borderLeft: "4px solid cyan",
                paddingLeft: "15px",
                marginBottom: "20px",
              }}
            >
              <h4>{alert.file}</h4>

              <p>{alert.status}</p>

              <small>{alert.time}</small>
            </div>
          ))
      )}
    </div>
  );
}

export default ActivityTimeline;
