import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import LiveFeed from "../components/LiveFeed";

function Dashboard({ darkMode, setDarkMode }) {

  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await API.get(
          "/tracking/privacy-dashboard/",
          {
            headers: {
              Authorization: `Bearer ${token}`
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
          setError("Unable to connect to backend");
        }
      }
    };

    fetchDashboard();

  }, []);

  if (error) {
    return (
      <>
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

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
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div className="container mt-5">
          <h3>Loading...</h3>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div
        className={
          darkMode
            ? "container mt-5 text-light"
            : "container mt-5"
        }
      >

        <h1 className="fw-bold mb-4">
  🛡 Privacy Dashboard
</h1>

        <div
  className={
    darkMode
      ? "card shadow border-0 p-4 mt-3 bg-secondary text-light"
      : "card shadow border-0 p-4 mt-3"
  }
>
          <h3 className="text-primary">
  Privacy Score
</h3>

<h1 className="display-3 fw-bold">
  {data.privacy_score}
</h1>

<h4 className="mt-3">
  {data.alert}
</h4>

<p className="text-muted">
  {data.message}
</p>
        </div>
        <LiveFeed />

      </div>
    </>
  );
}

export default Dashboard;