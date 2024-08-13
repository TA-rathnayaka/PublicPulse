const express = require('express');
const { createUser,getUserById,updateUser,deleteUser } = require('../controllers/userController');
const router = express.Router();

router.post("/", createUser);

// Read user by ID
router.get("/:id", getUserById);

// Update user by ID
router.patch("/:id", updateUser);

// Delete user by ID
router.delete("/:id", deleteUser);


module.exports = router;