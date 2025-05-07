import React from "react";
import Card from "components/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context/authContext";
import { usePoll } from "context/PollContext";
import { useInstituteData } from "context/InstituteContext";

const PollHistoryCard = ({ historyData = [] }) => {
    const navigate = useNavigate();
    const { instituteId } = useInstituteData();

    
    const handleCardClick = (pollId) => {
        // Navigate to poll details page
        navigate(`/admin/${instituteId}/poll/${pollId}`);
    };
    
    const handleSeeAll = () => {
        navigate(`/admin/${instituteId}/polls/all`);
    };
    
    return (
        <Card extra={"mt-3 !z-5 overflow-hidden"}>
            {/* HistoryCard Header */}
            <div className="flex items-center justify-between rounded-t-3xl p-3">
                <div className="text-lg font-bold text-navy-700 dark:text-white">
                    History
                </div>
                <button
                    onClick={handleSeeAll}
                    className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20"
                >
                    See all
                </button>
            </div>
            
            {/* History CardData */}
            {historyData.slice(0, 10).map((data, index) => (
                <div
                    key={index}
                    onClick={() => handleCardClick(data.id)}
                    className="flex h-full w-full items-start justify-between bg-white px-3 py-[20px] hover:shadow-2xl dark:!bg-navy-800 dark:shadow-none dark:hover:!bg-navy-700 cursor-pointer transition-all" 
                >
                    <div className="flex items-center gap-3">
                        <div  className="flex h-16 w-16 items-center justify-center">
                            <img
                                 className="h-full w-full rounded-xl object-cover"
                                src={data.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.title)}&background=random`}
                                alt={data.title}
                                onError={(e) => {
                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.title)}&background=random`;
                                }}
                            />
                        </div>
                        <div className="flex flex-col">
  <h5 className="text-base font-bold text-navy-700 dark:text-white">
    {data.title.length > 20 ? data.title.slice(0, 15) + '...' : data.title}
  </h5>
  <p className="mt-1 text-sm font-normal text-gray-600 dark:text-gray-400">
    Options: {data.options?.length || 0}
  </p>
</div>

                    </div>
                    
                    <div className="mt-1 flex items-center justify-center text-navy-700 dark:text-white">
                        <div className="ml-2 flex items-center text-sm font-normal text-gray-600 dark:text-gray-400">
                            <p>{new Date(data.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            ))}
            
            {historyData.length === 0 && (
                <div className="flex justify-center items-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No history available</p>
                </div>
            )}
        </Card>
    );
};

export default PollHistoryCard;