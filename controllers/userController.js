const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModels");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// REGISTER USER
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // check existing user
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // create user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: generateToken(user._id), 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// LOGIN 
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // find user
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // check password (plain for now)
  if (user.password !== password) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  // success
  res.status(200).json({
    success: true,
    message: "Login successful",
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});


const getuser = asyncHandler(async (req, res) => {
  
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    success: true,
    user,
  });
});

module.exports = {
  register,
  login,
  getuser,
};

