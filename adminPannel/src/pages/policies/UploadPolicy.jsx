import React, { useState } from 'react';
import { storage, firestore } from '../../services/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import './UploadPolicy.scss';
import { createNotification } from '../../backend/notifications';

const UploadPolicy = () => {
  

// Example usage:
const notifyUser = async (policyId) => {
  try {
    const notificationId = await createNotification({
      message: "New policy has been published",
      target: "all",  // Target user ID or group
      type: "policy",  // Notification type
      metadata: { policyId: policyId }  // Extra data if needed
    });

    console.log("Notification created with ID:", notificationId);
  } catch (error) {
    console.error("Error notifying user:", error.message);
  }
};

  const [pdfFile, setPdfFile] = useState(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [policyName, setPolicyName] = useState('');
  const [sectionNo, setSectionNo] = useState('');
  const [gazetteNumber, setGazetteNumber] = useState('');
  const [enforcementDate, setEnforcementDate] = useState('');
  const [authorizedBy, setAuthorizedBy] = useState('');
  const [additionalComments, setAdditionalComments] = useState('');

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!pdfFile) return;
    const storageRef = ref(storage, `policies/${pdfFile.name}`);
    await uploadBytes(storageRef, pdfFile);
    const downloadURL = await getDownloadURL(storageRef);

    const policyData = {
      description,
      category,
      createdDate,
      policyName,
      sectionNo,
      pdfUrl: downloadURL,
      gazetteNumber,
      enforcementDate,
      authorizedBy,
      additionalComments,
    };

    const policyref =await addDoc(collection(firestore, 'policies'), policyData);
    notifyUser(policyref.id)
    console.log('Policy added successfully');
  };

  return (
    <div className="upload-policy">
      <h2>Upload New Policy</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Short Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="date"
        placeholder="Created Date"
        value={createdDate}
        onChange={(e) => setCreatedDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Policy Name"
        value={policyName}
        onChange={(e) => setPolicyName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Section No"
        value={sectionNo}
        onChange={(e) => setSectionNo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Gazette Number"
        value={gazetteNumber}
        onChange={(e) => setGazetteNumber(e.target.value)}
      />
      <input
        type="date"
        placeholder="Enforcement Date"
        value={enforcementDate}
        onChange={(e) => setEnforcementDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Authorized By"
        value={authorizedBy}
        onChange={(e) => setAuthorizedBy(e.target.value)}
      />
      <textarea
        placeholder="Additional Comments"
        value={additionalComments}
        onChange={(e) => setAdditionalComments(e.target.value)}
      />
      <button onClick={handleUpload}>Upload Policy</button>
    </div>
  );
};

export default UploadPolicy;