import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const AdminPanel = () => {
  const [tab, setTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newRoom, setNewRoom] = useState({ roomNumber: "", type: "", pricePerHour: "" });
  const token = localStorage.getItem("token");

  const headers = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (token) {
      fetchUsers();
      fetchRooms();
      fetchBookings();
    }
  }, [token]);

  // Fetchers
  const fetchUsers = async () => {
    const { data } = await axios.get("/api/users", headers);
    setUsers(data);
  };
  const fetchRooms = async () => {
    const { data } = await axios.get("/api/rooms", headers);
    setRooms(data);
  };
  const fetchBookings = async () => {
    const { data } = await axios.get("/api/bookings", headers);
    setBookings(data);
  };

  // User actions
  const changeRole = async (id, role) => {
    await axios.put(`/api/users/${id}/role`, { role }, headers);
    fetchUsers();
  };
  const removeUser = async (id) => {
    await axios.delete(`/api/users/${id}`, headers);
    fetchUsers();
  };

  // Room actions
  const handleNewRoomChange = (e) =>
    setNewRoom({ ...newRoom, [e.target.name]: e.target.value });
  const addRoom = async (e) => {
    e.preventDefault();
    await axios.post("/api/rooms", newRoom, headers);
    setNewRoom({ roomNumber: "", type: "", pricePerHour: "" });
    fetchRooms();
  };
  const removeRoom = async (id) => {
    await axios.delete(`/api/rooms/${id}`, headers);
    fetchRooms();
  };

  // Booking actions
  const markPaid = async (id) => {
    await axios.patch(`/api/bookings/${id}/pay`, {}, headers);
    fetchBookings();
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          {["users","rooms","bookings"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg ${
                tab===t ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Users Tab */}
        {tab === "users" && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">All Users</h2>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="pb-2">Username</th>
                  <th className="pb-2">Email</th>
                  <th className="pb-2">Role</th>
                  <th className="pb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-t">
                    <td className="py-2">{u.username}</td>
                    <td className="py-2">{u.email}</td>
                    <td className="py-2">
                      <select
                        value={u.role}
                        onChange={(e) => changeRole(u._id, e.target.value)}
                        className="border rounded px-2"
                      >
                        <option value="guest">Guest</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="py-2">
                      <button
                        onClick={() => removeUser(u._id)}
                        className="px-2 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Rooms Tab */}
        {tab === "rooms" && (
          <div className="space-y-6">
            {/* Add Room */}
            <form
              onSubmit={addRoom}
              className="bg-white p-6 rounded-xl shadow-lg space-y-4"
            >
              <h2 className="text-xl font-bold">Add New Room</h2>
              {["roomNumber","type","pricePerHour"].map((field) => (
                <div key={field}>
                  <label className="block mb-1 capitalize">{field}</label>
                  <input
                    name={field}
                    value={newRoom[field]}
                    onChange={handleNewRoomChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
              ))}
              <button className="px-4 py-2 bg-green-600 text-white rounded">
                Create
              </button>
            </form>

            {/* Room List */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold mb-4">Existing Rooms</h2>
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="pb-2">#</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Price/hr</th>
                    <th className="pb-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((r) => (
                    <tr key={r._id} className="border-t">
                      <td className="py-2">{r.roomNumber}</td>
                      <td className="py-2">{r.type}</td>
                      <td className="py-2">${r.pricePerHour}</td>
                      <td className="py-2">
                        <button
                          onClick={() => removeRoom(r._id)}
                          className="px-2 py-1 bg-red-500 text-white rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {tab === "bookings" && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">All Bookings</h2>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="pb-2">User</th>
                  <th className="pb-2">Room</th>
                  <th className="pb-2">Check‑In</th>
                  <th className="pb-2">Check‑Out</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="border-t">
                    <td className="py-2">{b.userId.username}</td>
                    <td className="py-2">{b.roomId.roomNumber}</td>
                    <td className="py-2">
                      {new Date(b.checkIn).toLocaleString()}
                    </td>
                    <td className="py-2">
                      {new Date(b.checkOut).toLocaleString()}
                    </td>
                    <td className="py-2">{b.paymentStatus}</td>
                    <td className="py-2">
                      {b.paymentStatus === "pending" && (
                        <button
                          onClick={() => markPaid(b._id)}
                          className="px-2 py-1 bg-green-500 text-white rounded"
                        >
                          Mark Paid
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
