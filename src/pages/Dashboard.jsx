import React, { useEffect, useState } from "react";
import { fetchLeads, postMetaLead, postGoogleLead } from "../api/leadService";
import StatCard from "../components/StatCard";
import LeadTable from "../components/LeadTable.jsx";
import AddLeadForm from "../components/AddLeadForm";

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchLeads();
      setLeads(res.data.leads || []);
    } catch (e) {
      console.error(e);
      alert("Failed to load leads");
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const onAdd = async (payload) => {
    try {
      // website lead by default
      await fetch(`${import.meta.env.VITE_API_URL}/leads/website`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      await load();
    } catch (e) {
      console.error(e);
      alert("Add failed");
    }
  };

  // Quick demo triggers for simulated Meta/Google pushes
  const simulateMeta = async () => {
    await postMetaLead({ name: "Sim Meta", email: "m@demo.com" });
    await load();
  };
  const simulateGoogle = async () => {
    await postGoogleLead({ name: "Sim Google", email: "g@demo.com" });
    await load();
  };

  const counts = {
    total: leads.length,
    website: leads.filter(l=>l.source==="Website").length,
    meta: leads.filter(l=>l.source==="Meta").length,
    google: leads.filter(l=>l.source==="Google").length
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Leads" value={counts.total} />
        <StatCard title="Website" value={counts.website} />
        <StatCard title="Meta" value={counts.meta} />
        <StatCard title="Google" value={counts.google} />
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Leads</h3>
            <div className="flex gap-2">
              <button onClick={simulateMeta} className="px-3 py-1 border rounded">Simulate Meta</button>
              <button onClick={simulateGoogle} className="px-3 py-1 border rounded">Simulate Google</button>
              <button onClick={load} className="px-3 py-1 border rounded">Refresh</button>
            </div>
          </div>
          {loading ? <div>Loading...</div> : <LeadTable leads={leads} />}
        </div>

        <div className="card">
          <h4 className="font-semibold mb-3">Add Lead</h4>
          <AddLeadForm onSubmit={onAdd} />
        </div>
      </div>
    </div>
  );
}
