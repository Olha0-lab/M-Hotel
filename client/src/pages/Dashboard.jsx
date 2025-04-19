import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

// Import gallery images
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";

const gallery = [img1, img2, img3, img4];

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    roomId: "",
    checkIn: "",
    checkOut: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get("/api/rooms");
      setRooms(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBook = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      await axios.post("/api/bookings", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Booking successful! 🎉");
      setForm({ roomId: "", checkIn: "", checkOut: "" });
      fetchRooms();
    } catch (err) {
      setMessage(err.response?.data?.message || "Booking failed.");
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100 min-h-screen overflow-auto">
        {/* Top Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {gallery.map((src, idx) => (
            <div key={idx} className="h-40 rounded-lg overflow-hidden shadow-lg">
              <img
                src={src}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-full object-cover transform hover:scale-105 transition"
              />
            </div>
          ))}
        </div>

        {/* Booking Form */}
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Book Your Room
          </h1>
          <form onSubmit={handleBook} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Select Room</label>
              <select
                name="roomId"
                value={form.roomId}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              >
                <option value="">-- Choose a room --</option>
                {rooms.map((room) => (
                  <option key={room._id} value={room._id}>
                    Room {room.roomNumber} — $
                    {room.pricePerHour}/hr
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">Check-In</label>
              <input
                type="datetime-local"
                name="checkIn"
                value={form.checkIn}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Check-Out</label>
              <input
                type="datetime-local"
                name="checkOut"
                value={form.checkOut}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Book Room
            </button>

            {message && (
              <div
                className={`mt-3 text-center font-semibold ${
                  message.includes("failed")
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
