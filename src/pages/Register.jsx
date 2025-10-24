import { motion } from "framer-motion";
import { useState } from "react";
import API from "../api/leadService.js";
import { Link, useNavigate } from "react-router-dom";
import registerImg from "../assets/benjamin-lehman-eraSceLbwFo-unsplash (1).jpg";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/v1/users/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-screen flex">
      <motion.div
        className="w-1/2 hidden md:flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <img src={registerImg} alt="Register" className="w-4/5 rounded-2xl shadow-2xl" />
      </motion.div>

      <motion.div
        className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-50"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <h2 className="text-3xl font-bold mb-4 text-blue-600">Lead Management Registration</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 w-4/5 md:w-3/5">
          <input name="username" placeholder="Username" className="input" onChange={handleChange} />
          <input name="email" placeholder="Email" className="input" onChange={handleChange} />
          <input name="phone" placeholder="Phone" className="input" onChange={handleChange} />
          <input name="password" placeholder="Password" type="password" className="input" onChange={handleChange} />

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-black py-2 rounded-lg transition-all duration-300">
            Register
          </button>
          <p className="text-center mt-4 text-gray-500">
            Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
