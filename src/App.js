import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import CompanyBanner from "./components/CompanyBanner";
import CompanyHeader from "./components/CompanyHeader";
import WidgetPanel from "./components/WidgetPanel";

function CompanyProfileEditor() {
  const [widgets, setWidgets] = useState([]);

  const handleAddWidget = () => {
    setWidgets([...widgets, { id: Date.now(), type: "basic" }]);
  };

  return (
    <div className="flex bg-blue-50 min-h-screen">
      <Sidebar />

      {/* Main Content */}
      <div className="p-4 max-w-5xl mx-auto w-full">
        <CompanyBanner />
        <CompanyHeader />
        <WidgetPanel widgets={widgets} handleAddWidget={handleAddWidget} />
      </div>
    </div>
  );
}

export default CompanyProfileEditor;
