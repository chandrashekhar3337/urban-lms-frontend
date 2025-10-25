import { motion } from "framer-motion";
import { useState } from "react";
import API from "../api/leadService.js";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/api/v1/users/login", form);
      login(res.data.data.user);
      const role = res.data.data.user.role;
      if (role === "admin") navigate("/admin-dashboard");
      else navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-screen h-screen flex"
    >
      {/* LEFT SIDE - Login Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 p-10">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl w-full max-w-md p-10 text-center">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
            Lead Management System
          </h1>
          <p className="text-indigo-100 mt-2 text-sm">
            Login to access your dashboard
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="text-white text-sm mb-1 block text-left">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-white/30 bg-white/20 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm mb-1 block text-left">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-white/30 bg-white/20 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                required
              />
            </div>

            {error && (
              <p className="text-red-300 text-sm text-center mt-2 bg-red-500/20 py-2 rounded-md">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-lg shadow-lg transition-all duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-black"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-indigo-100 mt-6 text-sm">
            New user?{" "}
            <Link
              to="/register"
              className="text-white font-semibold hover:underline hover:text-indigo-200"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Illustration / Background */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="relative text-center text-white px-10">
          <h2 className="text-5xl font-extrabold drop-shadow-lg mb-4">
            Welcome Back 👋
          </h2>
          <p className="text-lg text-indigo-100">
            Manage your leads efficiently and stay on top of your sales goals.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
