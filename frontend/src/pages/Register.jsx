import { useState } from "react";
import API from "../services/api";

function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    try {

      await API.post(
        "/users/register/",
        {
          username,
          password
        }
      );

      alert("Registration Successful");

      window.location.href = "/login";

    } catch (error) {

      console.log(error);

      alert("Registration Failed");
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
            Create Your Account
          </p>

        </div>

        <div className="mb-3">

          <label className="form-label">
            Username
          </label>

          <input
            className="form-control"
            placeholder="Choose username"
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
            placeholder="Create password"
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

        </div>

        <button
          className="btn btn-success w-100 py-2"
          onClick={handleRegister}
        >
          Create Account
        </button>
        <p className="text-center mt-3">
  Already have an account?
  <a href="/login"> Login</a>
</p>

        <div className="text-center mt-4">

          <small className="text-muted">
            Join Privacy Shield and take control
            of your online privacy.
          </small>

        </div>

      </div>

    </div>
  );
}

export default Register;