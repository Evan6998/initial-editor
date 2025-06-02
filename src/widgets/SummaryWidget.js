import React from "react";

const SummaryWidget = ({ data, editable, mode, editing, onChange }) => {
  const isEditing = editable && mode === "editor" && editing;

  const handleChange = (field, value) => {
    if (onChange) {
      onChange({ ...data, [field]: value });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Summary</h2>
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
          <div className="font-semibold text-gray-600">Location</div>
          <div>
            {isEditing ? (
              <input
                type="text"
                className="border rounded px-2 py-1 w-full"
                value={data.location}
                onChange={e => handleChange("location", e.target.value)}
              />
            ) : (
              data.location
            )}
          </div>
          <div className="font-semibold text-gray-600">Website</div>
          <div>
            {isEditing ? (
              <input
                type="url"
                className="border rounded px-2 py-1 w-full"
                value={data.website}
                onChange={e => handleChange("website", e.target.value)}
              />
            ) : (
              <a href={data.website} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{data.website}</a>
            )}
          </div>
          <div className="font-semibold text-gray-600">Sectors</div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pink-400 text-white mr-2">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M7 16a5 5 0 1 1 10 0v1a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-1Zm5-7a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm7 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/></svg>
            </span>
            {isEditing ? (
              <input
                type="text"
                className="border rounded px-2 py-1 w-full"
                value={data.sector}
                onChange={e => handleChange("sector", e.target.value)}
              />
            ) : (
              data.sector
            )}
          </div>
          <div className="font-semibold text-gray-600">Industry</div>
          <div>
            {isEditing ? (
              <input
                type="text"
                className="border rounded px-2 py-1 w-full"
                value={data.industry}
                onChange={e => handleChange("industry", e.target.value)}
              />
            ) : (
              data.industry
            )}
          </div>
          <div className="font-semibold text-gray-600">Full Time Employees</div>
          <div>
            {isEditing ? (
              <input
                type="text"
                className="border rounded px-2 py-1 w-full"
                value={data.employees}
                onChange={e => handleChange("employees", e.target.value)}
              />
            ) : (
              data.employees
            )}
          </div>
          <div className="font-semibold text-gray-600">IPO Date</div>
          <div>
            {isEditing ? (
              <input
                type="text"
                className="border rounded px-2 py-1 w-full"
                value={data.ipoDate}
                onChange={e => handleChange("ipoDate", e.target.value)}
              />
            ) : (
              data.ipoDate
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        {isEditing ? (
          <input
            type="url"
            className="flex-1 text-center border rounded px-2 py-2 mr-2"
            value={data.careersUrl}
            onChange={e => handleChange("careersUrl", e.target.value)}
            placeholder="Careers URL"
          />
        ) : (
          <a href={data.careersUrl} className="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl">Careers</a>
        )}
        {isEditing ? (
          <input
            type="url"
            className="flex-1 text-center border rounded px-2 py-2"
            value={data.financialUrl}
            onChange={e => handleChange("financialUrl", e.target.value)}
            placeholder="Financial Details URL"
          />
        ) : (
          <a href={data.financialUrl} className="flex-1 text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-xl">Financial Details</a>
        )}
      </div>
    </div>
  );
};

export default SummaryWidget; 