import React, { useState } from 'react';
import { storage, firestore } from '../../services/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import './UploadPolicy.scss';

const UploadPolicy = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [effectiveDate, setEffectiveDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [approvedBy, setApprovedBy] = useState('');
  const [approvalDate, setApprovalDate] = useState('');
  const [notes, setNotes] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [metadata, setMetadata] = useState('');

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!pdfFile) return;
    const storageRef = ref(storage, `policies/${pdfFile.name}`);
    await uploadBytes(storageRef, pdfFile);
    const downloadURL = await getDownloadURL(storageRef);

    const policyData = {
      title,
      description,
      category,
      tags: tags.split(',').map(tag => tag.trim()),  // Convert comma-separated tags to an array
      status,
      createdBy,
      assignedTo,
      createdDate,
      effectiveDate,
      expiryDate,
      isActive,
      approvedBy,
      approvalDate,
      pdfUrl: downloadURL,
      imageUrl,
      metadata: JSON.parse(metadata || '{}'), // Parse metadata if exists
      notes,
    };

    await addDoc(collection(firestore, 'policies'), policyData);
    console.log('Policy added successfully');
  };

  return (
    <div className="upload-policy">
      <h2>Upload New Policy</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
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
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <input
        type="text"
        placeholder="Created By"
        value={createdBy}
        onChange={(e) => setCreatedBy(e.target.value)}
      />
      <input
        type="text"
        placeholder="Assigned To"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      />
      <div className="date-field">
        <label>Created Date:</label>
        <input
          type="date"
          value={createdDate}
          onChange={(e) => setCreatedDate(e.target.value)}
        />
      </div>
      <div className="date-field">
        <label>Effective Date:</label>
        <input
          type="date"
          value={effectiveDate}
          onChange={(e) => setEffectiveDate(e.target.value)}
        />
      </div>
      <div className="date-field">
        <label>Expiry Date:</label>
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
      </div>
      <label>
        Is Active:
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
      </label>
      <input
        type="text"
        placeholder="Approved By"
        value={approvedBy}
        onChange={(e) => setApprovedBy(e.target.value)}
      />
      <div className="date-field">
        <label>Approval Date:</label>
        <input
          type="date"
          value={approvalDate}
          onChange={(e) => setApprovalDate(e.target.value)}
        />
      </div>
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      {/* <textarea
        placeholder="Metadata (JSON)"
        value={metadata}
        onChange={(e) => setMetadata(e.target.value)}
      /> */}
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button onClick={handleUpload}>Upload Policy</button>
    </div>
  );
};

export default UploadPolicy;