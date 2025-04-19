import NotificationBell from "./NotificationBell";

const NotificationWrapper = ({ token, position = "top-right" }) => {
  return (
    <div className={`absolute ${position === "top-right" ? "top-4 right-4" : "top-0 left-0"}`}>
      <NotificationBell token={token} />
    </div>
  );
};

export default NotificationWrapper;
