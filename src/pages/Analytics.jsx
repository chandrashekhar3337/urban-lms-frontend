import React, { useEffect, useState } from "react";
import { fetchLeads } from "../api/leadService";
import { Bar } from "react-chartjs-2";
import StatCard from "../components/StatCard";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Analytics() {
  const [leads, setLeads] = useState([]);
  useEffect(()=> {
    fetchLeads().then(r=> setLeads(r.data.leads || []));
  }, []);

  const counts = {
    Website: leads.filter(l=>l.source==="Website").length,
    Meta: leads.filter(l=>l.source==="Meta").length,
    Google: leads.filter(l=>l.source==="Google").length
  };

  const data = {
    labels: ["Website","Meta","Google"],
    datasets: [
      {
        label: "Leads Count",
        data: [counts.Website, counts.Meta, counts.Google],
        borderWidth: 1,
        backgroundColor: ["#60a5fa","#34d399","#f97316"]
      }
    ]
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard title="Website" value={counts.Website} />
        <StatCard title="Meta" value={counts.Meta} />
        <StatCard title="Google" value={counts.Google} />
      </div>

      <div className="card">
        <Bar data={data} />
      </div>
    </div>
  );
}
