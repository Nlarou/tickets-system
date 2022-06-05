const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
//@desc Register a new user
//@route /api/users
//@access Public access
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate the data
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill up all the fields");
  }
  //Check if user is already exist by his email
  const userExists = await User.findOne({ email: email });
  //Send Error
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //Hash the password
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  //Add the user to the databse
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  // User successfully created
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new error("Invalid user data");
  }
});
//@desc Login a user
//@route /api/users/login
//@access Public access
const loginUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email: email });
  //Check if the user exist and the password is good with bcrypt
  if (user && (await bcrypt.compare(password, user.password))) {
    //Return user info
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
//@desc getCurrentUser
//@route /api/users/me
//@access Private access
const getMe = asyncHandler(async (req, res) => {
  const user = { id: req.user._id, email: req.user.email, name: req.user.name };
  res.status(200).json(user);
});
//@desc get role of the user
//@route /api/users/getRole
//@access Private access
const getRole = asyncHandler(async (req, res) => {
  if (req.user) {
    return res.status(200).json(req.user.role);
  } else {
    res.status(401);
    throw new Error("Invalid user data");
  }
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getRole,
};
