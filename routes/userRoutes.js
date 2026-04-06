const express = require("express");

const {
  register,
  login,
  getuser,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/register", register);
router.post("/login", login);


router.get("/profile", protect, getuser);

module.exports = router;