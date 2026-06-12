import { useEffect, useState } from "react";
import API from "../services/api";

function RecentActivity() {

  const [activities, setActivities] = useState([]);

  useEffect(() => {

    const loadActivities = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await API.get(
          "/tracking/recent-activity/",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setActivities(response.data);

      } catch (error) {

        console.log(error);
      }
    };

    loadActivities();

  }, []);

  return (
    <div className="card shadow border-0 mt-4 p-4">

      <h3 className="fw-bold mb-4">
  📜 Recent Activity
</h3>

      <table className="table table-hover align-middle">

        <thead className="table-dark">
          <tr>
            <th>Tracker</th>
            <th>Risk</th>
            <th>URL</th>
          </tr>
        </thead>

        <tbody>

  {activities.length === 0 ? (

  <tr>
    <td
      colSpan="3"
      className="text-center text-muted"
    >
      No recent activity found
    </td>
  </tr>

) : (

  activities.map((activity, index) => (

    <tr key={index}>

      <td>{activity.tracker}</td>

      <td>
        <span
          className={
            activity.risk === "High"
              ? "badge bg-danger"
              : activity.risk === "Medium"
              ? "badge bg-warning text-dark"
              : "badge bg-success"
          }
        >
          {activity.risk}
        </span>
      </td>

      <td className="text-muted">
        {activity.url}
      </td>

    </tr>

  ))

)}
        </tbody>

      </table>

    </div>
  );
}

export default RecentActivity;