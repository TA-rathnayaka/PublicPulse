import React, { useEffect, useState } from "react";
import "./profile.scss";
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import logo from "../../Assets/logo.png";

const Profile = () => {
  const auth = getAuth();
  const storage = getStorage();
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    dob: "",
    presentAddress: "",
    permanentAddress: "",
    city: "",
    postalCode: "",
    country: "",
    img: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // For controlling popup visibility

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setUserData((prev) => ({
          ...prev,
          email: user.email || "",
          img: user.photoURL || logo,
        }));
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Show preview
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      alert("Please select an image to upload.");
      return;
    }

    const storageRef = ref(storage, `profileImages/${userId}`);
    try {
      await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(storageRef);
      await updateProfile(auth.currentUser, { photoURL: downloadURL });

      setUserData((prev) => ({ ...prev, img: downloadURL }));
      setPreviewImage(null);
      setShowPopup(false); // Close the popup
      alert("Profile image updated successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload the image.");
    }
  };

  return (
    <div className="profilePage">
      <div className="profilePageContainer">
        <div className="profileContent">
          <h2>Edit Profile</h2>
          <div className="tabs">
            <button className="active">Edit Profile</button>
          </div>
          <div className="profileDetails">
            <div className="profileImage">
              <img
                src={previewImage || userData.img}
                alt="Profile"
                onError={(e) => (e.target.src = logo)} // Fallback to default logo
              />
              <button
                className="editIcon"
                onClick={() => setShowPopup(true)}
              >
                ✏️
              </button>
            </div>
            <div className="form">
              {[
                { label: "Your Name", name: "name", placeholder: "Name" },
                {
                  label: "User Name",
                  name: "username",
                  placeholder: "username",
                },
                {
                  label: "Email",
                  name: "email",
                  placeholder: "example@gmail.com",
                  readOnly: true,
                },
                {
                  label: "Date of Birth",
                  name: "birthdate",
                  type: "date",
                  placeholder: "25 January 1990",
                },
                {
                  label: "Present Address",
                  name: "presentAddress",
                  placeholder: "San Jose, California, USA",
                },
                {
                  label: "Permanent Address",
                  name: "permanentAddress",
                  placeholder: "San Jose, California, USA",
                },
                {
                  label: "District",
                  name: "district",
                  placeholder: "San Jose",
                },
                {
                  label: "Postal Code",
                  name: "postalCode",
                  placeholder: "45962",
                },
                { label: "Country", name: "country", placeholder: "USA" },
              ].map((field) => (
                <div className="formGroup" key={field.name}>
                  <label>{field.label}</label>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={userData[field.name]}
              
                    placeholder={field.placeholder}
                    readOnly={field.readOnly || false}
                  />
                </div>
              ))}
              <button className="saveButton" >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="popupOverlay">
          <div className="popupContent">
            <h3>Upload Profile Picture</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="previewImage"
              />
            )}
            <div className="popupActions">
              <button onClick={handleImageUpload}>Upload</button>
              <button onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
