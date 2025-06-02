import React, { useRef, useState } from "react";

const CompanyHeader = ({
  data = {},
  mode = "display",
  editing = false,
  onEdit,
  onSave,
  onChange,
  disableEdit = false,
}) => {
  const [localLogo, setLocalLogo] = useState(null);
  const fileInputRef = useRef();
  const isEditing = mode === "editor" && editing;
  const logoUrl = localLogo || data?.logoUrl || "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?202110180743";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setLocalLogo(ev.target.result);
        if (onChange) {
          onChange({ ...data, logoUrl: ev.target.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBrandNameChange = (e) => {
    if (onChange) {
      onChange({ ...data, brandName: e.target.value });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-6">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={logoUrl}
            alt="Company Logo"
            className="h-16 w-16 object-contain rounded-full"
          />
          {isEditing && (
            <button
              className="absolute bottom-0 right-0 bg-white bg-opacity-80 rounded-full p-1 shadow hover:bg-opacity-100"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              title="Upload Logo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 10l5-5 5 5M12 5v12" />
              </svg>
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div>
          {isEditing ? (
            <input
              type="text"
              className="text-2xl font-bold border rounded px-2 py-1 w-full mb-1"
              value={data.brandName || ""}
              onChange={handleBrandNameChange}
            />
          ) : (
            <h1 className="text-2xl font-bold">{data.brandName || "DICK'S Sporting Goods, Inc."}</h1>
          )}
          <p className="text-gray-500">Ticker: {data.ticker || "DKS"} | ${data.price || "227.59"}</p>
        </div>
        {mode === "editor" && !isEditing && (
          <button
            className="ml-4 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100"
            onClick={onEdit}
            disabled={disableEdit}
            title={disableEdit ? "Finish editing other section first" : "Edit Header"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z" />
            </svg>
          </button>
        )}
        {isEditing && (
          <button
            className="ml-4 bg-green-500 hover:bg-green-600 text-white rounded-full p-2 shadow"
            onClick={onSave}
            title="Save Header"
          >
            ✓
          </button>
        )}
      </div>
    </div>
  );
};

export default CompanyHeader;
