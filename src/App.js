import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import CompanyProfileSection from "./components/CompanyProfileSection";

function CompanyProfileEditor() {

  return (
    <div className="flex bg-blue-50 min-h-screen">
      <Sidebar />
      <div className="p-4 max-w-5xl mx-auto w-full">
        <CompanyProfileSection
          mode="editor"
        />
      </div>
    </div>
  );
}

export default CompanyProfileEditor;
