import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const Notifications = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const { data } = await axios.get("/api/notifications", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setNotes(data);
  };

  const markRead = async (id) => {
    await axios.patch(
      `/api/notifications/${id}/read`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Notifications</h1>
        <div className="space-y-4">
          {notes.length === 0 && (
            <p className="text-gray-600">No notifications.</p>
          )}
          {notes.map((n) => (
            <div
              key={n._id}
              className={`p-4 rounded-lg shadow ${
                n.read ? "bg-white" : "bg-blue-50 border-l-4 border-blue-400"
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="text-gray-800">{n.message}</p>
                {!n.read && (
                  <button
                    onClick={() => markRead(n._id)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Mark as read
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
