export default function LeadTable({ leads=[], onAssign }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Contact</th>
            <th className="p-3 text-left">Source</th>
            <th className="p-3 text-left">Assigned To</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {leads.map(l => (
            <tr key={l._id} className="border-t last:border-b">
              <td className="p-3">{l.name}</td>
              <td className="p-3">{l.phone}</td>
              <td className="p-3">{l.source}</td>
              <td className="p-3">{l.assignedToUser?.username || "-"}</td>
              <td className="p-3">
                <button className="px-2 py-1 text-white bg-blue-600 rounded" onClick={()=>onAssign?.(l)}>Assign</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
