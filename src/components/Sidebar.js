import React from "react";

const Sidebar = () => (
  <div className="w-16 min-h-screen bg-gray-100 border-r shadow-sm flex flex-col items-center py-4 space-y-6">
    {["🌲", "🔍", "📄", "📢", "🧠"].map((icon, i) => (
      <button key={i} className="text-2xl hover:scale-110 transition-transform">
        {icon}
      </button>
    ))}
  </div>
);

export default Sidebar;
