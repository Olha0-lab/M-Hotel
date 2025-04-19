import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import RoomCard from "../components/RoomCard";

// Static demo images – replace or extend with dynamic URLs as needed
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";

const images = [img1, img2, img3, img4];

const Gallery = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get("/api/rooms", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRooms(data);
    } catch (err) {
      console.error("Failed to load rooms", err);
    }
  };

  const handleBook = (roomId) => {
    // pass the roomId into Dashboard via state or URL
    navigate("/dashboard", { state: { roomId } });
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Our Rooms</h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rooms.map((room, idx) => (
            <RoomCard
              key={room._id}
              room={room}
              image={images[idx % images.length]}
              onBook={handleBook}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
