import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import RecentActivity from "../components/RecentActivity";

function CommandCenter() {

  const [dashboard, setDashboard] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [risk, setRisk] = useState(null);

  useEffect(() => {

    const loadData = async () => {

      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      try {

        const dashboardRes =
          await API.get(
            "/tracking/privacy-dashboard/",
            config
          );

        const analyticsRes =
          await API.get(
            "/tracking/tracker-analytics/",
            config
          );

        const riskRes =
          await API.get(
            "/tracking/advertising-risk/",
            config
          );

        setDashboard(dashboardRes.data);
        setAnalytics(analyticsRes.data);
        setRisk(riskRes.data);

      } catch (error) {
        console.log(error);
      }
    };

    loadData();

  }, []);

  const vanishAll = async () => {

  try {

    const token = localStorage.getItem("token");

    const response = await API.post(
      "/tracking/vanish-all/",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert(response.data.message);

    window.location.reload();

  } catch (error) {

    console.log(error);

    alert("Failed to activate Vanish Mode");
  }
};

  if (
    !dashboard ||
    !analytics ||
    !risk
  ) {
    return (

  <>
    <Navbar />

    <div className="text-center mt-5">

      <div className="spinner-border text-primary"></div>

      <p className="mt-3">
        Loading Command Center...
      </p>

    </div>

  </>
);
  }

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <h1 className="display-5 fw-bold">
  🛡 Privacy Shield Command Center
</h1>

<p className="text-muted">
  Monitor privacy health and manage tracker activity.
</p>

        <div className="row mt-4">

          <div className="col-md-4">
            <div className="card shadow border-0 p-4 bg-primary text-white">
              <h4>Privacy Score</h4>
              <h1 className="display-4 fw-bold">
                {dashboard.privacy_score}
              </h1>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0 p-4 bg-warning">
              <h4>Advertising Risk</h4>
              <h1 className="display-4 fw-bold">
                {risk.advertising_profile_risk}
              </h1>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0 p-4 bg-danger text-white">
              <h4>Total Trackers</h4>
              <h1 className="display-4 fw-bold">
                {analytics.total_trackers_detected}
              </h1>
            </div>
          </div>

        </div>

        <div className="card shadow border-0 mt-4 p-4">

          <h4 className="text-muted">
  Most Detected Tracker
</h4>

          <h2>
            {analytics.most_detected_tracker}
          </h2>

        </div>

        <button
          className="btn btn-danger btn-lg shadow mt-4"
          onClick={vanishAll}
        >
          🧹 VANISH ALL DATA
        </button>
        <div className="mt-5">
  <RecentActivity />
</div>

      </div>
    </>
  );
}

export default CommandCenter;