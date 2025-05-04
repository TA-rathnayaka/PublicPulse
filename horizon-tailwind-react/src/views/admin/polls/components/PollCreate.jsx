import { useState } from 'react';
import { Upload, PlusCircle, Trash2 } from 'lucide-react';
import { usePoll } from 'context/PollContext'; // Assuming the import path is correct
import Card from "components/card";

export default function PollCreationForm() {
  const { createPoll, loading } = usePoll();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [notifyUsers, setNotifyUsers] = useState(false);
  const [expiryDate, setExpiryDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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

  // Add a new option field
  const addOption = () => {
    setOptions([...options, '']);
  };

  // Remove an option field
  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    }
  };

  // Update option value
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (!title.trim()) {
      setError('Poll title is required');
      return;
    }

    if (options.filter(opt => opt.trim() !== '').length < 2) {
      setError('At least two non-empty options are required');
      return;
    }

    try {
      const pollData = {
        title: title.trim(),
        description: description.trim(),
        options: options.filter(opt => opt.trim() !== ''),
        imageFile,
        settings: {
          notifyUsers
        },
        expiryDate: expiryDate ? new Date(expiryDate) : null
      };

      const result = await createPoll(pollData);
      
      if (result) {
        setSuccess(true);
        // Reset form
        setTitle('');
        setDescription('');
        setOptions(['', '']);
        setImageFile(null);
        setImagePreview(null);
        setNotifyUsers(false);
        setExpiryDate('');
      }
    } catch (err) {
      setError(err.message || 'Failed to create poll');
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
          Poll created successfully!
        </div>
      )}
      
      <Card extra={"w-full h-full p-3"}>
        {/* Header */}
        <div className="mt-2 mb-8 w-full">
          <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
            Create New Poll
          </h4>
          <p className="mt-2 px-2 text-base text-gray-600 dark:text-gray-300">
            Fill in the details below to create a new poll. Make sure to add at least two options.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
          {/* Poll Information Section */}
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-lg font-medium text-navy-700 dark:text-white mb-4">Poll Information</p>
            <div className="w-full space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Poll Title*</p>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., What's your favorite programming language?" 
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-navy-500 focus:border-navy-500 bg-white dark:bg-navy-800 text-navy-700 dark:text-white"
                />
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Description</p>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description about the poll" 
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-navy-500 focus:border-navy-500 bg-white dark:bg-navy-800 text-navy-700 dark:text-white h-24"
                />
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Expiry Date</p>
                <input 
                  type="datetime-local" 
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-navy-500 focus:border-navy-500 bg-white dark:bg-navy-800 text-navy-700 dark:text-white"
                />
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="notifyUsers"
                  checked={notifyUsers}
                  onChange={(e) => setNotifyUsers(e.target.checked)}
                  className="h-4 w-4 text-navy-600 focus:ring-navy-500 border-gray-300 dark:border-gray-600 rounded dark:bg-navy-800"
                />
                <label htmlFor="notifyUsers" className="ml-2 block text-sm text-gray-600 dark:text-gray-300">
                  Notify users when poll is created
                </label>
              </div>
            </div>
          </div>
          
          {/* Poll Image Section */}
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-lg font-medium text-navy-700 dark:text-white mb-4">Poll Image</p>
            
            {imagePreview ? (
              <div className="mb-4 w-full">
                <img 
                  src={imagePreview} 
                  alt="Poll preview" 
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
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 bg-white dark:bg-navy-800 w-full">
                <div className="mb-4">
                  <Upload className="w-12 h-12 text-navy-600 dark:text-navy-400" />
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
                <p className="text-sm text-gray-500 dark:text-gray-400">1600 x 1200 (4:3) recommended. PNG, JPG and GIF files are allowed</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Poll Options Section */}
        <div className="mt-4 px-2">
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-lg font-medium text-navy-700 dark:text-white mb-2">Poll Options</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Add at least two options for your poll</p>
            
            <div className="space-y-3 w-full">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-navy-500 focus:border-navy-500 bg-white dark:bg-navy-800 text-navy-700 dark:text-white"
                  />
                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="p-2 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={addOption}
                className="flex items-center text-navy-600 dark:text-navy-400 font-medium mt-2 hover:text-navy-800 dark:hover:text-navy-300"
              >
                <PlusCircle className="w-5 h-5 mr-1" /> Add another option
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-6 px-2">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={`px-6 py-2 bg-navy-600 dark:bg-navy-700 text-white rounded-md hover:bg-navy-700 dark:hover:bg-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Creating Poll...' : 'Create Poll'}
          </button>
        </div>
      </Card>
    </div>
  );
}