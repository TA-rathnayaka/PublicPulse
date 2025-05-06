import React, { useState, useEffect, useRef } from "react";
import { firestore } from "../../../backend/firebase/firebase";
import { storage } from "../../../backend/firebase/firebase";
import {
  getDoc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  arrayUnion,
} from "firebase/firestore";
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { MdFileUpload } from "react-icons/md";
import Card from "components/card";

const ManageInstitutes = () => {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newInstitute, setNewInstitute] = useState({
    name: "",
    location: "",
  });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [editingInstitute, setEditingInstitute] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    location: "",
    logo: "",
  });
  const [editLogoFile, setEditLogoFile] = useState(null);
  const [editLogoPreview, setEditLogoPreview] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    fetchInstitutes();
  }, []);

  const fetchInstitutes = async () => {
    try {
      const institutesCollection = collection(firestore, "institutes");
      const instituteSnapshot = await getDocs(institutesCollection);
      const institutesList = instituteSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInstitutes(institutesList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching institutes:", error);
      setLoading(false);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadLogo = async (file, instituteId) => {
    if (!file) return null;
    
    try {
      setUploadingLogo(true);
      const storageRef = ref(storage, `institutes/${instituteId}/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setUploadingLogo(false);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading logo:", error);
      setUploadingLogo(false);
      return null;
    }
  };

  const handleAddInstitute = async (e) => {
    e.preventDefault();
    try {
      // First create the institute document to get an ID
      const institutesCollection = collection(firestore, "institutes");
      const instituteData = { ...newInstitute };
      
      // Add the institute to get its ID
      const docRef = await addDoc(institutesCollection, instituteData);
      const newInstituteId = docRef.id;
      
      // Upload logo if there is one
      if (logoFile) {
        const logoURL = await uploadLogo(logoFile, newInstituteId);
        if (logoURL) {
          // Update the institute with the logo URL
          await updateDoc(docRef, { logo: logoURL });
        }
      }

      // Update admin's institutes list
      const adminId = user.uid;
      const adminRef = doc(firestore, "admins", adminId);
      const adminDoc = await getDoc(adminRef);

      if (adminDoc.exists()) {
        await updateDoc(adminRef, {
          institutes: arrayUnion(newInstituteId),
        });
      } else {
        await setDoc(adminRef, {
          role: "admin",
          institutes: [newInstituteId],
        });
      }

      // Reset form and refetch institutes
      setNewInstitute({ name: "", location: "" });
      setLogoFile(null);
      setLogoPreview(null);
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      fetchInstitutes();
    } catch (error) {
      console.error("Error adding institute or updating admin:", error);
    }
  };

  const handleEditClick = (institute) => {
    setEditingInstitute(institute.id);
    setEditFormData({
      name: institute.name,
      location: institute.location,
      logo: institute.logo || "",
    });
    setEditLogoPreview(institute.logo || null);
    setEditLogoFile(null);
    setShowEditModal(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleUpdateInstitute = async (e) => {
    e.preventDefault();
    try {
      const instituteRef = doc(firestore, "institutes", editingInstitute);
      
      // If there's a new logo file, upload it
      if (editLogoFile) {
        const logoURL = await uploadLogo(editLogoFile, editingInstitute);
        if (logoURL) {
          setEditFormData({
            ...editFormData,
            logo: logoURL,
          });
          await updateDoc(instituteRef, {
            ...editFormData, 
            logo: logoURL
          });
        } else {
          await updateDoc(instituteRef, editFormData);
        }
      } else {
        await updateDoc(instituteRef, editFormData);
      }

      // Reset the file input
      if (editFileInputRef.current) {
        editFileInputRef.current.value = '';
      }
      
      setEditLogoFile(null);
      setShowEditModal(false);
      fetchInstitutes();
    } catch (error) {
      console.error("Error updating institute:", error);
    }
  };

  const handleDeleteInstitute = async (instituteId) => {
    if (window.confirm("Are you sure you want to delete this institute?")) {
      try {
        // First get the institute to see if it has a logo
        const instituteRef = doc(firestore, "institutes", instituteId);
        const instituteSnap = await getDoc(instituteRef);
        
        if (instituteSnap.exists()) {
          const institute = instituteSnap.data();
          
          // Delete logo from storage if it exists
          if (institute.logo) {
            try {
              // Extract the path from the URL to create a reference
              const url = new URL(institute.logo);
              const pathMatch = url.pathname.match(/\/o\/(.+?)(\?|$)/);
              
              if (pathMatch && pathMatch[1]) {
                const decodedPath = decodeURIComponent(pathMatch[1]);
                const storageRef = ref(storage, decodedPath);
                await deleteObject(storageRef);
              }
            } catch (error) {
              console.error("Error deleting logo file:", error);
              // Continue with deletion even if logo deletion fails
            }
          }
        }
        
        // Remove institute from admin's list
        const adminId = user.uid;
        const adminRef = doc(firestore, "admins", adminId);

        const adminDoc = await getDoc(adminRef);
        if (adminDoc.exists()) {
          await updateDoc(adminRef, {
            institutes: adminDoc
              .data()
              .institutes.filter((id) => id !== instituteId),
          });
        }

        // Delete the institute document
        await deleteDoc(instituteRef);
        fetchInstitutes();
      } catch (error) {
        console.error("Error deleting institute:", error);
      }
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="mt-3 grid h-full gap-5">
      {/* Add Institute Card */}
      <div className="rounded-[20px] bg-white p-[20px] shadow-md dark:bg-navy-800">
        <div className="mb-8">
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            Add New Institute
          </h4>
        </div>

        <form onSubmit={handleAddInstitute} className="grid gap-4">
          <input
            type="text"
            placeholder="Institute Name"
            value={newInstitute.name}
            onChange={(e) =>
              setNewInstitute({ ...newInstitute, name: e.target.value })
            }
            className="rounded-lg border border-gray-300 p-2 dark:bg-navy-700 dark:text-white"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={newInstitute.location}
            onChange={(e) =>
              setNewInstitute({ ...newInstitute, location: e.target.value })
            }
            className="rounded-lg border border-gray-300 p-2 dark:bg-navy-700 dark:text-white"
            required
          />
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Institute Logo
            </label>
            <Card className="w-full rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
              <div className="h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700">
                <input
                  type="file"
                  id="logo-upload"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                <label 
                  htmlFor="logo-upload" 
                  className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700"
                >
                  {logoPreview ? (
                    <div className="flex flex-col items-center">
                      <img 
                        src={logoPreview} 
                        alt="Logo Preview" 
                        className="h-20 w-20 rounded-lg object-cover"
                      />
                      <p className="mt-2 text-xs font-medium text-gray-600">
                        Click to change image
                      </p>
                    </div>
                  ) : (
                    <>
                      <MdFileUpload className="text-[40px] text-brand-500 dark:text-white" />
                      <h4 className="text-sm font-bold text-brand-500 dark:text-white">
                        Upload Logo
                      </h4>
                      <p className="mt-1 text-xs font-medium text-gray-600">
                        PNG, JPG and GIF files are allowed
                      </p>
                    </>
                  )}
                </label>
              </div>
            </Card>
          </div>
          
          <button
            type="submit"
            disabled={uploadingLogo}
            className="rounded-lg bg-brand-500 px-4 py-2 text-white hover:bg-brand-600 disabled:bg-gray-400"
          >
            {uploadingLogo ? "Uploading..." : "Add Institute"}
          </button>
        </form>
      </div>

      {/* Manage Institutes Card */}
      <div className="rounded-[20px] bg-white p-[20px] shadow-md dark:bg-navy-800">
        <div className="mb-8">
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            Manage Institutes
          </h4>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-white">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-white">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-white">
                  Logo
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {institutes.map((institute) => (
                <tr key={institute.id} className="border-b border-gray-200">
                  <td className="px-6 py-4 text-sm text-navy-700 dark:text-white">
                    {institute.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-navy-700 dark:text-white">
                    {institute.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-navy-700 dark:text-white">
                    {institute.logo ? (
                      <img
                        src={institute.logo}
                        alt="Institute Logo"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      "No logo"
                    )}
                  </td>
                  <td className="flex space-x-2 px-6 py-4">
                    <button
                      onClick={() => handleEditClick(institute)}
                      className="rounded-lg bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteInstitute(institute.id)}
                      className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal - Centered on Full Screen with Blurred Background */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blurred Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setShowEditModal(false)}
          ></div>

          {/* Centered Modal Content */}
          <div className="relative z-50 mx-4 w-full max-w-md">
            <div className="rounded-lg bg-white p-6 shadow-xl dark:bg-navy-800">
              <h3 className="mb-4 text-xl font-bold text-navy-700 dark:text-white">
                Edit Institute
              </h3>
              <form onSubmit={handleUpdateInstitute} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Institute Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 dark:bg-navy-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={editFormData.location}
                    onChange={handleEditFormChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 dark:bg-navy-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Institute Logo
                  </label>
                  <Card className="mt-1 w-full rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
                    <div className="h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700">
                      <input
                        type="file"
                        id="edit-logo-upload"
                        accept="image/*"
                        onChange={handleEditLogoChange}
                        className="hidden"
                        ref={editFileInputRef}
                      />
                      <label 
                        htmlFor="edit-logo-upload" 
                        className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700"
                      >
                        {editLogoPreview ? (
                          <div className="flex flex-col items-center">
                            <img 
                              src={editLogoPreview} 
                              alt="Logo Preview" 
                              className="h-20 w-20 rounded-lg object-cover"
                            />
                            <p className="mt-2 text-xs font-medium text-gray-600">
                              Click to change image
                            </p>
                          </div>
                        ) : (
                          <>
                            <MdFileUpload className="text-[40px] text-brand-500 dark:text-white" />
                            <h4 className="text-sm font-bold text-brand-500 dark:text-white">
                              Upload Logo
                            </h4>
                            <p className="mt-1 text-xs font-medium text-gray-600">
                              PNG, JPG and GIF files are allowed
                            </p>
                          </>
                        )}
                      </label>
                    </div>
                  </Card>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploadingLogo}
                    className="rounded-lg bg-brand-500 px-4 py-2 text-white hover:bg-brand-600 disabled:bg-gray-400"
                  >
                    {uploadingLogo ? "Uploading..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageInstitutes;