import { useState } from 'react';
import { Upload, PlusCircle, Trash2, FileText, Image } from 'lucide-react';
import { usePolicy } from 'context/PolicyContext';
import Card from "components/card";

export default function PolicyCreationForm() {
  const { createPolicy, loading } = usePolicy();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('draft');
  const [tags, setTags] = useState(['']);
  const [effectiveDate, setEffectiveDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [approvalDate, setApprovalDate] = useState('');
  const [approvedBy, setApprovedBy] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [createdDate, setCreatedDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [isActive, setIsActive] = useState(true);
  
  // For file uploads
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileName, setPdfFileName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  // For metadata (using a simple key-value structure)
  const [metadataKey, setMetadataKey] = useState('');
  const [metadataValue, setMetadataValue] = useState('');
  const [metadata, setMetadata] = useState({});
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Status options
  const statusOptions = [
    'draft',
    'pending_review', 
    'approved',
    'published',
    'archived',
    'rejected'
  ];

  // Handle PDF upload
  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(file);
      setPdfFileName(file.name);
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add a new tag field
  const addTag = () => {
    setTags([...tags, '']);
  };

  // Remove a tag field
  const removeTag = (index) => {
    if (tags.length > 1) {
      const newTags = [...tags];
      newTags.splice(index, 1);
      setTags(newTags);
    }
  };

  // Update tag value
  const handleTagChange = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  // Add metadata entry
  const addMetadata = () => {
    if (metadataKey.trim() !== '') {
      setMetadata({
        ...metadata,
        [metadataKey]: metadataValue
      });
      setMetadataKey('');
      setMetadataValue('');
    }
  };

  // Remove metadata entry
  const removeMetadata = (key) => {
    const newMetadata = { ...metadata };
    delete newMetadata[key];
    setMetadata(newMetadata);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (!title.trim()) {
      setError('Policy title is required');
      return;
    }

    if (!category) {
      setError('Please enter a policy category');
      return;
    }

    try {
      const policyData = {
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        status,
        tags: tags.filter(tag => tag.trim() !== ''),
        effectiveDate,
        expiryDate,
        approvalDate,
        approvedBy: approvedBy.trim(),
        assignedTo: assignedTo.trim(),
        createdBy: createdBy.trim(),
        createdDate,
        notes: notes.trim(),
        isActive,
        metadata,
        pdfFile,
        imageFile
      };

      const result = await createPolicy(policyData);
      
      if (result) {
        setSuccess(true);
        // Reset form
        setTitle('');
        setDescription('');
        setCategory('');
        setStatus('draft');
        setTags(['']);
        setEffectiveDate('');
        setExpiryDate('');
        setApprovalDate('');
        setApprovedBy('');
        setAssignedTo('');
        setCreatedBy('');
        setNotes('');
        setPdfFile(null);
        setPdfFileName('');
        setImageFile(null);
        setImagePreview(null);
        setMetadata({});
      }
    } catch (err) {
      setError(err.message || 'Failed to create policy');
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-6xl mx-auto my-5">
      {error && (
        <div className="bg-red-50 dark:bg-navy-700 p-4 rounded-lg border border-red-300 dark:border-red-600 text-red-700 dark:text-red-400">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 dark:bg-navy-700 p-4 rounded-lg border border-green-300 dark:border-green-600 text-green-700 dark:text-green-400">
          Policy created successfully!
        </div>
      )}
      
      <Card extra={"w-full h-full p-3"}>
        {/* Header */}
        <div className="mt-2 mb-8 w-full">
          <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
            Create New Policy
          </h4>
          <p className="mt-2 px-2 text-base text-gray-600 dark:text-gray-300">
            Fill in the details below to create a new policy. Required fields are marked with an asterisk (*).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
          {/* Basic Policy Information */}
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-lg font-medium text-navy-700 dark:text-white mb-4">Basic Information</p>
            <div className="w-full space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Title*</p>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Policy title" 
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-navy-500 focus:border-navy-500 bg-white dark:bg-navy-800 text-navy-700 dark:text-white"
                />
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Description</p>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description about the policy" 
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-navy-500 focus:border-navy-500 bg-white dark:bg-navy-800 text-navy-700 dark:text-white h-24"
                />
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Category*</p>
                <input 
                  type="text" 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Policy category" 
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-navy-500 focus:border-navy-500 bg-white dark:bg-navy-800 text-navy-700 dark:text-white"
                />
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</p>
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-navy-500 focus:border-navy-500 bg-white dark:bg-navy-800 text-navy-700 dark:text-white"
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>{option.replace('_', ' ')}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Notes</p>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Additional notes" 
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-navy-500 focus:border-navy-500 bg-white dark:bg-navy-800 text-navy-700 dark:text-white h-16"
                />
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="isActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4 text-navy-600 focus:ring-navy-500 border-gray-300 dark:border-gray-600 rounded dark:bg-navy-800"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-600 dark:text-gray-300">
                  Policy is active
                </label>
              </div>
            </div>
          </div>
          
          {/* Dates and Assignment Section */}
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-lg font-medium text-navy-700 dark:text-white mb-4">Dates & Assignment</p>
            <div className="w-full space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Created By</p>
                <input 
                  type="text" 
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
                  placeholder="User who created the policy" 
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-navy-500 focus:border-navy-500 bg-white dark:bg-navy-800 text-navy-700 dark:text-white"
                />
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Created Date</p>
                <input 
                  type="date" 
                  value={createdDate}
                  onChange={(e) => setCreatedDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-navy-500 focus:border-navy-500 bg-white dark:bg-navy-800 text-navy-700 dark:text-white"
                />
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Assigned To</p>
                <input 
                  type="text" 
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  placeholder="User(s) assigned to review" 
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-navy-500 focus:border-navy-500 bg-white dark:bg-navy-800 text-navy-700 dark:text-white"
                />
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Approved By</p>
                <input 
                  type="text" 
                  value={approvedBy}
                  onChange={(e) => setApprovedBy(e.target.value)}
                  placeholder="User who approved the policy" 
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-navy-500 focus:border-navy-500 bg-white dark:bg-navy-800 text-navy-700 dark:text-white"
                />
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Approval Date</p>
                <input 
                  type="date" 
                  value={approvalDate}
                  onChange={(e) => setApprovalDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-navy-500 focus:border-navy-500 bg-white dark:bg-navy-800 text-navy-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Effective Dates */}
        <div className="mt-4 px-2">
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-lg font-medium text-navy-700 dark:text-white mb-4">Policy Timeframe</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Effective Date</p>
                <input 
                  type="date" 
                  value={effectiveDate}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-navy-500 focus:border-navy-500 bg-white dark:bg-navy-800 text-navy-700 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">When the policy goes into effect</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Expiry Date</p>
                <input 
                  type="date" 
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-navy-500 focus:border-navy-500 bg-white dark:bg-navy-800 text-navy-700 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">When the policy will expire</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Policy Files Section */}
        <div className="mt-4 px-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* PDF Upload */}
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-lg font-medium text-navy-700 dark:text-white mb-4">Policy Document</p>
              
              {pdfFileName ? (
                <div className="mb-4 w-full">
                  <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-navy-800 flex items-center">
                    <FileText className="w-6 h-6 text-navy-600 dark:text-navy-400 mr-2" />
                    <span className="flex-1 text-gray-700 dark:text-white truncate">{pdfFileName}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setPdfFile(null);
                        setPdfFileName('');
                      }}
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    You can remove the document and upload a different one if needed.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 bg-white dark:bg-navy-800 w-full">
                  <div className="mb-3">
                    <FileText className="w-10 h-10 text-navy-600 dark:text-navy-400" />
                  </div>
                  <p className="text-gray-700 dark:text-white mb-1">Drop your PDF document here, or
                    <label className="text-navy-600 dark:text-navy-400 font-medium cursor-pointer ml-1">
                      browse
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handlePdfUpload}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">PDF files only</p>
                </div>
              )}
            </div>
            
            {/* Image Upload */}
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-lg font-medium text-navy-700 dark:text-white mb-4">Policy Image</p>
              
              {imagePreview ? (
                <div className="mb-4 w-full">
                  <img 
                    src={imagePreview} 
                    alt="Policy preview" 
                    className="w-full h-auto rounded-md max-h-48 object-contain border dark:border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="mt-2 flex items-center text-red-600 dark:text-red-400 text-sm"
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Remove image
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 bg-white dark:bg-navy-800 w-full">
                  <div className="mb-3">
                    <Image className="w-10 h-10 text-navy-600 dark:text-navy-400" />
                  </div>
                  <p className="text-gray-700 dark:text-white mb-1">Drop your image here, or
                    <label className="text-navy-600 dark:text-navy-400 font-medium cursor-pointer ml-1">
                      browse
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">PNG, JPG and GIF files are allowed</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Policy Tags Section */}
        <div className="mt-4 px-2">
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-lg font-medium text-navy-700 dark:text-white mb-2">Policy Tags</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Add tags to make your policy easier to find</p>
            
            <div className="space-y-3 w-full">
              {tags.map((tag, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                    placeholder={`Tag ${index + 1}`}
                    className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-navy-500 focus:border-navy-500 bg-white dark:bg-navy-800 text-navy-700 dark:text-white"
                  />
                  {tags.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="p-2 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={addTag}
                className="flex items-center text-navy-600 dark:text-navy-400 font-medium mt-2 hover:text-navy-800 dark:hover:text-navy-300"
              >
                <PlusCircle className="w-5 h-5 mr-1" /> Add another tag
              </button>
            </div>
          </div>
        </div>
        
        {/* Metadata Section */}
        <div className="mt-4 px-2">
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-lg font-medium text-navy-700 dark:text-white mb-2">Metadata</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Add custom metadata key-value pairs</p>
            
            {/* Add metadata form */}
            <div className="flex items-end gap-2 w-full mb-4">
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Key</p>
                <input 
                  type="text" 
                  value={metadataKey}
                  onChange={(e) => setMetadataKey(e.target.value)}
                  placeholder="Metadata key"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-navy-500 focus:border-navy-500 bg-white dark:bg-navy-800 text-navy-700 dark:text-white"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Value</p>
                <input 
                  type="text" 
                  value={metadataValue}
                  onChange={(e) => setMetadataValue(e.target.value)}
                  placeholder="Metadata value"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-navy-500 focus:border-navy-500 bg-white dark:bg-navy-800 text-navy-700 dark:text-white"
                />
              </div>
              <button
                type="button"
                onClick={addMetadata}
                className="px-4 py-2 bg-navy-600 dark:bg-navy-700 text-white rounded-md hover:bg-navy-700 dark:hover:bg-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-500"
              >
                Add
              </button>
            </div>
            
            {/* Display existing metadata entries */}
            {Object.keys(metadata).length > 0 && (
              <div className="w-full bg-gray-50 dark:bg-navy-800 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider py-2">Key</th>
                      <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider py-2">Value</th>
                      <th className="text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(metadata).map(([key, value]) => (
                      <tr key={key} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="py-2 text-sm text-gray-700 dark:text-gray-300">{key}</td>
                        <td className="py-2 text-sm text-gray-700 dark:text-gray-300">{value}</td>
                        <td className="py-2 text-right">
                          <button
                            type="button"
                            onClick={() => removeMetadata(key)}
                            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end mt-6 px-2">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={`px-6 py-2 bg-navy-600 dark:bg-navy-700 text-white rounded-md hover:bg-navy-700 dark:hover:bg-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Creating Policy...' : 'Create Policy'}
          </button>
        </div>
      </Card>
    </div>
  );
}