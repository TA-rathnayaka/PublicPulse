import React from "react";
import Card from "components/card";
import { IoRemove } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context/authContext";
import { usePoll } from "context/PollContext";

const PollCard = ({ id, extra = "" }) => {
  const navigate = useNavigate();
  const { instituteId } = useAuth();
  const { polls, deletePoll } = usePoll();
  
  // Find the poll from context using id
  const poll = polls?.find(poll => poll.id === id) || {};
  const { imageUrl, title, options, createdAt, status } = poll;

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-500";
      case "completed": return "bg-blue-100 text-blue-500";
      case "draft": return "bg-gray-100 text-gray-500";
      default: return "bg-gray-100 text-gray-500";
    }
  };

  const handleCardClick = () => {
    navigate(`/admin/${instituteId}/polls/${id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this poll?")) {
      deletePoll(id);
    }
  };

  // If we have no data yet, show loading state
  if (!title) {
    return (
      <Card extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}>
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
      <div className="h-full w-full">
        <div className="relative w-full">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Poll"
              className="mb-3 h-48 w-full rounded-xl object-cover"
            />
          ) : (
            <div className="mb-3 h-48 w-full rounded-xl flex items-center justify-center bg-gray-100">
              <div className="text-5xl font-bold text-gray-300">POLL</div>
            </div>
          )}
          
          <div className={`absolute top-3 left-3 rounded-lg px-2 py-1 text-xs font-medium ${getStatusColor(status)}`}>
            {status || "Unknown"}
          </div>
          
          <button
            onClick={handleDelete}
            className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer"
          >
            <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50 dark:text-navy-900">
              <IoRemove />
            </div>
          </button>
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between px-1">
        <div className="mb-2">
          <p className="text-lg font-bold text-navy-700 dark:text-white">
            {title?.length > 40 ? title.slice(0, 40) + '...' : title}
          </p>
          <p className="mt-1 text-sm font-medium text-gray-600">
            {options?.length || 0} options
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex">
          {createdAt && (
            <p className="mb-2 text-sm font-bold text-brand-500 dark:text-white">
              {createdAt instanceof Date 
                ? createdAt.toLocaleDateString() 
                : new Date(createdAt?.seconds ? createdAt.seconds * 1000 : createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/admin/${instituteId}/polls/${id}`);
          }}
          className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
        >
          View Poll
        </button>
      </div>
    </Card>
  );
};

export default PollCard;