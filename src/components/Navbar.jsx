import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BarChart2, Plus } from "lucide-react";

export default function Navbar() {
  const loc = useLocation();
  const navItem = (to, label, Icon) => (
    <Link to={to}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
        loc.pathname === to ? "bg-accent/10 text-accent" : "text-slate-700 hover:bg-slate-100"
      }`}
    >
     {Icon && <Icon size={16} />}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-accent font-bold">Urban <span className="text-primary">LMS</span></div>
          <nav className="flex items-center gap-2">
            {navItem("/dashboard", "Dashboard", Home)}
            {navItem("/analytics", "Analytics", BarChart2)}
            {navItem("/add", "Add Lead", Plus)}
          </nav>
        </div>
        <div className="text-sm text-slate-600">Demo • {new Date().toLocaleDateString()}</div>
      </div>
    </header>
  );
}
