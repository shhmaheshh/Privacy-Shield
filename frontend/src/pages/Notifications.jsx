import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Notifications() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    const loadNotifications = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response = await API.get(
          "/tracking/notifications/",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        setNotifications(
          response.data
        );

      } catch (error) {
        console.log(error);
      }
    };

    loadNotifications();

  }, []);


  const markAsRead = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await API.post(
        "/tracking/mark-notifications-read/",
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert("Notifications marked as read");

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="d-flex justify-content-between">

          <h1>Notifications</h1>

          <button
            className="btn btn-primary"
            onClick={markAsRead}
          >
            Mark All Read
          </button>

        </div>

        {notifications.length === 0 ? (

          <div className="card p-3 mt-3">
            <p>No notifications found</p>
          </div>

        ) : (

          notifications.map((n, index) => (

            <div
              key={index}
              className="card p-3 mt-3"
            >

              <h4>{n.title}</h4>

              <p>{n.message}</p>

            </div>

          ))

        )}

      </div>
    </>
  );
}

export default Notifications;