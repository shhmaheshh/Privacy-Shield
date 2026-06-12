import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Scanner() {

  const [domain, setDomain] = useState("");
  const [result, setResult] = useState(null);

  const scanDomain = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.post(
        "/tracking/scan-domain/",
        {
          domain: domain
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setResult(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <h1 className="display-5 fw-bold">
  🔍 Domain Scanner
</h1>

<p className="text-muted mb-4">
  Scan domains for suspicious tracker behavior and privacy risks.
</p>

        <input
          className="form-control form-control-lg shadow-sm mb-3"
          placeholder="Enter domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />

        <button
          className="btn btn-primary btn-lg shadow"
          onClick={scanDomain}
        >
          🚀 Scan Domain
        </button>

        {result && (
          <div className="card shadow border-0 mt-4 p-4">

            <h3>

  Suspicious:

  {" "}

  <span
    className={
      result.suspicious
        ? "badge bg-danger"
        : "badge bg-success"
    }
  >
    {result.suspicious ? "YES" : "NO"}
  </span>

</h3>

            <h4 className="mt-3">

  Risk Score:

  {" "}

  <span className="fw-bold text-primary">
    {result.risk_score}
  </span>

</h4>

            <h5 className="mt-4">
  ⚠ Detection Reasons
</h5>

            <ul className="list-group mt-3">
              {result.reasons.map((reason, index) => (
                <li
  key={index}
  className="list-group-item"
>
  {reason}
</li>
              ))}
            </ul>

          </div>
        )}

      </div>
    </>
  );
}

export default Scanner;