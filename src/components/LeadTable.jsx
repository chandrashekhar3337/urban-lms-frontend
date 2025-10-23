import React, { useMemo, useState } from "react";

export default function LeadTable({ leads = [] }) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return leads.filter(l => {
      if (filter !== "All" && l.source !== filter) return false;
      if (query && !(`${l.name} ${l.email} ${l.phone} ${l.service}`.toLowerCase().includes(query.toLowerCase()))) return false;
      return true;
    }).sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt));
  }, [leads, filter, query]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="flex gap-2">
          {["All","Website","Meta","Google"].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1 rounded-md ${filter===s ? "bg-accent/10 text-accent" : "bg-white hover:bg-slate-100"}`}>
              {s}
            </button>
          ))}
        </div>

        <div className="flex gap-2 items-center">
          <input placeholder="Search name/email/phone/service" value={query} onChange={(e)=>setQuery(e.target.value)}
            className="input" />
          <div className="text-sm text-slate-500">{filtered.length} results</div>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Source</th>
              <th className="p-3 text-left">Campaign / Keyword</th>
              <th className="p-3 text-left">Received</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l._id} className="border-t last:border-b">
                <td className="p-3">
                  <div className="font-medium">{l.name}</div>
                  <div className="text-xs text-slate-500">{l.email}</div>
                </td>
                <td className="p-3">{l.phone}</td>
                <td className="p-3">{l.service}</td>
                <td className="p-3">{l.source}</td>
                <td className="p-3">{l.campaignName || l.keyword || "-"}</td>
                <td className="p-3">{new Date(l.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
