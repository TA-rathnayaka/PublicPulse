import React, { useState } from 'react';
import { firestore } from '../../backend/firebase/firebase'; // Import Firebase Firestore
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import './pollCreation.scss';

const PollCreation = () => {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Store image file for upload
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['']);
  const [relatedPolicy, setRelatedPolicy] = useState('multiple-choice');
  const [settings, setSettings] = useState({
    multipleSelection: false,
    requireNames: false,
    securityOption: 'One vote per IP address',
    blockVPN: true,
    useCaptcha: false
  });

  const storage = getStorage(); // Initialize Firebase Storage

  const handleAddImageClick = () => {
    setShowImageUpload((prev) => !prev);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // For preview
      setImageFile(file); // Store actual file for upload
    }
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const uploadImage = async () => {
    if (!imageFile) return null;
    const imageRef = ref(storage, `polls/${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    return getDownloadURL(imageRef); // Return the image URL after upload
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload image to Firebase Storage if there is an image
      const imageUrl = await uploadImage();

      // Save poll data to Firestore
      await addDoc(collection(firestore, 'polls'), {
        title,
        description,
        options: options.filter(option => option.trim() !== ''), // Remove empty options
        relatedPolicy,
        settings,
        imageUrl, // Save image URL if available
        createdAt: new Date()
      });

      alert("Poll created successfully!");

      // Reset form fields
      setTitle('');
      setDescription('');
      setOptions(['']);
      setImage(null);
      setImageFile(null);
      setSettings({
        multipleSelection: false,
        requireNames: false,
        securityOption: 'One vote per IP address',
        blockVPN: true,
        useCaptcha: false
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

          <button
            type="button"
            className="add-description"
            onClick={handleAddImageClick}
          >
            + Add description or image
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
            <label htmlFor="poll-type">Related Policy</label>
            <select
              id="poll-type"
              value={relatedPolicy}
              onChange={(e) => setRelatedPolicy(e.target.value)}
            >
              <option value="none">None</option>
              {/* Add other policies if needed */}
            </select>
          </div>

          <div className="form-group">
            <label>Answer Options</label>
            <div className="options">
              {options.map((option, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                  {index > 1 && (
                    <button type="button" onClick={() => handleRemoveOption(index)}>
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="add-option" onClick={handleAddOption}>
                + Add option
              </button>
              <button type="button" className="add-other">Add "Other"</button>
            </div>
          </div>
        </form>
      </div>

      <div className="poll-container-right">
        <form onSubmit={handleSubmit}>
          <div className="settings">
            <h3>Settings</h3>
            <div className="setting-item">
              <label>Allow selection of multiple options</label>
              <input
                type="checkbox"
                checked={settings.multipleSelection}
                onChange={(e) => setSettings({ ...settings, multipleSelection: e.target.checked })}
              />
            </div>
            <div className="setting-item">
              <label>Require participant names</label>
              <input
                type="checkbox"
                checked={settings.requireNames}
                onChange={(e) => setSettings({ ...settings, requireNames: e.target.checked })}
              />
            </div>
            <div className="setting-item">
              <label>Voting security</label>
              <select
                value={settings.securityOption}
                onChange={(e) => setSettings({ ...settings, securityOption: e.target.value })}
              >
                <option>One vote per IP address</option>
                {/* Additional security options here */}
              </select>
            </div>
            <div className="setting-item">
              <label>Block VPN users</label>
              <input
                type="checkbox"
                checked={settings.blockVPN}
                onChange={(e) => setSettings({ ...settings, blockVPN: e.target.checked })}
              />
            </div>
            <div className="setting-item">
              <label>Use CAPTCHA</label>
              <input
                type="checkbox"
                checked={settings.useCaptcha}
                onChange={(e) => setSettings({ ...settings, useCaptcha: e.target.checked })}
              />
            </div>
            <a href="#" className="advanced-settings">Show advanced settings</a>
          

          </div>

          <button type="submit" className="create-poll">Create poll</button>
        </form>
      </div>
    </div>
  );
};

export default PollCreation;
