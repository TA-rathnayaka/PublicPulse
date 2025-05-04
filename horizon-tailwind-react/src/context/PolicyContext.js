import React, { useState, useEffect, createContext, useContext, useCallback } from "react"; 
import { 
  collection, 
  getDocs, 
  deleteDoc, 
  doc, 
  getDoc, 
  query, 
  where, 
  orderBy,
  addDoc,
  updateDoc,
  serverTimestamp 
} from "firebase/firestore"; 
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { firestore, storage } from "../services/firebaseConfig";  

const PolicyContext = createContext();  

export const usePolicyContext = () => useContext(PolicyContext);  

// Helper alias for compatibility with components
export const usePolicy = () => useContext(PolicyContext);  

export const PolicyProvider = ({ children, instituteId }) => {   
  const [policies, setPolicies] = useState([]);   
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState(null);
  // Cache for storing fetched policy details
  const [policyCache, setPolicyCache] = useState({});
  // Filter and sort states
  const [filters, setFilters] = useState({
    category: null,
    status: null,
    effectiveDateFrom: null,
    effectiveDateTo: null,
    expiryDateFrom: null,
    expiryDateTo: null,
    isActive: null,
    tags: []
  });
  const [sortBy, setSortBy] = useState({ field: 'createdAt', direction: 'desc' });
      
  // Main function to fetch policies with optional filtering
  const fetchPolicies = useCallback(async (customFilters = null) => {     
    try {       
      setLoading(true);
      setError(null);
      console.log("Fetching policies for institute:", instituteId);
      
      if (!instituteId) {
        console.log("Institute ID is not available yet");
        setLoading(false);
        return [];
      }
      
      // Start with a base query for this institute
      let policiesQuery = query(
        collection(firestore, "policies"),
        where("instituteId", "==", instituteId)
      );
      
      // Apply filters if provided
      const filtersToApply = customFilters || filters;
      
      // Execute the query
      const policiesSnapshot = await getDocs(policiesQuery);       
      let policiesData = policiesSnapshot.docs.map(doc => ({           
        id: doc.id,           
        ...doc.data(),         
      }));
      
      // Apply client-side filtering for complex filters
      if (filtersToApply) {
        if (filtersToApply.category) {
          policiesData = policiesData.filter(policy => 
            policy.category && policy.category.toLowerCase().includes(filtersToApply.category.toLowerCase())
          );
        }
        
        if (filtersToApply.status) {
          policiesData = policiesData.filter(policy => policy.status === filtersToApply.status);
        }
        
        if (filtersToApply.effectiveDateFrom) {
          const fromDate = new Date(filtersToApply.effectiveDateFrom);
          policiesData = policiesData.filter(policy => 
            policy.effectiveDate && new Date(policy.effectiveDate) >= fromDate
          );
        }
        
        if (filtersToApply.effectiveDateTo) {
          const toDate = new Date(filtersToApply.effectiveDateTo);
          policiesData = policiesData.filter(policy => 
            policy.effectiveDate && new Date(policy.effectiveDate) <= toDate
          );
        }
        
        if (filtersToApply.expiryDateFrom) {
          const fromDate = new Date(filtersToApply.expiryDateFrom);
          policiesData = policiesData.filter(policy => 
            policy.expiryDate && new Date(policy.expiryDate) >= fromDate
          );
        }
        
        if (filtersToApply.expiryDateTo) {
          const toDate = new Date(filtersToApply.expiryDateTo);
          policiesData = policiesData.filter(policy => 
            policy.expiryDate && new Date(policy.expiryDate) <= toDate
          );
        }
        
        if (filtersToApply.isActive !== null) {
          policiesData = policiesData.filter(policy => policy.isActive === filtersToApply.isActive);
        }
        
        if (filtersToApply.tags && filtersToApply.tags.length > 0) {
          policiesData = policiesData.filter(policy => 
            policy.tags && filtersToApply.tags.some(tag => policy.tags.includes(tag))
          );
        }
        
        if (filtersToApply.search) {
          const searchLower = filtersToApply.search.toLowerCase();
          policiesData = policiesData.filter(policy => 
            (policy.title && policy.title.toLowerCase().includes(searchLower)) ||
            (policy.description && policy.description.toLowerCase().includes(searchLower)) ||
            (policy.notes && policy.notes.toLowerCase().includes(searchLower))
          );
        }
      }
      
      // Apply sorting
      if (sortBy) {
        policiesData.sort((a, b) => {
          // Handle date fields specially
          if (['createdAt', 'updatedAt', 'effectiveDate', 'expiryDate', 'approvalDate'].includes(sortBy.field)) {
            const dateA = a[sortBy.field] ? new Date(a[sortBy.field]) : new Date(0);
            const dateB = b[sortBy.field] ? new Date(b[sortBy.field]) : new Date(0);
            
            return sortBy.direction === 'asc' 
              ? dateA - dateB
              : dateB - dateA;
          }
          
          // For non-date fields
          if (a[sortBy.field] === undefined) return sortBy.direction === 'asc' ? -1 : 1;
          if (b[sortBy.field] === undefined) return sortBy.direction === 'asc' ? 1 : -1;
          
          return sortBy.direction === 'asc'
            ? a[sortBy.field] > b[sortBy.field] ? 1 : -1
            : a[sortBy.field] < b[sortBy.field] ? 1 : -1;
        });
      }
      
      console.log(`Fetched ${policiesData.length} policies`);
      
      // Update policies state
      setPolicies(policiesData);       
      
      // Update cache with all policies for quick access
      const newCache = {};
      policiesData.forEach(policy => {
        newCache[policy.id] = policy;
      });
      setPolicyCache(prevCache => ({...prevCache, ...newCache}));
      
      setLoading(false);
      return policiesData;
    } catch (error) {       
      console.error("Error fetching policies: ", error);       
      setError("Failed to load policies. Please try again later.");       
      setLoading(false);
      return [];
    }   
  }, [instituteId, filters, sortBy]);
  
  // Function to get policy history for a specific institute
  const getPolicyHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // We're reusing the existing policies if they're already loaded
      if (policies.length > 0) {
        setLoading(false);
        return policies;
      }
      
      // Otherwise fetch policies for this institute
      const result = await fetchPolicies();
      return result;
    } catch (error) {
      console.error("Error fetching policy history:", error);
      setError("Failed to load policy history. Please try again later.");
      setLoading(false);
      return [];
    }
  }, [fetchPolicies, policies]);
  
  // Get a specific policy by ID
  const getPolicyById = async (policyId) => {     
    try {
      // Check if policy exists in cache first
      if (policyCache[policyId]) {
        console.log("Policy retrieved from cache:", policyId);
        return policyCache[policyId];
      }
      
      // If not in cache, fetch from Firestore
      console.log("Fetching policy from database:", policyId);
      const policyDocRef = doc(firestore, "policies", policyId);       
      const policyDocSnap = await getDoc(policyDocRef);              
      
      if (policyDocSnap.exists()) {
        const policy = {           
          id: policyDocSnap.id,           
          ...policyDocSnap.data()         
        };
        
        // Update cache with the newly fetched policy
        setPolicyCache(prevCache => ({
          ...prevCache,
          [policyId]: policy
        }));
        
        return policy;       
      } else {         
        console.error("No policy found with ID:", policyId);         
        return null;       
      }     
    } catch (error) {       
      console.error("Error fetching policy:", error);       
      throw new Error("Failed to fetch policy details");     
    }   
  };      
  
  // Function to upload files to Firebase Storage
  const uploadFile = async (file, folder) => {
    try {
      const fileRef = ref(storage, `${folder}/${instituteId}/${Date.now()}_${file.name}`);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      return {
        url: downloadURL,
        path: fileRef.fullPath,
        name: file.name
      };
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error("Failed to upload file");
    }
  };
  
  // Function to create a policy
  const createPolicy = async (policyData) => {
    try {
      setLoading(true);
      
      // Filter out empty tags
      const filteredTags = policyData.tags ? policyData.tags.filter(tag => tag.trim() !== '') : [];
      
      // Prepare the policy data
      const newPolicy = {
        title: policyData.title,
        description: policyData.description || '',
        category: policyData.category || '',
        status: policyData.status || 'draft',
        tags: filteredTags,
        effectiveDate: policyData.effectiveDate || null,
        expiryDate: policyData.expiryDate || null,
        approvalDate: policyData.approvalDate || null,
        approvedBy: policyData.approvedBy || '',
        assignedTo: policyData.assignedTo || '',
        createdBy: policyData.createdBy || '',
        createdDate: policyData.createdDate || new Date().toISOString().split('T')[0],
        notes: policyData.notes || '',
        isActive: policyData.isActive !== undefined ? policyData.isActive : true,
        metadata: policyData.metadata || {},
        instituteId: instituteId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        pdfUrl: null,
        pdfName: null,
        imageUrl: null,
        imageName: null
      };
      
      // Upload PDF if provided
      if (policyData.pdfFile) {
        const pdfData = await uploadFile(policyData.pdfFile, 'policy_pdfs');
        newPolicy.pdfUrl = pdfData.url;
        newPolicy.pdfName = pdfData.name;
        newPolicy.pdfPath = pdfData.path;
      }
      
      // Upload image if provided
      if (policyData.imageFile) {
        const imageData = await uploadFile(policyData.imageFile, 'policy_images');
        newPolicy.imageUrl = imageData.url;
        newPolicy.imageName = imageData.name;
        newPolicy.imagePath = imageData.path;
      }
      
      // Add the policy to Firestore
      const docRef = await addDoc(collection(firestore, "policies"), newPolicy);
      
      // Get the new policy with its ID
      const createdPolicy = {
        id: docRef.id,
        ...newPolicy
      };
      
      // Update the policies state and cache
      setPolicies(prev => [...prev, createdPolicy]);
      setPolicyCache(prev => ({
        ...prev,
        [docRef.id]: createdPolicy
      }));
      
      setLoading(false);
      return createdPolicy;
      
    } catch (error) {
      console.error("Error creating policy:", error);
      setError("Failed to create policy. Please try again.");
      setLoading(false);
      throw new Error("Failed to create policy");
    }
  };
  
  // Function to update a policy
  const updatePolicy = async (policyId, policyData) => {
    try {
      setLoading(true);
      
      // Get the existing policy
      const existingPolicy = await getPolicyById(policyId);
      if (!existingPolicy) {
        throw new Error("Policy not found");
      }
      
      // Filter out empty tags
      const filteredTags = policyData.tags ? policyData.tags.filter(tag => tag.trim() !== '') : [];
      
      // Prepare update data
      const updateData = {
        ...policyData,
        tags: filteredTags,
        updatedAt: serverTimestamp()
      };
      
      // Upload new PDF if provided
      if (policyData.pdfFile) {
        // Delete the old PDF file if it exists
        if (existingPolicy.pdfPath) {
          try {
            const oldFileRef = ref(storage, existingPolicy.pdfPath);
            await deleteObject(oldFileRef);
          } catch (e) {
            console.warn("Could not delete old PDF file:", e);
          }
        }
        
        const pdfData = await uploadFile(policyData.pdfFile, 'policy_pdfs');
        updateData.pdfUrl = pdfData.url;
        updateData.pdfName = pdfData.name;
        updateData.pdfPath = pdfData.path;
      }
      
      // Upload new image if provided
      if (policyData.imageFile) {
        // Delete the old image file if it exists
        if (existingPolicy.imagePath) {
          try {
            const oldImageRef = ref(storage, existingPolicy.imagePath);
            await deleteObject(oldImageRef);
          } catch (e) {
            console.warn("Could not delete old image file:", e);
          }
        }
        
        const imageData = await uploadFile(policyData.imageFile, 'policy_images');
        updateData.imageUrl = imageData.url;
        updateData.imageName = imageData.name;
        updateData.imagePath = imageData.path;
      }
      
      // Remove file objects before saving to Firestore
      delete updateData.pdfFile;
      delete updateData.imageFile;
      
      // Update the policy in Firestore
      const policyRef = doc(firestore, "policies", policyId);
      await updateDoc(policyRef, updateData);
      
      // Update the policies state and cache
      const updatedPolicy = {
        ...existingPolicy,
        ...updateData,
        id: policyId
      };
      
      setPolicies(prev => prev.map(p => p.id === policyId ? updatedPolicy : p));
      setPolicyCache(prev => ({
        ...prev,
        [policyId]: updatedPolicy
      }));
      
      setLoading(false);
      return updatedPolicy;
      
    } catch (error) {
      console.error("Error updating policy:", error);
      setError("Failed to update policy. Please try again.");
      setLoading(false);
      throw new Error("Failed to update policy");
    }
  };
  
  // Function to delete a policy
  const handleDelete = async (policyId) => {     
    try {
      // Get the policy first to check for files to delete
      const policy = await getPolicyById(policyId);
      if (!policy) {
        throw new Error("Policy not found");
      }
      
      // Delete associated files
      if (policy.pdfPath) {
        try {
          const pdfRef = ref(storage, policy.pdfPath);
          await deleteObject(pdfRef);
        } catch (e) {
          console.warn("Could not delete PDF file:", e);
        }
      }
      
      if (policy.imagePath) {
        try {
          const imageRef = ref(storage, policy.imagePath);
          await deleteObject(imageRef);
        } catch (e) {
          console.warn("Could not delete image file:", e);
        }
      }
      
      // Delete the policy document
      await deleteDoc(doc(firestore, "policies", policyId));       
      
      // Update states
      setPolicies((prev) => prev.filter((policy) => policy.id !== policyId));
      
      // Remove deleted policy from cache
      setPolicyCache(prevCache => {
        const newCache = {...prevCache};
        delete newCache[policyId];
        return newCache;
      });
      
      return true;
    } catch (error) {       
      console.error("Error deleting policy:", error);       
      setError("Failed to delete policy. Please try again.");
      throw new Error("Failed to delete policy");
    }   
  };
  
  // Function to change policy status
  const changeStatus = async (policyId, newStatus) => {
    try {
      const policyRef = doc(firestore, "policies", policyId);
      await updateDoc(policyRef, {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      
      // Update local state
      setPolicies(prev => prev.map(policy => {
        if (policy.id === policyId) {
          return {
            ...policy,
            status: newStatus,
            updatedAt: new Date()
          };
        }
        return policy;
      }));
      
      // Update cache
      setPolicyCache(prev => ({
        ...prev,
        [policyId]: {
          ...prev[policyId],
          status: newStatus,
          updatedAt: new Date()
        }
      }));
      
      return true;
    } catch (error) {
      console.error("Error changing policy status:", error);
      throw new Error("Failed to update policy status");
    }
  };
  
  // Function to set filters
  const setFilterOptions = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };
  
  // Function to clear all filters
  const clearFilters = () => {
    setFilters({
      category: null,
      status: null,
      effectiveDateFrom: null,
      effectiveDateTo: null,
      expiryDateFrom: null,
      expiryDateTo: null,
      isActive: null,
      tags: [],
      search: null
    });
  };
  
  // Function to set sorting options
  const setSortOptions = (field, direction = 'asc') => {
    setSortBy({
      field,
      direction
    });
  };
      
  useEffect(() => {     
    if (instituteId) {
      fetchPolicies();
    }
  }, [instituteId, fetchPolicies]);      
  
  const refreshPolicies = useCallback(() => {     
    setLoading(true);     
    fetchPolicies();   
  }, [fetchPolicies]);      
  
  const value = {     
    policies,     
    loading,     
    error,     
    refreshPolicies,     
    handleDelete,  // Renamed from handleDelete for consistency
    getPolicyById,
    getPolicyHistory,
    createPolicy,
    updatePolicy,
    changeStatus,
    policyCache,
    // Filtering and sorting
    filters,
    setFilters: setFilterOptions,
    clearFilters,
    sortBy,
    setSortBy: setSortOptions,
    // Search with filters applied
    searchPolicies: (searchTerm) => {
      setFilters(prev => ({
        ...prev,
        search: searchTerm
      }));
      return fetchPolicies({
        ...filters,
        search: searchTerm
      });
    }
  };      
  
  return (     
    <PolicyContext.Provider value={value}>       
      {children}     
    </PolicyContext.Provider>   
  ); 
};