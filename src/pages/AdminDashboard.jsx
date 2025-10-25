import React, { useEffect, useState } from "react";
import {
  fetchLeads,
  postMetaLead,
  postGoogleLead,
  fetchUsers,
  assignLeadToUser,
} from "../api/leadService";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [assignModal, setAssignModal] = useState({
    open: false,
    lead: null,
    userId: "",
  });

  const load = async () => {
    setLoading(true);
    try {
      const leadRes = await fetchLeads();
      setLeads(leadRes.data.leads || []);

      const userRes = await fetchUsers();
      setUsers(userRes.data.data || []);
    } catch (e) {
      console.error(e);
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAssign = async () => {
    if (!assignModal.userId) return alert("Please select a user first");
    try {
      await assignLeadToUser(assignModal.lead._id, assignModal.userId);
      setAssignModal({ open: false, lead: null, userId: "" });
      await load();
    } catch (e) {
      console.error(e);
      alert("Assignment failed");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-blue-800 text-white px-10 py-8 overflow-x-hidden">
      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-10"
      >
        <h1 className="text-5xl font-extrabold mb-3 tracking-wide drop-shadow-xl">
          🧭 Admin Dashboard
        </h1>
        <p className="text-indigo-200 text-lg">
          Manage leads, assign users & monitor performance
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          {
            title: "Total Leads",
            value: leads.length,
            color: "from-pink-500 to-red-500",
          },
          {
            title: "Website Leads",
            value: leads.filter((l) => l.source === "Website").length,
            color: "from-blue-500 to-cyan-500",
          },
          {
            title: "Meta Leads",
            value: leads.filter((l) => l.source === "Meta").length,
            color: "from-purple-500 to-indigo-500",
          },
          {
            title: "Google Leads",
            value: leads.filter((l) => l.source === "Google").length,
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

      {/* Main Leads Table Section */}
      <div className="bg-white/15 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/30 w-full">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold">📋 All Leads</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => load()}
              className="px-5 py-2 rounded-xl bg-green-500 hover:bg-green-600 transition font-semibold shadow-lg text-black"
            >
              🔄 Refresh
            </button>
            <button
              onClick={() =>
                postMetaLead({ name: "Meta Sim", email: "meta@demo.com" }).then(
                  load
                )
              }
              className="px-5 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 transition font-semibold shadow-lg text-black"
            >
              💬 Meta Lead
            </button>
            <button
              onClick={() =>
                postGoogleLead({
                  name: "Google Sim",
                  email: "google@demo.com",
                }).then(load)
              }
              className="px-5 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 transition font-semibold shadow-lg text-black"
            >
              🔍 Google Lead
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl w-full mt-6">
          <table className="min-w-full border-collapse text-white">
            <thead className="bg-white/20 text-sm uppercase tracking-wide">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Source</th>
                <th className="p-3 text-left">Assigned To</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, idx) => (
                <motion.tr
                  key={lead._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-white/20 hover:bg-white/10 transition"
                >
                  <td className="p-3">{lead.name}</td>
                  <td className="p-3">{lead.email}</td>
                  <td className="p-3">{lead.source}</td>
                  <td className="p-3">
                    {lead.assignedTo?.username || (
                      <span className="text-gray-300 italic">Unassigned</span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {lead.assignedTo ? (
                      <span className="px-4 py-2 bg-green-400 text-black rounded-xl font-semibold shadow">
                        Assigned
                      </span>
                    ) : (
                      <button
                        onClick={() =>
                          setAssignModal({ open: true, lead, userId: "" })
                        }
                        className="px-4 py-2 bg-indigo-400 hover:bg-indigo-500 text-black font-semibold rounded-xl shadow-lg transition duration-200"
                      >
                        Assign
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Lead Modal */}
      {assignModal.open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white text-gray-800 rounded-3xl shadow-2xl w-96 p-6"
          >
            <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">
              Assign Lead
            </h2>
            <p className="text-gray-500 mb-4 text-center">
              {assignModal.lead?.name} ({assignModal.lead?.email})
            </p>
            <select
              className="w-full border border-gray-300 p-2 rounded-xl mb-5"
              value={assignModal.userId}
              onChange={(e) =>
                setAssignModal({ ...assignModal, userId: e.target.value })
              }
            >
              <option value="">-- Select User --</option>
              {users.length > 0 ? (
                users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.username} ({u.role})
                  </option>
                ))
              ) : (
                <option disabled>No users found</option>
              )}
            </select>
            <div className="flex justify-end gap-3">
              <button
                onClick={() =>
                  setAssignModal({ open: false, lead: null, userId: "" })
                }
                className="px-4 py-2 rounded-xl border border-gray-400 hover:bg-gray-100 text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                disabled={!assignModal.userId}
                className={`px-4 py-2 rounded-xl font-semibold text-black ${
                  assignModal.userId
                    ? "bg-blue-400 hover:bg-blue-500"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Assign
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
