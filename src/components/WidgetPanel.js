import React from "react";

const WidgetPanel = ({ widgets, handleAddWidget }) => (
  <div className="bg-gray-50 border-dashed border-2 border-gray-300 rounded-2xl p-8 min-h-[300px] flex flex-col items-center justify-center mb-6">
    {widgets.length === 0 ? (
      <p className="text-gray-400">No widgets yet. Add one to get started!</p>
    ) : (
      widgets.map((widget) => (
        <div key={widget.id} className="bg-white w-full shadow rounded-xl p-4 mb-4">
          <p className="text-sm font-semibold text-gray-700">Basic Widget</p>
          <p className="text-gray-500">This is a placeholder widget.</p>
        </div>
      ))
    )}
    <button onClick={handleAddWidget} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
      + Add Widget
    </button>
  </div>
);

export default WidgetPanel;
