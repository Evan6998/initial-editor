import React from "react";

const CompanyHeader = () => (
  <div className="bg-white rounded-2xl shadow p-6 mb-6">
    <div className="flex items-center space-x-4">
      <img
        src="https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?202110180743"
        alt="Company Logo"
        className="h-16 w-16 object-contain rounded-full"
      />
      <div>
        <h1 className="text-2xl font-bold">DICK'S Sporting Goods, Inc.</h1>
        <p className="text-gray-500">Ticker: DKS | $227.59</p>
      </div>
    </div>
  </div>
);

export default CompanyHeader;
