import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function Navbar({
  darkMode,
  setDarkMode
}) {

  const [count, setCount] = useState(0);

  const loadCount = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await API.get(
        "/tracking/notification-count/",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setCount(
        response.data.unread_notifications
      );

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    loadCount();

    const interval =
      setInterval(loadCount, 5000);

    return () =>
      clearInterval(interval);

  }, []);
    const handleLogout = () => {

      localStorage.clear();

      window.location.href = "/";
    };

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">

      <div className="container">

        <Link
  className="navbar-brand fw-bold fs-4"
  to="/"
>
  🛡 Privacy Shield
</Link>

        <div className="navbar-nav d-flex align-items-center">

          <Link
            className="nav-link"
            to="/dashboard"
          >
            Dashboard
          </Link>

          <Link
            className="nav-link fw-semibold"
            to="/analytics"
          >
            Analytics
          </Link>

          <Link
            className="nav-link fw-semibold"
            to="/scanner"
          >
            Scanner
          </Link>

          <Link
            className="nav-link fw-semibold"
            to="/command-center"
          >
            Command Center
          </Link>

          <Link
            className="nav-link fw-semibold"
            to="/notifications"
          >
            🔔 Notifications
<span className="badge bg-danger ms-2">
  {count}
</span>
          </Link>
           <Link
             className="nav-link fw-semibold"
              to="/history"
          >
            History
          </Link>

          <button
            className="btn btn-outline-light rounded-pill ms-3"
            onClick={() => {

              const newTheme =
                !darkMode;

              setDarkMode(newTheme);

              localStorage.setItem(
                "darkMode",
                newTheme
              );

            }}
          >
            {darkMode
              ? "☀ Light"
              : "🌙 Dark"}
          </button>
          <button
            className="btn btn-danger rounded-pill ms-2"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;