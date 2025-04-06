import React, { useState, useEffect } from "react";
import { firestore } from "../../../backend/firebase/firebase";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import Card from "components/card";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersCollection = collection(firestore, "users");
      const userSnapshot = await getDocs(usersCollection);
      const usersList = userSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const userRef = doc(firestore, "users", userId);
      await updateDoc(userRef, {
        role: newRole
      });
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const userRef = doc(firestore, "users", userId);
        await deleteDoc(userRef);
        fetchUsers(); // Refresh the list
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="mt-3 grid h-full">
      <Card extra="!p-[20px]">
        <div className="mb-8">
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            Manage Users
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
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-white">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-200">
                  <td className="px-6 py-4 text-sm text-navy-700 dark:text-white">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-navy-700 dark:text-white">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="rounded-lg border border-gray-300 bg-white px-2 py-1 text-sm dark:bg-navy-700 dark:text-white"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="super-admin">Super Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
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