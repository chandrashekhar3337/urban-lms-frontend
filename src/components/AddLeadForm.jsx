import React, { useState } from "react";

export default function AddLeadForm({ onSubmit, initial = {} }) {
  const [form, setForm] = useState({
    name: initial.name || "",
    email: initial.email || "",
    phone: initial.phone || "",
    service: initial.service || "",
    source: initial.source || "Website",
  });

  const handle = (e) => setForm(s => ({ ...s, [e.target.name]: e.target.value }));

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input name="name" value={form.name} onChange={handle} placeholder="Full Name" required
          className="input" />
        <input name="email" value={form.email} onChange={handle} placeholder="Email" required
          className="input" />
        <input name="phone" value={form.phone} onChange={handle} placeholder="Phone" required
          className="input" />
        <input name="service" value={form.service} onChange={handle} placeholder="Service (e.g. Car Rental)"
          className="input" />
        <select name="source" value={form.source} onChange={handle} className="input">
          <option value="Website">Website</option>
          <option value="Meta">Meta</option>
          <option value="Google">Google</option>
        </select>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="px-4 py-2 bg-accent text-black rounded-lg">Add Lead</button>
        <button type="reset" onClick={() => setForm({ name: "", email: "", phone: "", service: "", source: "Website" })}
          className="px-4 py-2 border rounded-lg">Reset</button>
      </div>
    </form>
  );
}
