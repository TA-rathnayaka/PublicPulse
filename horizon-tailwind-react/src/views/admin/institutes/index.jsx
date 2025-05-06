import React, { useState, useEffect } from "react";
import { firestore } from "../../../backend/firebase/firebase";
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

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  instituteName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="bg-black fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
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
  const [editingInstitute, setEditingInstitute] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    location: "",
    logo: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({ id: null, name: "" });
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

  const handleAddInstitute = async (e) => {
    e.preventDefault();
    try {
      const institutesCollection = collection(firestore, "institutes");
      const docRef = await addDoc(institutesCollection, newInstitute);
      const newInstituteId = docRef.id;

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
      await updateDoc(instituteRef, editFormData);

      setShowEditModal(false);
      fetchInstitutes();
    } catch (error) {
      console.error("Error updating institute:", error);
    }
  };

  const handleDeleteClick = (institute) => {
    setItemToDelete({ id: institute.id, name: institute.name });
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // First remove from admins
      const adminId = user.uid;
      const adminRef = doc(firestore, "admins", adminId);

      const adminDoc = await getDoc(adminRef);
      if (adminDoc.exists()) {
        await updateDoc(adminRef, {
          institutes: adminDoc
            .data()
            .institutes.filter((id) => id !== itemToDelete.id),
        });
      }

      // Then delete the institute
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
          <input
            type="text"
            placeholder="Logo URL"
            value={newInstitute.logo}
            onChange={(e) =>
              setNewInstitute({ ...newInstitute, logo: e.target.value })
            }
            className="rounded-lg border border-gray-300 p-2 dark:bg-navy-700 dark:text-white"
          />
          <button
            type="submit"
            className="rounded-lg bg-brand-500 px-4 py-2 text-white transition-colors hover:bg-brand-600"
          >
            Add Institute
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
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="bg-black absolute inset-0 bg-opacity-50 backdrop-blur-sm"
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
                    Logo URL
                  </label>
                  <input
                    type="text"
                    name="logo"
                    value={editFormData.logo}
                    onChange={handleEditFormChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 dark:bg-navy-700 dark:text-white"
                  />
                </div>
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
