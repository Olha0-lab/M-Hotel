import axios from "axios";

const API_URL = "/api/notifications";

// Fetch notifications
export const getNotifications = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(API_URL, config);
  return res.data;
};

// Mark as read
export const markAsRead = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.patch(`${API_URL}/${id}/read`, {}, config);
  return res.data;
};
