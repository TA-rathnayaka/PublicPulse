import React from "react";

const InstituteCard = ({ name, admin, image }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg text-white">
      <img src={image} alt={name} className="w-full h-32 object-cover rounded-md" />
      <h3 className="mt-3 text-lg font-bold">{name}</h3>
      <p className="text-sm text-gray-300">Admin: {admin}</p>
      <button className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
        View Details
      </button>
    </div>
  );
};

export default InstituteCard;
