import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

/**
 * BannerImage component handles the display of the company banner image
 */
const BannerImage = ({ imageUrl }) => (
  <img
    src={imageUrl}
    alt="Company Banner"
    className="w-full h-64 object-cover"
  />
);

BannerImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

/**
 * EditButton component represents the edit button in display mode
 */
const EditButton = ({ onEdit, disabled }) => (
  <button
    className="absolute top-4 right-4 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100"
    onClick={onEdit}
    disabled={disabled}
    title={disabled ? "Finish editing other section first" : "Edit Banner"}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z" />
    </svg>
  </button>
);

EditButton.propTypes = {
  onEdit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

/**
 * BannerActions component handles the save and upload actions in edit mode
 */
const BannerActions = ({ onSave, onUploadClick, fileInputRef, onFileChange }) => (
  <div className="absolute top-4 right-4 flex gap-2">
    <button
      className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 shadow"
      onClick={onSave}
      title="Save Banner"
    >
      ✓
    </button>
    <button
      className="bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100"
      onClick={onUploadClick}
      title="Upload Banner Image"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 10l5-5 5 5M12 5v12" />
      </svg>
    </button>
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      className="hidden"
      onChange={onFileChange}
    />
  </div>
);

BannerActions.propTypes = {
  onSave: PropTypes.func.isRequired,
  onUploadClick: PropTypes.func.isRequired,
  fileInputRef: PropTypes.object.isRequired,
  onFileChange: PropTypes.func.isRequired,
};

/**
 * CompanyBanner component displays and manages the company banner image
 */
const CompanyBanner = ({
  data = {},
  mode = "display",
  editing = false,
  onEdit,
  onSave,
  onChange,
  disableEdit = false,
}) => {
  const [localImage, setLocalImage] = useState(null);
  const fileInputRef = useRef();
  const isEditing = mode === "editor" && editing;
  const imageUrl = localImage || data?.imageUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Aerial_view_of_Apple_Park.jpg/2560px-Aerial_view_of_Apple_Park.jpg";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setLocalImage(ev.target.result);
        if (onChange) {
          onChange({ ...data, imageUrl: ev.target.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow mb-6">
      <BannerImage imageUrl={imageUrl} />
      
      {mode === "editor" && !isEditing && (
        <EditButton onEdit={onEdit} disabled={disableEdit} />
      )}
      
      {isEditing && (
        <BannerActions
          onSave={onSave}
          onUploadClick={handleUploadClick}
          fileInputRef={fileInputRef}
          onFileChange={handleFileChange}
        />
      )}
    </div>
  );
};

CompanyBanner.propTypes = {
  data: PropTypes.shape({
    imageUrl: PropTypes.string,
  }),
  mode: PropTypes.oneOf(["display", "editor"]),
  editing: PropTypes.bool,
  onEdit: PropTypes.func,
  onSave: PropTypes.func,
  onChange: PropTypes.func,
  disableEdit: PropTypes.bool,
};

export default CompanyBanner;
