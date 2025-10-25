import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchLeadsByUser } from "../api/leadService";
import StatCard from "../components/StatCard";
import LeadTable from "../components/LeadTable";
import AddLeadForm from "../components/AddLeadForm";

export default function UserDashboard({ user }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🧠 If user not found (ex: refresh or logout)
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-700 text-white text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="p-10 rounded-3xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/30 max-w-md"
        >
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-3xl font-bold mb-3">No User Found</h2>
          <p className="text-indigo-200 text-lg">
            Please login again to access your dashboard.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="mt-6 px-6 py-2 bg-yellow-400 text-black font-semibold rounded-xl shadow-lg hover:bg-yellow-500 transition"
          >
            🔑 Go to Login
          </button>
        </motion.div>
      </div>
    );
  }

  // ✅ Load user leads from backend
  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchLeadsByUser(user._id);
      setLeads(res.data.leads || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load your leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) load();
  }, [user]);

  // ✅ Calculate lead counts
  const counts = {
    total: leads.length,
    website: leads.filter((l) => l.source === "Website").length,
    meta: leads.filter((l) => l.source === "Meta").length,
    google: leads.filter((l) => l.source === "Google").length,
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-blue-800 text-white p-8 overflow-x-hidden">
      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-10"
      >
        <h1 className="text-5xl font-extrabold mb-3 tracking-wide drop-shadow-xl">
          👋 Welcome, {user.username}
        </h1>
        <p className="text-indigo-200 text-lg">
          Manage your assigned leads and track your progress
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          {
            title: "Total Leads",
            value: counts.total,
            color: "from-pink-500 to-red-500",
          },
          {
            title: "Website Leads",
            value: counts.website,
            color: "from-blue-500 to-cyan-500",
          },
          {
            title: "Meta Leads",
            value: counts.meta,
            color: "from-purple-500 to-indigo-500",
          },
          {
            title: "Google Leads",
            value: counts.google,
            color: "from-green-500 to-emerald-500",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className={`bg-gradient-to-r ${card.color} p-6 rounded-2xl shadow-2xl border border-white/30 text-center`}
          >
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="text-4xl font-extrabold mt-2">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lead Table */}
        <div className="md:col-span-2 bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">📋 Your Assigned Leads</h2>
            <button
              onClick={load}
              className="px-5 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-500 transition font-semibold shadow-lg text-black"
            >
              🔄 Refresh
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-300">Loading...</div>
          ) : leads.length > 0 ? (
            <LeadTable leads={leads} />
          ) : (
            <div className="text-center py-8 text-gray-300 italic">
              No leads assigned yet.
            </div>
          )}
        </div>

        {/* Add Lead Form */}
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20">
          <h4 className="text-lg font-semibold text-yellow-300 mb-4 border-b border-white/30 pb-2">
            ➕ Add New Lead
          </h4>
          <AddLeadForm
            onSubmit={async (payload) => {
              await fetch(`https://urban-lms-backend.onrender.com//api/v1/leads/website`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              });
              await load();
            }}
          />
        </div>
      </div>
    </div>
  );
}
