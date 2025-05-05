import { IoRemove } from "react-icons/io5";
import React from "react";
import Card from "components/card";
import { useNavigate } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";
import { useAuth } from "context/authContext";
import { usePolicy } from "context/PolicyContext";
import { useInstituteData } from "context/InstituteContext";

const PolicyCard = ({ id, extra = "" }) => {
  const navigate = useNavigate();
  const { instituteId } = useInstituteData();
  const { policyCache, handleDelete, getPolicyById } = usePolicy();
  
  // Get policy data from cache or fetch if not available
  const policy = policyCache[id] || {};
  const { imageUrl, title, author, type, createdDate } = policy;

  // Generate a color based on policy type
  const getTypeColor = (type = "") => {
    switch ((type || "").toLowerCase()) {
      case "hr":
        return "#4318FF"; // brand-500
      case "finance":
        return "#05CD99"; // green-500
      case "it":
        return "#7551FF"; // purple-500
      default:
        return "#718096"; // gray-500
    }
  };

  // Generate background color with lower opacity for policy "image"
  const getTypeBgColor = (type = "") => {
    switch ((type || "").toLowerCase()) {
      case "hr":
        return "bg-indigo-100";
      case "finance":
        return "bg-green-100";
      case "it":
        return "bg-purple-100";
      default:
        return "bg-gray-100";
    }
  };

  const handleCardClick = () => {
    navigate(`/admin/${instituteId}/policy/${id}`);
  };

  // If policy data is not yet in cache and not loaded, fetch it
  React.useEffect(() => {
    if (!policyCache[id]) {
      getPolicyById(id).catch(err => console.error("Failed to fetch policy:", err));
    }
  }, [id, policyCache, getPolicyById]);

  // If we have no data yet, show loading state
  if (!title) {
    return (
      <Card
        extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
      >
        <div className="h-48 w-full rounded-xl bg-gray-200 animate-pulse mb-3"></div>
        <div className="h-6 w-3/4 bg-gray-200 animate-pulse mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-200 animate-pulse mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="h-4 w-1/3 bg-gray-200 animate-pulse"></div>
          <div className="h-10 w-1/4 bg-gray-200 animate-pulse rounded-[20px]"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      onClick={handleCardClick}
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white cursor-pointer hover:shadow-lg transition-all ${extra}`}
    >
      {imageUrl ? (
        <div className="h-full w-full">
          <div className="relative w-full">
            {/* Render the image if imageUrl exists */}
            <img
              src={imageUrl}
              alt="Policy"
              className="mb-3 h-48 w-full rounded-xl object-cover"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(id);
              }}
              className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer"
            >
              <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50 dark:text-navy-900">
                <IoRemove />
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div className="h-full w-full">
          <div className="relative w-full">
            {/* Fallback policy type representation if no image */}
            <div 
              className={`mb-3 h-48 w-full rounded-xl flex items-center justify-center ${getTypeBgColor(type)}`}
            >
              <FaFileAlt size={64} color={getTypeColor(type)} />
              <div 
                className="absolute bottom-3 left-3 rounded-lg px-2 py-1 text-xs font-medium text-white"
                style={{ backgroundColor: getTypeColor(type) }}
              >
                {type || "General"}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(id);
              }}
              className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer"
            >
              <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50 dark:text-navy-900">
                <IoRemove />
              </div>
            </button>
          </div>
        </div>
      )}

      <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
        <div className="mb-2">
          <p className="text-lg font-bold text-navy-700 dark:text-white">
            {title}
          </p>
          <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
            By {author || "Unknown"}
          </p>
        </div>

        <div className="flex flex-row-reverse md:mt-2 lg:mt-0">
        </div>
      </div>

      <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
        <div className="flex">
          <p className="mb-2 text-sm font-bold text-brand-500 dark:text-white">
            Created Date: {createdDate || "N/A"}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/admin/${instituteId}/policy/${id}`);

          }}
          className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
        >
          View Policy
        </button>
      </div>
    </Card>
  );
};

export default PolicyCard;