import React from "react";
import { Link, Outlet } from "react-router-dom";
import NotificationBell from "./NotificationBell";

const AdminLayout = ({ token }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white p-5">
        <h1 className="text-xl font-bold mb-6">M-Hotel Admin</h1>
        <nav className="flex flex-col gap-3">
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/rooms">Manage Rooms</Link>
          <Link to="/admin/bookings">Bookings</Link>
          <Link to="/admin/notifications">Notifications</Link>
          <Link to="/logout">Logout</Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 bg-gray-50">
        {/* Header with Bell */}
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <NotificationBell token={token} />
        </header>

        {/* Content */}
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
