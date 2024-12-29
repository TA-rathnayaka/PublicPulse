import React, { useState } from 'react';
import { storage, firestore } from '../../services/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import './UploadPolicy.scss';

const UploadPolicy = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [policyName, setPolicyName] = useState('');
  const [sectionNo, setSectionNo] = useState('');

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
    };

    await addDoc(collection(firestore, 'policies'), policyData);
    console.log('Policy added successfully');
  };

  return (
    <div className="upload-policy">
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
      <button onClick={handleUpload}>Upload Policy</button>
    </div>
  );
};

export default UploadPolicy;