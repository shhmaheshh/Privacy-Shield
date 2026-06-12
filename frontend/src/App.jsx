import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import {
  useState,
  useEffect
} from "react";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Scanner from "./pages/Scanner";
import CommandCenter from "./pages/CommandCenter";
import Notifications from "./pages/Notifications";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import History from "./pages/History";

function App() {

  const [darkMode, setDarkMode] =
    useState(false);

  useEffect(() => {

    const savedTheme =
      localStorage.getItem("darkMode");

    if (savedTheme === "true") {
      setDarkMode(true);
    }

  }, []);

  return (

    <div
      className={
        darkMode
          ? "bg-dark text-light min-vh-100"
          : "bg-light text-dark min-vh-100"
      }
    >

      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={<Landing />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
              <Analytics
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
              </ProtectedRoute>
            }
          />

          <Route
            path="/scanner"
            element={
              <ProtectedRoute>
              <Scanner
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
              </ProtectedRoute>
            }
          />

          <Route
            path="/command-center"
            element={
              <ProtectedRoute>
              <CommandCenter
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
              <Notifications
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={<Register />}
         />
          <Route
            path="/history"
            element={<History />}
          />

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;