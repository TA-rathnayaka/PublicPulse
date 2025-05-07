import React, { useState, useEffect } from "react";
import { useAuth } from "context/authContext"; // Path may need adjustment
import { useInstituteData } from "context/InstituteContext"; // Path may need adjustment
import { useNotifications } from "context/NotificationsContext"; // Import the notifications context
import { firestore } from "../../../backend/firebase/firebase"; // Path may need adjustment
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth"; // Import updateProfile from firebase/auth
import { MdModeEditOutline, MdSave, MdCancel, MdFileUpload } from "react-icons/md";
import banner from "assets/img/profile/banner.png";

// Card component for consistent styling
const Card = ({ children, extra }) => {
  return (
    <div className={`rounded-xl bg-white p-4 shadow-md dark:bg-navy-700 ${extra}`}>
      {children}
    </div>
  );
};

// Banner component for profile display
const Banner = ({ 
  profileData, 
  isEditing, 
  handleAvatarChange,
  handleChange,
  userRole 
}) => {
  return (
    <div className="items-center w-full h-full p-4 bg-white rounded-xl shadow-md dark:bg-navy-700">
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
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
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-2 bg-white dark:bg-navy-800 text-navy-700 dark:text-white border border-gray-300 dark:border-navy-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition-colors"  
          />
        ) : (
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            {profileData.name || "User"}
          </h4>
        )}
        
        <p className="text-base font-normal text-gray-600">
          {userRole === "superadmin" ? "Super Admin" : userRole === "admin" ? "Administrator" : userRole || "User"}
        </p>
      </div>

      {/* Bottom margin for spacing */}
      <div className="mb-3"></div>
    </div>
  );
};

// Notification toggle component using context
const NotificationToggle = ({ id, label, prefKey }) => {
  const { notificationPreferences, updateNotificationPreference } = useNotifications();
  
  // Get current value from preferences
  const isEnabled = notificationPreferences[prefKey] ?? false;
  
  const handleToggle = () => {
    updateNotificationPreference(prefKey, !isEnabled);
  };
  
  return (
    <div className="flex items-center gap-3">
      <div 
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isEnabled ? 'bg-brand-500' : 'bg-gray-300'}`}
        onClick={handleToggle}
      >
        <span 
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`} 
        />
      </div>
      <label className="text-sm font-medium text-navy-700 dark:text-white cursor-pointer" onClick={handleToggle}>
        {label}
      </label>
    </div>
  );
};


const ProfilePage = () => {
  // Get user data from auth context
  const { user, userRole, instituteId, loading } = useAuth();
  
  // Get institute data from institute context
  const { instituteData } = useInstituteData();
  
  // Get notifications data from notifications context
  const { loading: notificationsLoading } = useNotifications();
  
  // Profile state
  const [profileData, setProfileData] = useState({
    name: "",
    position: "",
    bio: "",
    education: "",
    department: "",
    languages: "",
    organization: "",
    birthday: "",
    avatarUrl: null,
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [avatarFile, setAvatarFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);

  // Fetch user profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const profileDocRef = doc(firestore, "userProfiles", user.uid);
        const profileSnapshot = await getDoc(profileDocRef);
        
        if (profileSnapshot.exists()) {
          setProfileData({ ...profileData, ...profileSnapshot.data() });
        } else {
          // If no profile exists yet, set default values from user auth
          setProfileData({
            ...profileData,
            name: user.displayName || "",
            avatarUrl: user.photoURL || null,
          });
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  // Handle profile update
  const handleUpdate = async () => {
    if (!user) return;
    
    setIsLoading(true);
    setUploadError(null);
    
    try {
      let updatedProfileData = { ...profileData };
      
      // Firebase Auth updates
      const authUpdates = {};
      
      // If avatar file is selected, upload it first
      if (avatarFile) {
        const downloadURL = await uploadAvatar();
        updatedProfileData.avatarUrl = downloadURL;
        
        // Add photoURL to auth updates
        authUpdates.photoURL = downloadURL;
      }
      
      // If name has changed, add to auth updates
      if (profileData.name && profileData.name !== user.displayName) {
        updatedProfileData.name = profileData.name.trim();
        authUpdates.displayName = profileData.name.trim();
      }
      
      // Apply Firebase Auth updates if needed
      if (Object.keys(authUpdates).length > 0) {
        try {
          await updateProfile(user, authUpdates);
          console.log("Firebase Auth profile updated successfully:", authUpdates);
        } catch (authError) {
          console.error("Error updating Firebase Auth profile:", authError);
          setUploadError("Failed to update user authentication profile");
          // Continue with Firestore update even if Auth update fails
        }
      }
      
      // Update profile in Firestore
      const profileDocRef = doc(firestore, "userProfiles", user.uid);
      await updateDoc(profileDocRef, updatedProfileData);
      
      // Update local state with the finalized data
      setProfileData(updatedProfileData);
      
      // Remove temporary avatar URL and file reference
      if (avatarFile) {
        setAvatarFile(null);
        setProfileData(prev => ({ ...prev, tempAvatarUrl: null }));
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setUploadError("Failed to update profile");
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  // Upload avatar to Firebase Storage
  const uploadAvatar = async () => {
    if (!avatarFile) return null;
    
    setUploadError(null);
    const storage = getStorage();
    const storageRef = ref(storage, `avatars/${user.uid}`);
    
    const uploadTask = uploadBytesResumable(storageRef, avatarFile);
    
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Error uploading avatar:", error);
          setUploadError("Failed to upload image");
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            console.error("Error getting download URL:", error);
            setUploadError("Failed to get image URL");
            reject(error);
          }
        }
      );
    });
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // Handle avatar file selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.match('image.*')) {
        setUploadError("Please select an image file");
        return;
      }
      
      // 5MB max file size
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("Image size should be less than 5MB");
        return;
      }
      
      setAvatarFile(file);
      setUploadError(null);
      
      // Create a temporary URL for preview
      const reader = new FileReader();
      reader.onload = () => {
        setProfileData(prev => ({ ...prev, tempAvatarUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading || isLoading || notificationsLoading) {
    return <div className="flex justify-center items-center h-screen">Loading profile...</div>;
  }

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Please log in to view your profile</div>;
  }

  return (
    <div className="flex w-full flex-col gap-5 p-4">
      {/* Profile Header */}
      <div className="w-full flex flex-col gap-5 lg:grid lg:grid-cols-12">
        {/* Profile Banner (Using the new Banner component) */}
        <div className="col-span-8 lg:mb-0">
          <Banner 
            profileData={profileData}
            isEditing={isEditing}
            handleAvatarChange={handleAvatarChange}
            handleChange={handleChange}
            userRole={userRole}
          />
        </div>

        {/* Account Status */}
        <div className="col-span-4 lg:mb-0">
          <Card extra="h-full">
            <h4 className="text-lg font-bold text-navy-700 dark:text-white mb-4">
              Account Status
            </h4>
            
            <div className="flex flex-col items-center mb-4">
              <div className="p-4 bg-lightPrimary text-brand-500 rounded-full text-2xl dark:bg-navy-700 dark:text-white">
                {userRole === "superadmin" ? "S" : userRole === "admin" ? "A" : "U"}
              </div>
              <p className="mt-2 text-md font-medium">
                {userRole === "super-admin" ? "Super Admin" : userRole === "admin" ? "Administrator" : "Regular User"}
              </p>
            </div>
            
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600 mb-1">Account Completion</p>
              <div className="h-2 w-full bg-lightPrimary rounded-full dark:bg-navy-700">
                <div 
                  className="h-full bg-brand-500 rounded-full dark:bg-white" 
                  style={{ width: `${calculateProfileCompleteness()}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1 text-right">{calculateProfileCompleteness()}% complete</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Upload Progress & Error Display */}
      {(uploadProgress > 0 && uploadProgress < 100) && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${uploadProgress}%` }}
          ></div>
          <p className="text-xs text-gray-500 mt-1">Uploading image: {Math.round(uploadProgress)}%</p>
        </div>
      )}
      
      {uploadError && (
        <div className="w-full p-2 bg-red-100 text-red-700 rounded-md">
          {uploadError}
        </div>
      )}

      {/* Edit Profile Controls */}
      <div className="w-full flex justify-end">
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600 transition-colors"
          >
            <MdModeEditOutline /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={() => {
                setIsEditing(false);
                setAvatarFile(null);
                setProfileData(prev => ({ ...prev, tempAvatarUrl: null }));
                setUploadError(null);
              }}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              disabled={isLoading}
            >
              <MdCancel /> Cancel
            </button>
            <button 
              onClick={handleUpdate}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : <><MdSave /> Save Changes</>}
            </button>
          </div>
        )}
      </div>

      {/* General Information */}
      <div className="w-full mt-5">
        <Card>
          <h4 className="text-xl font-bold text-navy-700 dark:text-white mb-4">
            General Information
          </h4>
          
          {isEditing ? (
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Bio</label>
              <textarea
                name="bio"
                value={profileData.bio || ""}
                onChange={handleChange}
                placeholder="Tell us about yourself"
                className="w-full p-2 bg-white dark:bg-navy-800 text-navy-700 dark:text-white border border-gray-300 dark:border-navy-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition-colors"
                rows="4"
              ></textarea>
            </div>
          ) : (
            <p className="text-base text-gray-600 mb-4">
              {profileData.bio || "No bio information added yet."}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Education */}
            <div className="flex flex-col p-3 bg-white rounded-xl shadow-sm dark:bg-navy-700">
              <p className="text-sm text-gray-600">Education</p>
              {isEditing ? (
                <input
                  name="education"
                  value={profileData.education || ""}
                  onChange={handleChange}
                  placeholder="Your Education"
                  className="w-full p-2 bg-white dark:bg-navy-800 text-navy-700 dark:text-white border border-gray-300 dark:border-navy-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition-colors"                />
              ) : (
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  {profileData.education || "Not specified"}
                </p>
              )}
            </div>

            {/* Languages */}
            <div className="flex flex-col p-3 bg-white rounded-xl shadow-sm dark:bg-navy-700">
              <p className="text-sm text-gray-600">Languages</p>
              {isEditing ? (
                <input
                  name="languages"
                  value={profileData.languages || ""}
                  onChange={handleChange}
                  placeholder="Languages you speak"
                  className="w-full p-2 bg-white dark:bg-navy-800 text-navy-700 dark:text-white border border-gray-300 dark:border-navy-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition-colors"
                />
              ) : (
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  {profileData.languages || "Not specified"}
                </p>
              )}
            </div>

            {/* Department */}
            <div className="flex flex-col p-3 bg-white rounded-xl shadow-sm dark:bg-navy-700">
              <p className="text-sm text-gray-600">Department</p>
              {isEditing ? (
                <input
                  name="department"
                  value={profileData.department || ""}
                  onChange={handleChange}
                  placeholder="Your Department"
                  className="w-full p-2 bg-white dark:bg-navy-800 text-navy-700 dark:text-white border border-gray-300 dark:border-navy-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition-colors"
                />
              ) : (
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  {profileData.department || "Not specified"}
                </p>
              )}
            </div>

            {/* Organization */}
            <div className="flex flex-col p-3 bg-white rounded-xl shadow-sm dark:bg-navy-700">
              <p className="text-sm text-gray-600">Organization</p>
              {isEditing ? (
                <input
                  name="organization"
                  value={profileData.organization || ""}
                  onChange={handleChange}
                  placeholder="Your Organization"
                  className="w-full p-2 bg-white dark:bg-navy-800 text-navy-700 dark:text-white border border-gray-300 dark:border-navy-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition-colors"
                />
              ) : (
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  {profileData.organization || instituteData?.name || "Not specified"}
                </p>
              )}
            </div>

            {/* Birthday */}
            <div className="flex flex-col p-3 bg-white rounded-xl shadow-sm dark:bg-navy-700">
              <p className="text-sm text-gray-600">Birthday</p>
              {isEditing ? (
                <input
                  name="birthday"
                  type="date"
                  value={profileData.birthday || ""}
                  onChange={handleChange}
                  className="w-full p-2 bg-white dark:bg-navy-800 text-navy-700 dark:text-white border border-gray-300 dark:border-navy-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition-colors"
                />
              ) : (
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  {profileData.birthday || "Not specified"}
                </p>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Settings/Preferences Section */}
      <div className="w-full mt-5">
        <Card>
          <h4 className="text-xl font-bold text-navy-700 dark:text-white mb-4">
            Notification Preferences
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notificationSettings.map((setting, index) => (
              <NotificationToggle 
                key={index} 
                id={`notification-${index}`} 
                label={setting.label}
                prefKey={setting.key}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  // Helper function to calculate profile completeness
  function calculateProfileCompleteness() {
    const fields = [
      'name', 'position', 'bio', 'education', 
      'department', 'languages', 'organization', 'birthday',
      'avatarUrl'
    ];
    
    const filledFields = fields.filter(field => 
      profileData[field] && profileData[field].toString().trim() !== ''
    );
    
    return Math.round((filledFields.length / fields.length) * 100);
  }
};

// Sample notification settings
const notificationSettings = [
  { key: "emailNotifications", label: "Email notifications" },
  { key: "pushNotifications", label: "Push notifications" },
  { key: "monthlyNewsletter", label: "Monthly newsletter" },
  { key: "productUpdates", label: "Product updates" },
  { key: "securityAlerts", label: "Security alerts" },
  { key: "accountActivity", label: "Account activity" }
];

export default ProfilePage;