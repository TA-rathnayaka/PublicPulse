import React, { useEffect, useState } from "react";
import "./profile.scss";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import logo from "../../Assets/logo.png"

const Profile = () => {
  const auth = getAuth();
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    dob: "",
    presentAddress: "",
    permanentAddress: "",
    city: "",
    postalCode: "",
    country: "",
    img: "",
  });

  useEffect(() => {
    // Listen to auth state change to set userId
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, [auth]);

  useEffect(() => {
    if (userId) {
      // Fetch user data from local storage
      const storedUserData = localStorage.getItem(`userData_${userId}`);
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
        console.log("Fetched user data:", JSON.parse(storedUserData));
        console.log("userData: ",userData)
      }
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!userId) {
      alert("No user is logged in to save the profile.");
      return;
    }
    
    localStorage.setItem(`userData_${userId}`, JSON.stringify(userData));
    alert("Profile saved successfully!");
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
                src={auth.currentUser.photoURL || logo}
                alt="Profile"
              />
              <button className="editIcon">✏️</button>
            </div>
            <div className="form">
              {[
                { label: "Your Name", name: "name", placeholder: "Name" },
                { label: "User Name", name: "username", placeholder: "username" },
                { label: "Email", name: "email", placeholder: "example@gmail.com", readOnly: true },
                { label: "Date of Birth", name: "birthdate", type: "date", placeholder: "25 January 1990" },
                { label: "Present Address", name: "presentAddress", placeholder: "San Jose, California, USA" },
                { label: "Permanent Address", name: "permanentAddress", placeholder: "San Jose, California, USA" },
                { label: "District", name: "district", placeholder: "San Jose" },
                { label: "Postal Code", name: "postalCode", placeholder: "45962" },
                { label: "Country", name: "country", placeholder: "USA" },
              ].map((field) => (
                <div className="formGroup" key={field.name}>
                  <label>{field.label}</label>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={userData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    readOnly={field.readOnly || false}
                  />
                </div>
              ))}
              <button className="saveButton" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
