import { useEffect, useState } from "react";
import API from "../services/api";

function LiveFeed() {

  const [feed, setFeed] = useState([]);

  const loadFeed = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await API.get(
        "/tracking/live-feed/",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setFeed(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  useEffect(() => {

    loadFeed();

    const interval =
      setInterval(loadFeed, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  return (

  <div className="card shadow border-0 p-4 mt-4">

    <h3 className="mb-4">
      🔴 Live Tracker Feed
    </h3>

    {feed.length === 0 ? (

      <div className="text-center text-muted">
        No trackers detected yet
      </div>

    ) : (

      feed.map((item, index) => (

        <div
          key={index}
          className="card shadow-sm border-0 mb-3"
        >

          <div className="card-body">

            <div className="d-flex justify-content-between align-items-center">

              <h5 className="mb-0">
                {item.tracker}
              </h5>

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

            </div>

            <p className="mt-2 mb-0 text-muted">
              Website: {item.website}
            </p>

          </div>

        </div>

      ))
    )}

  </div>
);
}
export default LiveFeed;