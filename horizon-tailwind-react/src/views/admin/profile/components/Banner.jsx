import React from "react";
import banner from 'assets/img/profile/banner.png'
const Banner = ({ 
  profileData,
  isEditing, 
  handleAvatarChange,
  userRole
}) => {
  console.log("Banner image path:", banner);
  return (
    
    <div className="items-center w-full h-full p-4 bg-white rounded-xl shadow-md dark:bg-navy-700">
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${banner})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}

      >
        <div className="absolute -bottom-12 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white dark:border-navy-700">
          {isEditing ? (
            <label className="h-full w-full rounded-full overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
              {(profileData.avatarUrl || profileData.tempAvatarUrl) ? (
                <img 
                  className="h-full w-full object-cover rounded-full" 
                  src={profileData.tempAvatarUrl || profileData.avatarUrl} 
                  alt="Profile" 
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-200 dark:bg-navy-700 text-gray-500 dark:text-gray-300 rounded-full">
                  {profileData.name?.charAt(0) || "U"}
                </div>
              )}
            </label>
          ) : (
            <>
              {(profileData.avatarUrl || profileData.tempAvatarUrl) ? (
                <img 
                  className="h-full w-full object-cover rounded-full" 
                  src={profileData.tempAvatarUrl || profileData.avatarUrl} 
                  alt="Profile" 
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-200 dark:bg-navy-700 text-gray-500 dark:text-gray-300 rounded-full">
                  {profileData.name?.charAt(0) || "U"}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        {isEditing ? (
          <input
            name="name"
            value={profileData.name || ""}
            onChange={(e) => handleChange(e)}
            placeholder="Your Name"
            className="text-xl font-bold text-center text-navy-700 dark:text-white bg-transparent border-b border-gray-300 dark:border-navy-600 focus:outline-none focus:border-brand-500"
          />
        ) : (
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            {profileData.name || "User"}
          </h4>
        )}
        
        {isEditing ? (
          <input
            name="position"
            value={profileData.position || ""}
            onChange={(e) => handleChange(e)}
            placeholder="Your Position"
            className="text-base font-normal text-center text-gray-600 bg-transparent border-b border-gray-300 dark:border-navy-600 focus:outline-none focus:border-brand-500"
          />
        ) : (
          <p className="text-base font-normal text-gray-600">
            {profileData.position || userRole || "User"}
          </p>
        )}
      </div>

      {/* Stats
      <div className="mt-6 mb-3 flex gap-4 md:gap-14 justify-center">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">17</p>
          <p className="text-sm font-normal text-gray-600">Projects</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            9.7K
          </p>
          <p className="text-sm font-normal text-gray-600">Points</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            434
          </p>
          <p className="text-sm font-normal text-gray-600">Tasks</p>
        </div>
      </div> */}
    </div>
  );
  
  // Helper function to handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    // This is a placeholder. In the actual implementation, you would use the handleChange function passed as a prop
  }
};

export default Banner;