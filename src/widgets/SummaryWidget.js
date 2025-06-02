import React from "react";
import PropTypes from "prop-types";

/**
 * EditableField component handles both display and edit modes for a field
 */
const EditableField = ({ label, value, type = "text", isEditing, onChange, className = "" }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  if (isEditing) {
    return (
      <input
        type={type}
        className={`border rounded px-2 py-1 w-full ${className}`}
        value={value}
        onChange={handleChange}
        placeholder={label}
      />
    );
  }

  if (type === "url") {
    return (
      <a 
        href={value} 
        className="text-blue-600 underline" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        {value}
      </a>
    );
  }

  return <div>{value}</div>;
};

EditableField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "url"]),
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

/**
 * SummaryField component represents a single field in the summary grid
 */
const SummaryField = ({ label, value, type = "text", isEditing, onChange, icon }) => (
  <>
    <div className="font-semibold text-gray-600">{label}</div>
    <div className="flex items-center gap-2">
      {icon && (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pink-400 text-white mr-2">
          {icon}
        </span>
      )}
      <EditableField
        label={label}
        value={value}
        type={type}
        isEditing={isEditing}
        onChange={onChange}
      />
    </div>
  </>
);

SummaryField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "url"]),
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.node,
};

/**
 * ActionButton component represents a call-to-action button
 */
const ActionButton = ({ url, label, isEditing, value, onChange }) => {
  if (isEditing) {
    return (
      <input
        type="url"
        className="flex-1 text-center border rounded px-2 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`${label} URL`}
      />
    );
  }

  return (
    <a 
      href={url} 
      className={`flex-1 text-center ${
        label === "Careers" ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
      } text-white font-semibold py-2 rounded-xl`}
    >
      {label}
    </a>
  );
};

ActionButton.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isEditing: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

/**
 * SummaryWidget component displays and manages company summary information
 */
const SummaryWidget = ({ data, editable, mode, editing, onChange }) => {
  const isEditing = editable && mode === "editor" && editing;

  const handleFieldChange = (field, value) => {
    if (onChange) {
      onChange({ ...data, [field]: value });
    }
  };

  const sectorIcon = (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
      <path fill="currentColor" d="M7 16a5 5 0 1 1 10 0v1a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-1Zm5-7a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm7 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/>
    </svg>
  );

  const summaryFields = [
    { label: "Location", field: "location", type: "text" },
    { label: "Website", field: "website", type: "url" },
    { label: "Sectors", field: "sector", type: "text", icon: sectorIcon },
    { label: "Industry", field: "industry", type: "text" },
    { label: "Full Time Employees", field: "employees", type: "text" },
    { label: "IPO Date", field: "ipoDate", type: "text" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Summary</h2>
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
          {summaryFields.map(({ label, field, type, icon }) => (
            <SummaryField
              key={field}
              label={label}
              value={data[field]}
              type={type}
              isEditing={isEditing}
              onChange={(value) => handleFieldChange(field, value)}
              icon={icon}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <ActionButton
          url={data.careersUrl}
          label="Careers"
          isEditing={isEditing}
          value={data.careersUrl}
          onChange={(value) => handleFieldChange("careersUrl", value)}
        />
        <ActionButton
          url={data.financialUrl}
          label="Financial Details"
          isEditing={isEditing}
          value={data.financialUrl}
          onChange={(value) => handleFieldChange("financialUrl", value)}
        />
      </div>
    </div>
  );
};

SummaryWidget.propTypes = {
  data: PropTypes.shape({
    location: PropTypes.string,
    website: PropTypes.string,
    sector: PropTypes.string,
    industry: PropTypes.string,
    employees: PropTypes.string,
    ipoDate: PropTypes.string,
    careersUrl: PropTypes.string,
    financialUrl: PropTypes.string,
  }).isRequired,
  editable: PropTypes.bool,
  mode: PropTypes.oneOf(["display", "editor"]),
  editing: PropTypes.bool,
  onChange: PropTypes.func,
};

export default SummaryWidget;