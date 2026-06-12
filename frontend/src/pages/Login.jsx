import { useState } from "react";
import API from "../services/api";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const response = await API.post(
        "/token/",
        {
          username,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.access
      );

      window.location.href = "/dashboard";

    } catch (error) {

      alert("Login Failed");
    }
  };

  return (

    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b,#0f766e)"
      }}
    >

      <div
        className="card shadow-lg border-0 p-5"
        style={{
          width: "420px",
          borderRadius: "20px"
        }}
      >

        <div className="text-center mb-4">

          <h1 className="fw-bold">
            🛡 Privacy Shield
          </h1>

          <p className="text-muted">
            Secure Login Portal
          </p>

        </div>

        <div className="mb-3">

          <label className="form-label">
            Username
          </label>

          <input
            className="form-control"
            placeholder="Enter username"
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

        </div>

        <div className="mb-4">

          <label className="form-label">
            Password
          </label>

          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

        </div>

        <button
          className="btn btn-primary w-100 py-2"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="text-center mt-3">
  Don't have an account?
  <a href="/register"> Register</a>
</p>

        <div className="text-center mt-4">

          <small className="text-muted">
            Protecting your privacy in real time
          </small>

        </div>

      </div>

    </div>
  );
}

export default Login;