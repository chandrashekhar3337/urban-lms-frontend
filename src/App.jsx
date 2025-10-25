import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/viewer-dashboard" element={<UserDashboard />} />
    </Routes>
  );
}
