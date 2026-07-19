import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Username:", username);
    console.log("Password:", password);

    if (username.trim() === "admin" && password.trim() === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid Username or Password");
    }
  };
  return (
    <div
      style={{
        height: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "#1e293b",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0px 0px 20px rgba(0,255,255,0.2)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#38bdf8",
          }}
        >
          🛡 Nexora Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            marginBottom: "15px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "14px",
            fontSize: "16px",
          }}
        >
          Login
        </button>

        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#94a3b8",
          }}
        >
          Demo Credentials
          <br />
          Username: <b>admin</b>
          <br />
          Password: <b>admin123</b>
        </p>
      </div>
    </div>
  );
}

export default Login;
