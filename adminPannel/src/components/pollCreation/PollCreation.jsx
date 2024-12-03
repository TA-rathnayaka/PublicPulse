import React, { useState } from 'react';
import { firestore } from "../../backend/firebase/firebase";
import { collection, addDoc, getDocs ,updateDoc, arrayUnion } from "firebase/firestore";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./pollCreation.scss";

const PollCreation = () => {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState([{ option: "", count: 0 }]);
  const [relatedPolicy, setRelatedPolicy] = useState("multiple-choice");
  const [settings, setSettings] = useState({
    multipleSelection: false,
    requireNames: false,
    securityOption: "One vote per IP address",
    blockVPN: true,
    useCaptcha: false,
  });

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

  const notifyUsers = async (message) => {
    const usersCollectionRef = collection(firestore, "users");
    const usersSnapshot = await getDocs(usersCollectionRef);
    const userUpdates = usersSnapshot.docs.map(async (doc) => {
      const userRef = doc.ref;
      const notification = { message, dateTime: new Date() };
      await updateDoc(userRef, { notifications: arrayUnion(notification) });
    });
    await Promise.all(userUpdates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrl = await uploadImage();
      await addDoc(collection(firestore, "polls"), {
        title,
        description,
        options: options.filter((option) => option.option.trim() !== ""),
        relatedPolicy,
        settings,
        imageUrl,
        createdAt: new Date(),
      });
      const message = "New poll added: " + title;
      await notifyUsers(message);

      alert("Poll created successfully!");
      setTitle("");
      setDescription("");
      setOptions([{ option: "", count: 0 }]);
      setImage(null);
      setImageFile(null);
      setSettings({
        multipleSelection: false,
        requireNames: false,
        securityOption: "One vote per IP address",
        blockVPN: true,
        useCaptcha: false,
      });
    } catch (error) {
      console.error("Error creating poll:", error);
      alert("Failed to create poll.");
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
              placeholder="Type your question here"
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
                    onChange={(e) =>
                      handleOptionChange(index, e.target.value)
                    }
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
        </form>
      </div>

      <div className="poll-container-right">
        <form onSubmit={handleSubmit}>
          <div className="settings">
            <h3>Settings</h3>
            <hr />
            <div className="setting-item">
              <ToggleSwitch
                label="Allow selection of multiple options"
                checked={settings.multipleSelection}
                onChange={(checked) =>
                  setSettings({
                    ...settings,
                    multipleSelection: checked,
                  })
                }
              />
            </div>
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
                label="Use CAPTCHA"
                checked={settings.useCaptcha}
                onChange={(checked) =>
                  setSettings({ ...settings, useCaptcha: checked })
                }
              />
            </div>
            <a href="#" className="advanced-settings">
              Show advanced settings
            </a>
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
