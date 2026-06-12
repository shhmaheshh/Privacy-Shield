import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function History() {

  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");

  useEffect(() => {

  const loadHistory = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await API.get(
        "/tracking/recent-activity/",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setHistory(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  loadHistory();

  const interval =
    setInterval(loadHistory, 5000);

  return () =>
    clearInterval(interval);

}, []);

  const filteredHistory =
    history.filter(item => {

      const matchesSearch =
        item.tracker
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesRisk =
        riskFilter === "All"
          ? true
          : item.risk === riskFilter;

      return (
        matchesSearch &&
        matchesRisk
      );
    });

  return (

    <>
      <Navbar />

      <div className="container mt-5">

        <h1 className="display-5 fw-bold">
  📚 Tracker History
</h1>

<p className="text-muted">
  View all detected trackers and risk activity.
</p>

        <div className="row mt-4">

          <div className="col-md-6">

            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Search tracker..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <div className="col-md-3">

            <select
              className="form-control"
              value={riskFilter}
              onChange={(e) =>
                setRiskFilter(e.target.value)
              }
            >

              <option>
                All
              </option>

              <option>
                High
              </option>

              <option>
                Medium
              </option>

              <option>
                Low
              </option>

            </select>

          </div>

        </div>
        <div className="mt-3">

  <h5>
    Total Records:
    {" "}
    {filteredHistory.length}
  </h5>

</div>
        <div className="row mt-4">

  <div className="col-md-4">

    <div className="card shadow border-0 p-4 bg-primary text-white">

      <h5>Total Detections</h5>

      <h2 className="display-6 fw-bold">
        {history.length}
      </h2>

    </div>

  </div>

  <div className="col-md-4">

    <div className="card shadow border-0 p-4 bg-danger text-white">

      <h5>High Risk</h5>

      <h2 className="display-6 fw-bold">

        {
          history.filter(
            item =>
              item.risk === "High"
          ).length
        }

      </h2>

    </div>

  </div>

  <div className="col-md-4">

    <div className="card shadow border-0 p-4 bg-warning">

      <h5>Medium Risk</h5>

      <h2 className="display-6 fw-bold">

        {
          history.filter(
            item =>
              item.risk === "Medium"
          ).length
        }

      </h2>

    </div>

  </div>

</div>

        <div className="card shadow border-0 mt-4">

  <div className="card-body">

    <table className="table table-hover align-middle">

          <thead className="table-dark">

            <tr>

              <th>Tracker</th>
              <th>Risk</th>
              <th>Website</th>
              <th>Time</th>

            </tr>

          </thead>

          <tbody>

  {filteredHistory.length === 0 ? (

    <tr>

      <td
        colSpan="4"
        className="text-center text-muted"
      >
        No tracker history found
      </td>

    </tr>

  ) : (

    filteredHistory.map((item, index) => (

      <tr key={index}>

        <td>
          {item.tracker}
        </td>

        <td>

          <span
            className={
              item.risk === "High"
                ? "badge bg-danger"
                : item.risk === "Medium"
                ? "badge bg-warning text-dark"
                : "badge bg-success"
            }
          >
            {item.risk}
          </span>

        </td>

        <td className="text-muted">
          {item.url}
        </td>

        <td>
          {new Date(
            item.time
          ).toLocaleString()}
        </td>

      </tr>

    ))

  )}

</tbody>
        </table>
          </div>

</div>

      </div>

    </>
  );
}

export default History;