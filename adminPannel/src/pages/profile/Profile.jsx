import React, { useEffect, useState } from "react";
import "./profile.scss";

const Profile = () => {
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
    img: "", // Add img property for profile image
  });

  useEffect(() => {
    // Fetch user data from local storage
    const userId = "YOUR_USER_ID"; // Replace with logic to get the current user's ID
    const storedUserData = localStorage.getItem(`userData_${userId}`);
    
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      console.log("Fetched user data:", JSON.parse(storedUserData));
    }
  }, []); // The empty dependency array ensures this runs once after the component mounts

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Save logic here (e.g., updating the user in local storage or sending to backend)
    localStorage.setItem(`userData_${userData.uid}`, JSON.stringify(userData));
    alert("Profile saved successfully!"); // Replace with a better feedback mechanism
  };

  return (
    <div className="profilePage">
      <div className="profilePageContainer">
        <div className="profileContent">
          <h2>Edit Profile</h2>
          <div className="tabs">
            <button className="active">Edit Profile</button>
            <button>Preferences</button>
            <button>Security</button>
          </div>
          <div className="profileDetails">
            <div className="profileImage">
              <img
                src={userData.img || "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
                alt="Profile"
              />
              <button className="editIcon">✏️</button>
            </div>
            <div className="form">
              {/* Form Fields */}
              <div className="formGroup">
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  placeholder="Charlene Reed"
                />
              </div>
              <div className="formGroup">
                <label>User Name</label>
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  placeholder="Charlene Reed"
                />
              </div>
              <div className="formGroup">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="charlenereed@gmail.com"
                />
              </div>
              <div className="formGroup">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  placeholder="********"
                />
              </div>
              <div className="formGroup">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={userData.dob}
                  onChange={handleChange}
                  placeholder="25 January 1990"
                />
              </div>
              <div className="formGroup">
                <label>Present Address</label>
                <input
                  type="text"
                  name="presentAddress"
                  value={userData.presentAddress}
                  onChange={handleChange}
                  placeholder="San Jose, California, USA"
                />
              </div>
              <div className="formGroup">
                <label>Permanent Address</label>
                <input
                  type="text"
                  name="permanentAddress"
                  value={userData.permanentAddress}
                  onChange={handleChange}
                  placeholder="San Jose, California, USA"
                />
              </div>
              <div className="formGroup">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={userData.city}
                  onChange={handleChange}
                  placeholder="San Jose"
                />
              </div>
              <div className="formGroup">
                <label>Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={userData.postalCode}
                  onChange={handleChange}
                  placeholder="45962"
                />
              </div>
              <div className="formGroup">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={userData.country}
                  onChange={handleChange}
                  placeholder="USA"
                />
              </div>
              <button className="saveButton" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
