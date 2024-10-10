const express = require("express");
const users = require("../controllers/userController");
const router = express.Router();

router.get("/users", users);
module.exports = router;