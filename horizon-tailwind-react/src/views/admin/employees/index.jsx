import React, { useState, useEffect, useContext } from "react";
import { firestore } from "../../../backend/firebase/firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  query,
  where
} from "firebase/firestore";
import Card from "components/card";
import axios from "axios";
import { SearchContext } from "context/SearchContext";
import { useInstituteData } from "context/InstituteContext";
import { useAuth } from "context/authContext";

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchText } = useContext(SearchContext);
  const { user } = useAuth() // Assuming AuthContext provides current user info
  const {instituteId} = useInstituteData();

  useEffect(() => {
    
      fetchEmployees();
    
  }, [user]);

  const fetchEmployees = async () => {
    if (!instituteId) {
      setLoading(false);
      return;
    }

    try {
      // Query users collection for users with the current institute in their institutes array
      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("institutes", "array-contains", instituteId));
      const querySnapshot = await getDocs(q);
      
      const employeesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Check if each user is an admin for this institute
      for (const employee of employeesList) {
        const adminRef = doc(firestore, "admins", employee.id);
        const adminSnap = await getDoc(adminRef);
        
        if (adminSnap.exists()) {
          const adminData = adminSnap.data();
          employee.isAdmin = adminData.role === "admin" && 
            (adminData.institutes && adminData.institutes.includes(instituteId));
          employee.isSuperAdmin = adminData.role === "super-admin";
        } else {
          employee.isAdmin = false;
          employee.isSuperAdmin = false;
        }
      }
      
      setEmployees(employeesList);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const makeAdmin = async (userId) => {
    if (!instituteId) return;
    
    try {
      const adminRef = doc(firestore, "admins", userId);
      const adminSnap = await getDoc(adminRef);

      if (!adminSnap.exists()) {
        // Create new admin document
        await setDoc(adminRef, {
          role:'admin',
          institutes: [instituteId]
        });
        alert("User has been made an admin for this institute!");
      } else {
        // Update existing admin document
        const adminData = adminSnap.data();
        
        // If already a super-admin, don't change role
        const role = adminData.role === "super-admin" ? "super-admin" : "admin";
        
        // Add current institute to institutes array if not already there
        const institutes = adminData.institutes || [];
        if (!institutes.includes(instituteId)) {
          await updateDoc(adminRef, {
            role: role,
            institutes: arrayUnion(instituteId)
          });
          alert("User has been made an admin for this institute!");
        } else {
          alert("User is already an admin for this institute.");
        }
      }
      
      // Refresh the employee list
      fetchEmployees();
    } catch (error) {
      console.error("Error making user admin:", error);
      alert("Failed to make user an admin. Please try again.");
    }
  };

  const removeAdmin = async (userId) => {
    if (!instituteId) return;
    
    try {
      const adminRef = doc(firestore, "admins", userId);
      const adminSnap = await getDoc(adminRef);

      if (adminSnap.exists()) {
        const adminData = adminSnap.data();
        
        // If super-admin, don't modify
        if (adminData.role === "super-admin") {
          alert("Cannot modify super-admin status from here.");
          return;
        }
        
        // Remove current institute from institutes array
        const updatedInstitutes = (adminData.institutes || []).filter(
          id => id !== instituteId
        );
        
        if (updatedInstitutes.length === 0) {
          // If no institutes left, delete the admin document
          await deleteDoc(adminRef);
        } else {
          // Update with remaining institutes
          await updateDoc(adminRef, {
            institutes: updatedInstitutes
          });
        }
        
        alert("Admin privileges removed for this institute.");
        fetchEmployees();
      }
    } catch (error) {
      console.error("Error removing admin privileges:", error);
      alert("Failed to remove admin privileges. Please try again.");
    }
  };

  const handleDeleteEmployee = async (userId) => {
    if (!instituteId) return;
    
    if (window.confirm("Are you sure you want to remove this employee from the institute?")) {
      try {
        const userRef = doc(firestore, "users", userId);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const userData = userSnap.data();
          const updatedInstitutes = (userData.institutes || []).filter(
            id => id !== instituteId
          );
          
          await updateDoc(userRef, {
            institutes: updatedInstitutes
          });
          
          // Also remove from admin collection for this institute if they are an admin
          const adminRef = doc(firestore, "admins", userId);
          const adminSnap = await getDoc(adminRef);
          
          if (adminSnap.exists()) {
            const adminData = adminSnap.data();
            if (adminData.role !== "super-admin") {
              const updatedAdminInstitutes = (adminData.institutes || []).filter(
                id => id !== instituteId
              );
              
              if (updatedAdminInstitutes.length === 0) {
                await deleteDoc(adminRef);
              } else {
                await updateDoc(adminRef, {
                  institutes: updatedAdminInstitutes
                });
              }
            }
          }
          
          alert("Employee removed from institute successfully!");
          fetchEmployees();
        }
      } catch (error) {
        console.error("Error removing employee:", error);
        alert("Failed to remove employee. Please try again.");
      }
    }
  };

  const filteredEmployees = employees.filter((employee) =>
    (employee.username || "")
      .toLowerCase()
      .includes(searchText.toLowerCase()) ||
    (employee.email || "")
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!instituteId) {
    return <div className="text-white">No institute selected. Please select an institute first.</div>;
  }

  return (
    <div className="mt-3 grid h-full">
  <Card extra="rounded-xl shadow-md !p-6 bg-white dark:bg-navy-800">
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="border-b border-navy-700 dark:border-white">
            <th className="px-6 py-3 text-left text-sm font-semibold text-navy-700 dark:text-white">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-navy-700 dark:text-white">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-navy-700 dark:text-white">Status</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-navy-700 dark:text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <tr
                key={employee.id}
                className="border-b border-navy-700 dark:border-white hover:bg-gray-50 dark:hover:bg-navy-700 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-navy-700 dark:text-white">{employee.username || "N/A"}</td>
                <td className="px-6 py-4 text-sm text-navy-700 dark:text-white">{employee.email || "N/A"}</td>
                <td className="px-6 py-4 text-sm text-navy-700 dark:text-white">
                  <span className="rounded-md border border-navy-700 dark:border-white px-2 py-0.5 text-xs">
                    {employee.isSuperAdmin
                      ? "Super Admin"
                      : employee.isAdmin
                      ? "Admin"
                      : "Employee"}
                  </span>
                </td>
                <td className="px-6 py-4 flex flex-wrap gap-2">
                  {!employee.isAdmin && !employee.isSuperAdmin && (
                    <button
                      onClick={() => makeAdmin(employee.id, employee)}
                      className="rounded-md border border-navy-700 px-3 py-1 text-sm text-navy-700 hover:bg-navy-100 dark:border-white dark:text-white dark:hover:bg-white/10"
                    >
                      Make Admin
                    </button>
                  )}
                  {employee.isAdmin && !employee.isSuperAdmin && (
                    <button
                      onClick={() => removeAdmin(employee.id)}
                      className="rounded-md border border-navy-700 px-3 py-1 text-sm text-navy-700 hover:bg-navy-100 dark:border-white dark:text-white dark:hover:bg-white/10"
                    >
                      Remove Admin
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteEmployee(employee.id)}
                    className="rounded-md border border-navy-700 px-3 py-1 text-sm text-navy-700 hover:bg-navy-100 dark:border-white dark:text-white dark:hover:bg-white/10"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="px-6 py-4 text-center text-sm text-navy-500 dark:text-white/50"
              >
                No employees found for this institute.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </Card>
</div>



  );
};

export default ManageEmployees;