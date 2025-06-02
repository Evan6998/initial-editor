import React, { useRef, useState } from "react";

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

  return (
    <div className="relative rounded-2xl overflow-hidden shadow mb-6">
      <img
        src={imageUrl}
        alt="Company Banner"
        className="w-full h-64 object-cover"
      />
      {mode === "editor" && !isEditing && (
        <button
          className="absolute top-4 right-4 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100"
          onClick={onEdit}
          disabled={disableEdit}
          title={disableEdit ? "Finish editing other section first" : "Edit Banner"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z" />
          </svg>
        </button>
      )}
      {isEditing && (
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
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
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
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
};

export default CompanyBanner;
