import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter Username and Password");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/login", {
        username,
        password,
      });

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("full_name", response.data.full_name);

      alert("Login Successful ✅");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert("Invalid Username or Password ❌");
    } finally {
      setLoading(false);
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
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
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
