// src/components/NotificationBell.jsx
import React, { useEffect, useState } from "react";
import { getNotifications, markAsRead } from "../api/notificationAPI";

const NotificationBell = ({ token }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (token) {
      getNotifications(token).then(setNotifications);
    }
  }, [token]);

  const handleMarkAsRead = async (id) => {
    await markAsRead(id, token);
    const updated = notifications.map((n) =>
      n._id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
  };

  return (
    <div className="relative">
      <button className="text-white relative">
        🔔
        {notifications.filter((n) => !n.read).length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1">
            {notifications.filter((n) => !n.read).length}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-80 bg-white shadow-md rounded-md p-3 z-10">
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-500">No notifications</p>
        ) : (
          notifications.map((note) => (
            <div
              key={note._id}
              className={`mb-2 p-2 rounded ${
                note.read ? "bg-gray-100" : "bg-blue-100"
              }`}
              onClick={() => handleMarkAsRead(note._id)}
            >
              <strong>{note.title}</strong>
              <p className="text-sm">{note.message}</p>
              <p className="text-xs text-gray-400">
                {new Date(note.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationBell;
