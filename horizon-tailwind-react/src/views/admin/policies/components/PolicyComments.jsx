import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "context/authContext";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc
} from "firebase/firestore";
import { firestore } from "backend/firebase/firebase";
import placeholder from "assets/img/avatars/image.png";

const PolicyComments = () => {
  const { policyId } = useParams();
  const { user } = useAuth();

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(firestore, "comments"),
        where("group_id", "==", policyId),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const fetchedComments = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }));
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [policyId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setSubmitting(true);
    try {
      const commentData = {
        policyId,
        createdAt: serverTimestamp(),
        display_name: user.displayName || "Anonymous User",
        group_id: policyId,
        instituteId: "3r2wMpS1x9q5XhGTtdBK",
        text: newComment,
        user_id: user.uid,
        photoURL: user.photoURL || "https://via.placeholder.com/40"
      };

      await addDoc(collection(firestore, "comments"), commentData);
      setNewComment("");
      await fetchComments();
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Failed to submit comment.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await deleteDoc(doc(firestore, "comments", commentId));
      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment.");
    }
  };

  const formatRelativeTime = (date) => {
    if (!(date instanceof Date)) return "a moment ago";
    const now = new Date();
    const diff = now - date;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins} min${mins !== 1 ? "s" : ""} ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  };

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");

  const startEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.text);
  };

  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditText("");
  };

  const saveEdit = async (commentId) => {
    if (!editText.trim()) return;
    try {
      // Placeholder: implement Firestore update logic here
      setComments(prev =>
        prev.map(comment =>
          comment.id === commentId ? { ...comment, text: editText } : comment
        )
      );
      cancelEdit();
    } catch (error) {
      console.error("Error updating comment:", error);
      alert("Failed to update comment.");
    }
  };

  return (
    <div className="bg-white dark:bg-navy-800 rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-6">Discussion</h2>

      {/* Add Comment Section */}
      {user && (
        <div className="mb-8">
          <div className="flex items-start gap-3">
            <img
              src={user.photoURL || placeholder}
              alt={user.displayName || "User"}
              className="w-10 h-10 rounded-full object-cover"
            />
            <form onSubmit={handleSubmitComment} className="flex-grow">
              <div className="relative">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full px-4 py-3 pr-20 border rounded-lg bg-gray-50 dark:bg-navy-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-brand-400 resize-none min-h-[80px]"
                  required
                />
                <button
                  type="submit"
                  disabled={submitting || !newComment.trim()}
                  className="absolute bottom-3 right-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-brand-500 dark:hover:bg-brand-600 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="flex gap-3">
              <img
                src={comment.photoURL || placeholder}
                alt={comment.display_name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-grow bg-gray-50 dark:bg-navy-700 rounded-lg p-4">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold text-navy-700 dark:text-white">{comment.display_name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{formatRelativeTime(comment.createdAt)}</p>
                  </div>
                  {user?.uid === comment.user_id && (
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(comment)} className="text-indigo-600">Edit</button>
                      <button onClick={() => handleDeleteComment(comment.id)} className="text-red-600">Delete</button>
                    </div>
                  )}
                </div>
                {editingCommentId === comment.id ? (
                  <div className="mt-2">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full border rounded p-2 mt-2 dark:bg-navy-800"
                    />
                    <div className="mt-2 flex gap-2">
                      <button onClick={() => saveEdit(comment.id)} className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
                      <button onClick={cancelEdit} className="bg-gray-300 px-3 py-1 rounded">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-2 text-gray-700 dark:text-gray-200">{comment.text}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PolicyComments;
