import { motion } from "framer-motion";
import { useState } from "react";
import API from "../api/leadService";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/v1/users/login", form);
      login(res.data.data.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <motion.div
      className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-indigo-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg w-4/5 md:w-1/3">
        <h2 className="text-3xl font-bold mb-4 text-center text-indigo-600">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            onChange={handleChange}
            required
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-all duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-gray-500">
          New user?{" "}
          <Link to="/register" className="text-indigo-600">
            Register
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
