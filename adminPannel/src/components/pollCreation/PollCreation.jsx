import React, { useState, useEffect } from "react";
import { firestore } from "../../backend/firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { createNotification, sendNotifications } from "../../backend/notifications";
import { getStorage, ref, uploadBytes, getDownloadURL,deleteObject } from "firebase/storage";
import "./pollCreation.scss";
import {logo} from "../../Assets/logo.png"
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

const PollCreation = () => {
  const [policies, setPolicies] = useState([]);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState([{ option: "", count: 0 }]);
  const [relatedPolicy, setRelatedPolicy] = useState(null);
  const [settings, setSettings] = useState({
    requireNames: false,
    notifyUsers:false,
    securityOption: "off",
    blockVPN: false,
    SecureMode: false,
  });
  const [loading,setLoading]=useState(false);
  const user= getAuth().currentUser;
  const storage = getStorage();

  const handleAddImageClick = () => {
    setShowImageUpload((prev) => !prev);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleAddOption = () => {
    setOptions([...options, { option: "", count: 0 }]);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = options.map((opt, i) =>
      i === index ? { ...opt, option: value } : opt
    );
    setOptions(newOptions);
  };

  const handleRemoveOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const uploadImage = async () => {
    if (!imageFile) return null;
    const imageRef = ref(storage, `polls/${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    return getDownloadURL(imageRef);
  };

  useEffect(() => {
    const fetchPolicies = async () => {
      const policySnapshot = await getDocs(collection(firestore, "policies"));
      const policyList = policySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title||doc.data().policyName,
      }));
      setPolicies(policyList);
    };
  
    fetchPolicies();
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Input validation
    if (!title.trim()) {
      alert("Title is required.");
      return;
    }
    if (!description.trim()) {
      alert("Description is required.");
      return;
    }
    if (options.length < 2 || options.some((opt) => !opt.option.trim())) {
      alert("At least two valid options are required.");
      return;
    }
  
    setLoading(true);
    let pollRef = null;
    let optionRefs = [];
    let imageUrl = null;
  
    try {
      // Step 1: Upload image if exists
      if (imageFile) {
        const imageRef = ref(storage, `polls/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }
  
      // Step 2: Create poll document
      pollRef = await addDoc(collection(firestore, "polls"), {
        title: title.trim(),
        description: description.trim(),
        relatedPolicy: relatedPolicy || null,
        imageUrl: imageUrl || null,
        settings,
        createdAt: new Date(),
        options: [], // Will be populated with option IDs
      });
  
      // Step 3: Create options
      const validOptions = options.filter(opt => opt.option.trim() !== "");
      const optionIds = [];
  
      for (const option of validOptions) {
        const optionRef = await addDoc(collection(firestore, "options"), {
          pollId: pollRef.id,
          text: option.option.trim(),
          voteCount: 0,
          createdAt: new Date()
        });
        optionRefs.push(optionRef);
        optionIds.push(optionRef.id);
      }
  
      // Step 4: Update poll with option IDs
      await updateDoc(pollRef, {
        options: optionIds
      });
      console.log("notify users :", settings.notifyUsers);
  
      // Step 5: Send notification if enabled
      if (settings.notifyUsers) {
        console.log("notify users");
        try {
          await sendNotifications({
            message: `A new poll was added: ${title}`,
            target: "all",
            type: "polls",
            metadata: { 
              pollId: pollRef.id,
              title: title.trim(),
              photoUrl: user.photoURL,
            },
          });
        } catch (notificationError) {
          console.error("Notification error:", notificationError);
          throw new Error(`Failed to notify users: ${notificationError.message}`);
        }
      }
  
      // Success! Reset the form
      alert("Poll created successfully!");
      setTitle("");
      setDescription("");
      setOptions([{ option: "", count: 0 }]);
      setImage(null);
      setImageFile(null);
      setSettings({
        ...settings,
        notifyUsers: false,
      });
  
    } catch (error) {
      console.error("Error in poll creation process:", error);
  
      // Cleanup on error
      try {
        // 1. Delete options
        for (const optionRef of optionRefs) {
          try {
            await deleteDoc(optionRef);
          } catch (optionDeleteError) {
            console.error("Error deleting option:", optionDeleteError);
          }
        }
  
        // 2. Delete poll
        if (pollRef) {
          await deleteDoc(pollRef);
        }
  
        // 3. Delete image
        if (imageUrl) {
          const imageRef = ref(storage, imageUrl);
          try {
            await deleteObject(imageRef);
          } catch (imageDeleteError) {
            console.error("Error deleting image:", imageDeleteError);
          }
        }
      } catch (cleanupError) {
        console.error("Error during cleanup:", cleanupError);
      }
  
      alert(`Failed to create poll: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  
  

  return (
    <div className="poll-container">
      <div className="poll-container-left">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Type your title here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Add a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="add-description"
            onClick={handleAddImageClick}
          >
            + Add image
          </button>

          {showImageUpload && (
            <div className="form-group">
              <label htmlFor="image-upload">Upload Image</label>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          )}

          {image && (
            <div className="image-preview">
              <p>Image Preview:</p>
              <img src={image} alt="Selected" className="preview-img" />
            </div>
          )}

          <div className="form-group">
            <label>Answer Options</label>
            <div className="options">
              {options.map((optionObj, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <input
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={optionObj.option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                  {index > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <div className="options-buttons">
                <button
                  type="button"
                  className="add-option"
                  onClick={handleAddOption}
                >
                  + Add option
                </button>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="relatedPolicy">Related Policy</label>
            <select
              id="relatedPolicy"
              className="form-control"
              value={relatedPolicy || ""}
              onChange={(e) => setRelatedPolicy(e.target.value || null)}
            >
              <option value="">-- None --</option>
              {policies.map((policy) => (
                <option key={policy.id} value={policy.title}>
                  {policy.title}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>

      <div className="poll-container-right">
        <form onSubmit={handleSubmit}>
          <div className="settings">
            <h3>Settings</h3>
            <hr />
          
            <div className="setting-item">
              <ToggleSwitch
                label="Require participant names"
                checked={settings.requireNames}
                onChange={(checked) =>
                  setSettings({
                    ...settings,
                    requireNames: checked,
                  })
                }
              />
            </div>
            <div className="setting-item">
              <label>Voting security</label>
              <select
                value={settings.securityOption}
                onChange={(e) =>
                  setSettings({ ...settings, securityOption: e.target.value })
                }
              >
                <option>One vote per IP address</option>
                <option>off</option>
              </select>
            </div>
            <div className="setting-item">
              <ToggleSwitch
                label="Block VPN users"
                checked={settings.blockVPN}
                onChange={(checked) =>
                  setSettings({ ...settings, blockVPN: checked })
                }
              />
            </div>
            <div className="setting-item">
              <ToggleSwitch
                label="Secure Mode"
                checked={settings.SecureMode}
                onChange={(checked) =>{
                  console.log("secure mode: ",checked);
                  setSettings({ ...settings, useCaptcha: checked })
                }
                  
                }
              />
            </div>
            <a href="#" className="advanced-settings">
              Show advanced settings
            </a>
            <div className="setting-item">
            
<ToggleSwitch
  label="Notify Users"
  checked={settings.notifyUsers}
  onChange={(checked) => {
    console.log("Notify Users updated:", checked); // Add console log to see the update
    setSettings({
      ...settings,
      notifyUsers: checked,
    });
  }}
/>
            </div>
          </div>
          <button type="submit" className="create-poll">
            Create poll
          </button>
        </form>
      </div>
    </div>
  );
};

export default PollCreation;
