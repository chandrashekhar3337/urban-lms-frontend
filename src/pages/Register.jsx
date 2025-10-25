// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import API from "../api/leadService.js";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "admin",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await API.post("/api/v1/users/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen overflow-hidden">
      {/* Left Side Image */}
      <motion.div
        className="hidden md:flex md:w-1/2 h-screen items-center justify-center bg-black p-6"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src="https://urbancruise.in/delhi/wp-content/uploads/2025/08/ddd-11.webp"
          alt="Urban Cruise Delhi"
          className="w-full h-full object-contain rounded-xl shadow-lg"
        />
      </motion.div>

      {/* Right Side Form */}
      <motion.div
        className="w-full md:w-1/2 h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-indigo-700"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-11/12 sm:w-4/5 md:w-3/5 lg:w-1/2">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
            LMS Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="username"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
              onChange={handleChange}
              required
            />
            <input
              name="phone"
              placeholder="Phone"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
              onChange={handleChange}
              required
            />

            <select
              name="role"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring focus:ring-blue-200"
              onChange={handleChange}
              value={form.role}
            >
              <option value="admin">Admin</option>
              <option value="sales">Sales</option>
              <option value="viewer">Viewer</option>
            </select>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg font-semibold transition-all duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed text-black"
                  : "bg-blue-600 hover:bg-blue-700 text-black"
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="text-center mt-3 text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
