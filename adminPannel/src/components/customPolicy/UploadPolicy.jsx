import React, { useState } from 'react';
import { storage, firestore } from '../../services/firebaseConfig'; // Import Firebase config
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import './UploadPolicy.scss';
import { sendNotifications } from '../../backend/notifications';
import { useAuthState } from 'react-firebase-hooks/auth';

const UploadCustomPolicy = () => {
  const [elements, setElements] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // Loading state
  const [uploadSuccess, setUploadSuccess] = useState(false); // Success state
  const user = useAuthState.user;
  // Add new element
  const addElement = (type) => {
    const newElement = { type, value: '', id: Date.now() }; // Create unique ID
    setElements([...elements, newElement]);
    setShowDropdown(false);
  };

  // Handle changes for dynamic inputs
  const handleChange = (id, value) => {
    const updatedElements = elements.map((el) =>
      el.id === id ? { ...el, value } : el
    );
    setElements(updatedElements);
  };

  // Firebase upload function
  const uploadPolicyToFirebase = async () => {
    try {
      setIsUploading(true);

      const uploadData = []; // To store the metadata for Firebase Firestore
      const uploadPromises = elements.map(async (element) => {
        if (['image', 'pdf'].includes(element.type)) {
          const file = element.value; // File object
          if (!file) return null;

          const fileRef = ref(storage, `${element.type}/${file.name}_${Date.now()}`);
          await uploadBytes(fileRef, file); // Upload file to Firebase
          const url = await getDownloadURL(fileRef); // Get file's public URL
          

          return { type: element.type, value: url }; // Return URL and type
        } else {
          return { type: element.type, value: element.value }; // For text or date fields
        }
      });

      // Resolve all the upload promises
      const resolvedUploads = await Promise.all(uploadPromises);

      // Save data to Firestore
      const policyRef = collection(firestore, 'policies');
      const policyDoc = await addDoc(policyRef, { policyFields: resolvedUploads, createdAt: new Date() });
      await sendNotifications({
        message: `new policy is added ${policyDoc.title}`,
        target: "all",
        type: "policies",
        metadata: {
          policieId: policyDoc.id,
          photoUrl: user.photoUrl
        }
      });
      setUploadSuccess(true);
      alert('Policy uploaded successfully!');

      // Reset state
      setElements([]);
    } catch (error) {
      console.error('Error uploading policy:', error);
      alert('Error uploading policy. Please try again.');
    } finally {
      setIsUploading(false); // Hide loading state
    }
  };

  return (
    <div className="upload-policy-page">
      {/* Header */}
      <h1>Create Policy</h1>
      <p>
        Follow these steps to create your policy:
        <ul>
          <li>Click "+" to add a field like Text, Image, PDF, etc.</li>
          <li>Fill the details for each field.</li>
          <li>Click "Upload Policy" when you're done.</li>
        </ul>
      </p>

      {/* Dynamic Fields */}
      <div className="elements-container">
        {elements.map((element) => (
          <div key={element.id} className="policy-element">
            {element.type === 'text' && (
              <input
                type="text"
                placeholder="Enter text"
                value={element.value}
                onChange={(e) => handleChange(element.id, e.target.value)}
              />
            )}
            {element.type === 'longText' && (
              <textarea
                placeholder="Enter long description"
                value={element.value}
                onChange={(e) => handleChange(element.id, e.target.value)}
              />
            )}
            {element.type === 'date' && (
              <input
                type="date"
                value={element.value}
                onChange={(e) => handleChange(element.id, e.target.value)}
              />
            )}
            {element.type === 'image' && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleChange(element.id, e.target.files[0] || null)
                }
              />
            )}
            {element.type === 'pdf' && (
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) =>
                  handleChange(element.id, e.target.files[0] || null)
                }
              />
            )}
          </div>
        ))}
      </div>

      {/* "+" Button */}
      <button
        className="add-button"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        +
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="dropdown">
          <button onClick={() => addElement('text')}>Add Text</button>
          <button onClick={() => addElement('longText')}>Add Long Text</button>
          <button onClick={() => addElement('date')}>Add Date</button>
          <button onClick={() => addElement('image')}>Add Image</button>
          <button onClick={() => addElement('pdf')}>Add PDF</button>
        </div>
      )}

      {/* Upload Policy Button */}
      {elements.length > 0 && (
        <button
          className="upload-policy-button"
          onClick={uploadPolicyToFirebase}
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload Policy'}
        </button>
      )}

      {/* Success Message */}
      {uploadSuccess && <p className="success-message">Policy uploaded successfully!</p>}
    </div>
  );
};

export default UploadCustomPolicy;
