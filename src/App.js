import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import CompanyProfileSection from "./components/CompanyProfileSection";

function CompanyProfileEditor() {
  // You can initialize these with your real data
  const [widgets, setWidgets] = useState([]);
  const [bannerData, setBannerData] = useState({});
  const [headerData, setHeaderData] = useState({});

  return (
    <div className="flex bg-blue-50 min-h-screen">
      <Sidebar />
      <div className="p-4 max-w-5xl mx-auto w-full">
        <CompanyProfileSection
          mode="editor"
          bannerData={bannerData}
          headerData={headerData}
          widgets={widgets}
        />
      </div>
    </div>
  );
}

export default CompanyProfileEditor;
