import React from "react";
import { Link } from "react-router-dom";
import NotificationBell from "./NotificationBell";

const LandingHeader = ({ user, token }) => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-primary">M-Hotel</h1>

      <nav className="flex items-center gap-6">
        <Link to="/">Home</Link>
        <Link to="/rooms">Rooms</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        {user ? (
          <>
            <NotificationBell token={token} />
            <Link to="/logout" className="text-red-500">Logout</Link>
          </>
        ) : (
          <Link to="/login" className="bg-primary text-white px-4 py-1 rounded">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default LandingHeader;
