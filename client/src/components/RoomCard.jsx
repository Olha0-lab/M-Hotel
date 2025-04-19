import React from "react";

const RoomCard = ({ room, image, onBook }) => (
  <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
    <div className="h-48 overflow-hidden">
      <img
        src={image}
        alt={`Room ${room.roomNumber}`}
        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-1">Room {room.roomNumber}</h3>
      <p className="text-gray-600 capitalize mb-2">{room.type}</p>
      <p className="text-blue-600 font-bold mb-3">${room.pricePerHour}/hr</p>
      <span
        className={
          `inline-block px-2 py-1 rounded-full text-xs font-medium ` +
          (room.isAvailable
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800")
        }
      >
        {room.isAvailable ? "Available" : "Booked"}
      </span>
    </div>
    {room.isAvailable && (
      <button
        onClick={() => onBook(room._id)}
        className="m-4 w-[calc(100%-2rem)] py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Book Now
      </button>
    )}
  </div>
);

export default RoomCard;
