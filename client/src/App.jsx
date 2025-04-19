import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import Gallery from "./pages/Gallery";
import Payment from "./pages/Payment";
import Notifications from "./pages/Notifications";
import { isAuthenticated } from "./context/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (

    <Routes>
      <Route path="/" element={isAuthenticated() ? <Landing /> : <Navigate to="/login" />} />
      <Route path="/login" element={isAuthenticated() ? <Login /> : <Navigate to="/login" />} />
      <Route path="/register" element={isAuthenticated() ? <Register /> : <Navigate to="/login" />} />
      <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/gallery" element={isAuthenticated() ? <Gallery /> : <Navigate to="/login" />} />
      <Route path="/admin" element={isAuthenticated() ? <AdminPanel /> : <Navigate to="/login" />} />
      <Route path="/payment" element={isAuthenticated() ? <Payment /> : <Navigate to="/login" />} />
      <Route path="/notifications" element={ isAuthenticated() ? <Notifications /> : <Navigate to="/login" />} />
      <ToastContainer />
    </Routes>
  );
}

export default App;
