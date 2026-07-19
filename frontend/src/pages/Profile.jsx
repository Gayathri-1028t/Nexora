function Profile() {
  return (
    <div className="container">
      <h1>👤 User Profile</h1>

      <div className="card">
        <h2>Administrator Details</h2>

        <div style={{ marginTop: "20px", lineHeight: "2" }}>
          <p>
            <strong>Name:</strong> Gayathri
          </p>

          <p>
            <strong>Role:</strong> Security Administrator
          </p>

          <p>
            <strong>Email:</strong> admin@nexora.ai
          </p>

          <p>
            <strong>Status:</strong>
            <span style={{ color: "#22c55e" }}> Active</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
