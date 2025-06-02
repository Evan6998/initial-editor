import React from "react";

const CompanyBanner = () => (
  <div className="relative rounded-2xl overflow-hidden shadow mb-6">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Aerial_view_of_Apple_Park.jpg/2560px-Aerial_view_of_Apple_Park.jpg"
      alt="Company Banner"
      className="w-full h-64 object-cover"
    />
    <button className="absolute top-4 right-4 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 11l6 6M13.414 7.414l-6 6M3 21h6v-6" />
      </svg>
    </button>
  </div>
);

export default CompanyBanner;
