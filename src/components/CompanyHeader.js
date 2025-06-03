import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

/**
 * LogoUploader component handles the company logo display and upload functionality
 */
const LogoUploader = ({ logoUrl, onLogoChange, isEditing }) => {
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        onLogoChange(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative">
      <img
        src={logoUrl}
        alt="Company Logo"
        className="h-16 w-16 object-contain rounded-full"
      />
      {isEditing && (
        <button
          className="absolute bottom-0 right-0 bg-white bg-opacity-80 rounded-full p-1 shadow hover:bg-opacity-100"
          onClick={() => fileInputRef.current?.click()}
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
  );
};

LogoUploader.propTypes = {
  logoUrl: PropTypes.string.isRequired,
  onLogoChange: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

/**
 * CompanyInfo component displays and handles editing of company information
 */
const CompanyInfo = ({ data, isEditing, onBrandNameChange }) => {
  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          className="text-2xl font-bold border rounded px-2 py-1 w-full mb-1"
          value={data.brandName || ""}
          onChange={(e) => onBrandNameChange(e.target.value)}
        />
      ) : (
        <h1 className="text-2xl font-bold">{data.brandName || "DICK'S Sporting Goods, Inc."}</h1>
      )}
      <p className="text-gray-500">
        Ticker: {data.ticker || "DKS"} | ${data.price || "227.59"}
      </p>
    </div>
  );
};

CompanyInfo.propTypes = {
  data: PropTypes.shape({
    brandName: PropTypes.string,
    ticker: PropTypes.string,
    price: PropTypes.string,
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
  onBrandNameChange: PropTypes.func.isRequired,
};

/**
 * ActionButtons component handles the edit and save actions
 */
const ActionButtons = ({ isEditing, onEdit, onSave }) => {
  if (!isEditing && !onEdit) return null;

  return isEditing ? (
    <button
      className="ml-4 bg-green-500 hover:bg-green-600 text-white rounded-full p-2 shadow"
      onClick={onSave}
      title="Save Header"
    >
      ✓
    </button>
  ) : (
    <button
      className="ml-4 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100"
      onClick={onEdit}
      title="Edit Header"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z" />
      </svg>
    </button>
  );
};

ActionButtons.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onEdit: PropTypes.func,
  onSave: PropTypes.func,
};

/**
 * CompanyHeader component displays and manages company information
 * including logo, brand name, ticker, and price
 */
const CompanyHeader = ({
  data = {},
  mode = "display",
  editingSection,
  setEditingSection,
  onChange,
}) => {
  const [localLogo, setLocalLogo] = useState(null);
  const isEditing = mode === "editor" && editingSection === "header";
  const logoUrl = localLogo || data?.logoUrl || "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?202110180743";

  const handleLogoChange = (newLogoUrl) => {
    setLocalLogo(newLogoUrl);
    if (onChange) {
      onChange({ ...data, logoUrl: newLogoUrl });
    }
  };

  const handleBrandNameChange = (newBrandName) => {
    if (onChange) {
      onChange({ ...data, brandName: newBrandName });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-6">
      <div className="flex items-center space-x-4">
        <LogoUploader
          logoUrl={logoUrl}
          onLogoChange={handleLogoChange}
          isEditing={isEditing}
        />
        <CompanyInfo
          data={data}
          isEditing={isEditing}
          onBrandNameChange={handleBrandNameChange}
        />
        {mode === "editor" && !isEditing && editingSection === null && (
          <ActionButtons
            isEditing={false}
            onEdit={() => setEditingSection("header")}
          />
        )}
        {isEditing && (
          <ActionButtons
            isEditing={true}
            onSave={() => setEditingSection(null)}
          />
        )}
      </div>
    </div>
  );
};

CompanyHeader.propTypes = {
  data: PropTypes.shape({
    logoUrl: PropTypes.string,
    brandName: PropTypes.string,
    ticker: PropTypes.string,
    price: PropTypes.string,
  }),
  mode: PropTypes.oneOf(["display", "editor"]),
  editingSection: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  setEditingSection: PropTypes.func.isRequired,
  onChange: PropTypes.func,
};

export default CompanyHeader;
