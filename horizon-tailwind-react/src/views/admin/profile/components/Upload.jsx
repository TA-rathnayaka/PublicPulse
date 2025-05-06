import React, { useState, useEffect, useRef } from "react";
import { firestore, storage } from "../../../backend/firebase/firebase";
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
import { getAuth } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "context/authContext";
import { MdFileUpload } from "react-icons/md"; // Use react-icons/md
import Card from "components/card"; // Import Card component

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, instituteName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-navy-800">
        <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
          Confirm Deletion
        </h3>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Are you sure you want to delete{" "}
          <span className="font-medium">"{instituteName}"</span>? This action
          cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-navy-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const ManageInstitutes = () => {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newInstitute, setNewInstitute] = useState({
    name: "",
    location: "",
    logo: "",
  });
  const [newLogoFile, setNewLogoFile] = useState(null);
  const [editingInstitute, setEditingInstitute] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    location: "",
    logo: "",
  });
  const [editLogoFile, setEditLogoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const { role, instituteIds } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({ id: null, name: "" });
  const auth = getAuth();
  const user = auth.currentUser;
  const isAdmin = role === "super-admin";

  // Refs for file inputs
  const newFileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  useEffect(() => {
    fetchInstitutes();
  }, [isAdmin, instituteIds]);

  const fetchInstitutes = async () => {
    try {
      let institutesList = [];
      const institutesCollection = collection(firestore, "institutes");

      if (isAdmin) {
        const instituteSnapshot = await getDocs(institutesCollection);
        institutesList = instituteSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } else if (instituteIds && instituteIds.length > 0) {
        for (const id of instituteIds) {
          const instituteDoc = await getDoc(doc(firestore, "institutes", id));
          if (instituteDoc.exists()) {
            institutesList.push({
              id: instituteDoc.id,
              ...instituteDoc.data(),
            });
          }
        }
      }

      setInstitutes(institutesList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching institutes:", error);
      setLoading(false);
    }
  };

  const uploadLogo = async (file, instituteId) => {
    if (!file) return null;

    try {
      const storageRef = ref(storage, `institutes/${instituteId}/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading logo:", error);
      throw error;
    }
  };

  const handleAddInstitute = async (e) => {
    e.preventDefault();
    setUploadProgress("Uploading...");
    try {
      const institutesCollection = collection(firestore, "institutes");
      const docRef = await addDoc(institutesCollection, {
        name: newInstitute.name,
        location: newInstitute.location,
        logo: "",
      });
      const newInstituteId = docRef.id;

      let logoUrl = "";
      if (newLogoFile) {
        logoUrl = await uploadLogo(newLogoFile, newInstituteId);
        await updateDoc(doc(firestore, "institutes", newInstituteId), { logo: logoUrl });
      }

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

      fetchInstitutes();
      setNewInstitute({ name: "", location: "", logo: "" });
      setNewLogoFile(null);
      setUploadProgress(null);
      if (newFileInputRef.current) newFileInputRef.current.value = ""; // Reset file input
    } catch (error) {
      console.error("Error adding institute or uploading logo:", error);
      setUploadProgress(null);
    }
  };

  const handleEditClick = (institute) => {
    setEditingInstitute(institute.id);
    setEditFormData({
      name: institute.name,
      location: institute.location,
      logo: institute.logo || "",
    });
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
    setUploadProgress("Uploading...");
    try {
      const instituteRef = doc(firestore, "institutes", editingInstitute);
      let updatedData = { ...editFormData };

      if (editLogoFile) {
        const logoUrl = await uploadLogo(editLogoFile, editingInstitute);
        updatedData.logo = logoUrl;
      }

      await updateDoc(instituteRef, updatedData);
      setShowEditModal(false);
      setUploadProgress(null);
      fetchInstitutes();
      if (editFileInputRef.current) editFileInputRef.current.value = ""; // Reset file input
    } catch (error) {
      console.error("Error updating institute:", error);
      setUploadProgress(null);
    }
  };

  const handleDeleteClick = (institute) => {
    setItemToDelete({ id: institute.id, name: institute.name });
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const adminId = user.uid;
      const adminRef = doc(firestore, "admins", adminId);
      const adminDoc = await getDoc(adminRef);
      if (adminDoc.exists()) {
        await updateDoc(adminRef, {
          institutes: adminDoc.data().institutes.filter((id) => id !== itemToDelete.id),
        });
      }

      const instituteRef = doc(firestore, "institutes", itemToDelete.id);
      await deleteDoc(instituteRef);

      fetchInstitutes();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting institute:", error);
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="mt-3 grid h-full gap-5">
      {/* Add New Institute Card */}
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
          <Card className="w-full rounded-xl bg-lightPrimary dark:!bg-navy-700">
            <button
              type="button"
              onClick={() => newFileInputRef.current.click()}
              className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700"
            >
              <MdFileUpload className="text-[80px] text-brand-500 dark:text-white" />
              <h4 className="text-xl font-bold text-brand-500 dark:text-white">
                Upload Logo
              </h4>
              <p className="mt-2 text-sm font-medium text-gray-600">
                PNG, JPG, and GIF files are allowed
              </p>
              {newLogoFile && (
                <p className="mt-2 text-sm font-medium text-gray-600">
                  Selected: {newLogoFile.name}
                </p>
              )}
            </button>
            <input
              type="file"
              accept="image/*"
              ref={newFileInputRef}
              onChange={(e) => setNewLogoFile(e.target.files[0])}
              className="hidden"
            />
          </Card>
          {uploadProgress && (
            <p className="text-sm text-gray-600 dark:text-gray-300">{uploadProgress}</p>
          )}
          <button
            type="submit"
            className="rounded-lg bg-brand-500 px-4 py-2 text-white transition-colors hover:bg-brand-600"
            disabled={uploadProgress}
          >
            Add Institute
          </button>
        </form>
      </div>

      {/* Manage Institutes Card */}
      <div className="rounded-[20px] bg-white p-[20px] shadow-md dark:bg-navy-800">
        <div className="mb-8">
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            {isAdmin ? "Manage Institutes" : "Your Institutes"}
          </h4>
        </div>

        {institutes.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-300">
            No institutes found.
          </div>
        ) : (
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
                        className="rounded-lg bg-blue-500 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(institute)}
                        className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white transition-colors hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setShowEditModal(false)}
          ></div>

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
                  <Card className="w-full rounded-xl bg-lightPrimary dark:!bg-navy-700">
                    <button
                      type="button"
                      onClick={() => editFileInputRef.current.click()}
                      className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700"
                    >
                      <MdFileUpload className="text-[80px] text-brand-500 dark:text-white" />
                      <h4 className="text-xl font-bold text-brand-500 dark:text-white">
                        Upload Logo
                      </h4>
                      <p className="mt-2 text-sm font-medium text-gray-600">
                        PNG, JPG, and GIF files are allowed
                      </p>
                      {editLogoFile ? (
                        <p className="mt-2 text-sm font-medium text-gray-600">
                          Selected: {editLogoFile.name}
                        </p>
                      ) : editFormData.logo ? (
                        <p className="mt-2 text-sm font-medium text-gray-600">
                          Current: <a href={editFormData.logo} target="_blank" className="text-brand-500">View Logo</a>
                        </p>
                      ) : null}
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={editFileInputRef}
                      onChange={(e) => setEditLogoFile(e.target.files[0])}
                      className="hidden"
                    />
                  </Card>
                </div>
                {uploadProgress && (
                  <p className="text-sm text-gray-600 dark:text-gray-300">{uploadProgress}</p>
                )}
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-navy-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-brand-500 px-4 py-2 text-white transition-colors hover:bg-brand-600"
                    disabled={uploadProgress}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        instituteName={itemToDelete.name}
      />
    </div>
  );
};

export default ManageInstitutes;