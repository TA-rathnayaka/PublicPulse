const express = require('express');
const { createUser,getUserById,updateUser,deleteUser, getUsers } = require('../controllers/userController');
const router = express.Router();

router.post("/", createUser);

// Read user by ID
router.get("/:id", getUserById);
router.get("/", getUsers);

// Update user by ID
router.patch("/:id", updateUser);

// Delete user by ID
router.delete("/:id", deleteUser);


module.exports = router;