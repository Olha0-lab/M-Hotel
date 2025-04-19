import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();
  const [unread, setUnread] = useState(0);

  // Fetch unread count on mount
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const { data } = await axios.get("/api/notifications/unread-count", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUnread(data.count);
      } catch {}
    };
    fetchCount();
    // Optionally poll every minute:
    const interval = setInterval(fetchCount, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClasses = ({ isActive }) =>
    `block px-4 py-3 rounded-lg mb-2 hover:bg-gray-200 transition ${
      isActive ? "bg-gray-200 font-semibold" : ""
    }`;

  return (
    <div className="w-64 bg-white h-screen shadow-lg p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">M‑Hotel</h2>
      <nav className="flex-1">
        <NavLink to="/dashboard" className={linkClasses}>
          Home
        </NavLink>
        <NavLink to="/about" className={linkClasses}>
          About
        </NavLink>
        <NavLink to="/contact" className={linkClasses}>
          Contact
        </NavLink>
        <NavLink to="/gallery" className={linkClasses}>
          Gallery
        </NavLink>
        <NavLink to="/notifications" className={linkClasses}>
          Notifications
          {unread > 0 && (
            <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
              {unread}
            </span>
          )}
        </NavLink>
      </nav>
      <button
        onClick={handleLogout}
        className="mt-auto px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
