import React, { useState, useEffect } from "react";
import { firestore } from "../../../backend/firebase/firebase";
import { getDoc, setDoc,collection, getDocs, addDoc, updateDoc, doc, deleteDoc, arrayUnion } from "firebase/firestore";
import Card from "components/card";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

const ManageInstitutes = () => {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newInstitute, setNewInstitute] = useState({
    name: "",
    location: "",
    logo: "",
  });
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    fetchInstitutes();
  }, []);

  const fetchInstitutes = async () => {
    try {
      const institutesCollection = collection(firestore, "institutes");
      const instituteSnapshot = await getDocs(institutesCollection);
      const institutesList = instituteSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
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
        // Update existing document
        await updateDoc(adminRef, {
          institutes: arrayUnion(newInstituteId),
        });
      } else {
        // Create new document with role and initial institute
        await setDoc(adminRef, {
          role: "admin",
          institutes: [newInstituteId],
        });
      }
  
      fetchInstitutes();
      setNewInstitute({ name: "", location: "", logo: "" }); // reset form
    } catch (error) {
      console.error("Error adding institute or updating admin:", error);
    }
  };
  

  const handleUpdateInstitute = async (instituteId, updatedData) => {
    try {
      const instituteRef = doc(firestore, "institutes", instituteId);
      await updateDoc(instituteRef, updatedData);
      fetchInstitutes();
    } catch (error) {
      console.error("Error updating institute:", error);
    }
  };

  const handleDeleteInstitute = async (instituteId) => {
    if (window.confirm("Are you sure you want to delete this institute?")) {
      try {
        const instituteRef = doc(firestore, "institutes", instituteId);
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
      <Card extra="!p-[20px]">
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
            onChange={(e) => setNewInstitute({...newInstitute, name: e.target.value})}
            className="rounded-lg border border-gray-300 p-2 dark:bg-navy-700 dark:text-white"
          />
          <input
            type="text"
            placeholder="Location"
            value={newInstitute.location}
            onChange={(e) => setNewInstitute({...newInstitute, location: e.target.value})}
            className="rounded-lg border border-gray-300 p-2 dark:bg-navy-700 dark:text-white"
          />
          <input
            type="text"
            placeholder="Logo URL"
            value={newInstitute.logo}
            onChange={(e) => setNewInstitute({...newInstitute, logo: e.target.value})}
            className="rounded-lg border border-gray-300 p-2 dark:bg-navy-700 dark:text-white"
          />
          <button
            type="submit"
            className="rounded-lg bg-brand-500 px-4 py-2 text-white hover:bg-brand-600"
          >
            Add Institute
          </button>
        </form>
      </Card>

      <Card extra="!p-[20px]">
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
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteInstitute(institute.id)}
                      className="mr-2 rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleUpdateInstitute(institute.id, { /* updated data */ })}
                      className="rounded-lg bg-brand-500 px-3 py-1 text-sm text-white hover:bg-brand-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ManageInstitutes; 