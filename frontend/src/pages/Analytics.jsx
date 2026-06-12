import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function Analytics() {

  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchAnalytics = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response = await API.get(
          "/tracking/tracker-analytics/",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        setData(response.data);

      } catch (error) {

        console.error(error);

        if (error.response) {

          setError(
            `${error.response.status} - ${JSON.stringify(error.response.data)}`
          );

        } else {

          setError(
            "Unable to connect to backend"
          );
        }
      }
    };

    fetchAnalytics();

  }, []);

  if (error) {

    return (
      <>
        <Navbar />

        <div className="container mt-5">

          <h3>Error</h3>

          <p>{error}</p>

        </div>
      </>
    );
  }

  if (!data) {

    return (
      <>
        <Navbar />

        <div className="container mt-5">

          <div className="text-center mt-5">
  <div className="spinner-border text-primary"></div>
  <p className="mt-3">Loading analytics...</p>
</div>

        </div>
      </>
    );
  }

  const chartData = {

    labels: [
      "High Risk",
      "Medium Risk",
      "Low Risk"
    ],

    datasets: [
      {
        data: [
          data.high_risk_trackers,
          data.medium_risk_trackers,
          data.low_risk_trackers
        ],

        backgroundColor: [
          "#dc3545",
          "#ffc107",
          "#198754"
        ],

        borderWidth: 1
      }
    ]
  };

  const options = {

    responsive: true,

    plugins: {

      legend: {
        position: "bottom"
      }
    }
  };

  return (

    <>
      <Navbar />

      <div className="container mt-5">

        <h1 className="display-5 fw-bold mb-2">
  📊 Tracker Analytics
</h1>

<p className="text-muted mb-4">
  Analyze tracker activity and risk distribution.
</p>

        <div className="row">

          <div className="col-md-6 mb-3">

            <div className="card shadow border-0 p-4 bg-primary text-white">

              <h5>
                Total Trackers Detected
              </h5>

              <h2 className="display-6 fw-bold">
                {data.total_trackers_detected}
              </h2>

            </div>

          </div>

          <div className="col-md-6 mb-3">

            <div className="card shadow border-0 p-4 bg-dark text-white">

              <h5>
                Most Detected Tracker
              </h5>

              <h2 className="display-6 fw-bold">
                {data.most_detected_tracker || "None"}
              </h2>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div className="card shadow border-0 p-4 bg-danger text-white">

              <h5>
                High Risk
              </h5>

              <h2 className="display-6 fw-bold">
                {data.high_risk_trackers}
              </h2>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div className="card shadow border-0 p-4 bg-danger text-white">

              <h5>
                Medium Risk
              </h5>

              <h2 className="display-6 fw-bold">
                {data.medium_risk_trackers}
              </h2>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div className="card shadow border-0 p-4 bg-danger text-white">

              <h5>
                Low Risk
              </h5>

              <h2 className="display-6 fw-bold">
                {data.low_risk_trackers}
              </h2>

            </div>

          </div>

        </div>

        <div className="card shadow border-0 p-4 mt-4">

          <h3 className="fw-bold mb-4">
  🎯 Risk Distribution
</h3>

          <Doughnut
            data={chartData}
            options={options}
          />

        </div>

      </div>

    </>
  );
}

export default Analytics;