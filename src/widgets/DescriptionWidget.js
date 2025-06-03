import React from "react";
import PropTypes from "prop-types";

const socialIcons = [
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="3" y="17" width="18" height="4" rx="2" fill="#3b82f6"/><rect x="3" y="3" width="18" height="12" rx="2" fill="#3b82f6"/></svg>
    ),
    label: "Shop"
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#2563eb"/><polygon points="10,8 16,12 10,16" fill="#fff"/></svg>
    ),
    label: "YouTube"
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#1da1f2"/><path d="M8 15c6 0 9-5 9-9v-.4A6.5 6.5 0 0 0 19 4.5a6.3 6.3 0 0 1-1.9.5A3.3 3.3 0 0 0 18.5 3a6.6 6.6 0 0 1-2.1.8A3.3 3.3 0 0 0 6.5 7.5c0 .3 0 .6.1.9A9.3 9.3 0 0 1 3 4.5s-4 9 5 13a9.6 9.6 0 0 1-5.5 1.5c9 5.5 20 0 20-11.5 0-.2 0-.4 0-.6A7.2 7.2 0 0 0 21 3.5z" fill="#fff"/></svg>
    ),
    label: "Twitter"
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#3b5998"/><rect x="10" y="8" width="4" height="8" fill="#fff"/><rect x="8" y="12" width="8" height="2" fill="#fff"/></svg>
    ),
    label: "Facebook"
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#e60023"/><circle cx="12" cy="12" r="5" fill="#fff"/></svg>
    ),
    label: "Pinterest"
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#2563eb"/><circle cx="12" cy="12" r="5" fill="#fff"/></svg>
    ),
    label: "Instagram"
  }
];

const DescriptionWidget = ({ data, editable, mode, editing, onChange }) => {
  const isEditing = editable && mode === "editor" && editing;

  const handleChange = (e) => {
    if (onChange) {
      onChange({ ...data, description: e.target.value });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 w-full">
      <h2 className="text-3xl font-bold mb-4">Description</h2>
      {isEditing ? (
        <textarea
          className="w-full min-h-[120px] border rounded-xl p-3 text-lg mb-4"
          value={data.description}
          onChange={handleChange}
        />
      ) : (
        <div className="text-lg text-gray-700 mb-6 whitespace-pre-line">{data.description}</div>
      )}
      <div className="flex gap-4 mt-4">
        {socialIcons.map((icon, i) => (
          <span key={i} className="text-2xl text-blue-500 cursor-pointer hover:scale-110 transition-transform" title={icon.label}>
            {icon.icon}
          </span>
        ))}
      </div>
    </div>
  );
};

DescriptionWidget.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string.isRequired,
  }).isRequired,
  editable: PropTypes.bool,
  mode: PropTypes.oneOf(["display", "editor"]),
  editing: PropTypes.bool,
  onChange: PropTypes.func,
};

export default DescriptionWidget; 