import React, { useState, useEffect, useContext } from "react";
import { firestore } from "../../../backend/firebase/firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import Card from "components/card";
import axios from "axios";
import { SearchContext } from "context/SearchContext"; // Adjust the path to your actual context

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchText } = useContext(SearchContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const makeSuperAdmin = async (userId, userData) => {
    try {
      const adminRef = doc(firestore, "admin", userId);
      const adminSnap = await getDoc(adminRef);

      if (!adminSnap.exists()) {
        await setDoc(adminRef, {
          ...userData,
          role: "super-admin",
        });
        alert("User promoted to Super Admin!");
      } else {
        alert("User is already a Super Admin.");
      }
    } catch (error) {
      console.error("Error making user super admin:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/users/${userId}`);
        fetchUsers(); // Refresh the user list
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const filteredUsers = users.filter((user) =>
    (user.username || "")
      .toLowerCase()
      .includes(searchText.toLowerCase()) ||
    (user.email || "")
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="mt-3 grid h-full">
      <Card extra="!p-[20px]">
        

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-white">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-white">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200">
                  <td className="px-6 py-4 text-sm text-navy-700 dark:text-white">
                    {user.username || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-navy-700 dark:text-white">
                    {user.email || "N/A"}
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => makeSuperAdmin(user.id, user)}
                      className="rounded-lg bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                    >
                      Make Super Admin
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
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
      </Card>
    </div>
  );
};

export default ManageUsers;
