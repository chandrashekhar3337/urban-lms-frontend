export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="card flex flex-col">
      <div className="text-xs font-medium text-slate-400">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {subtitle && <div className="mt-2 text-sm text-slate-500">{subtitle}</div>}
    </div>
  );
}
