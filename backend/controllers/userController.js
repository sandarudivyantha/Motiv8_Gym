const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// Function to generate username based on role
const generateUsername = async (role) => {
  // Determine the prefix based on the role
  let prefix;
  switch (role) {
    case "Admin":
      prefix = "AD";
      break;
    case "Trainer":
      prefix = "TR";
      break;
    case "Member":
      prefix = "MB";
      break;
    default:
      throw new Error("Invalid role");
  }

  // Find the count of users with the same role
  const count = await User.countDocuments({ roles: role });

  // Generate the username (e.g., AD001, TR002, MB003)
  const username = `${prefix}${String(count + 1).padStart(3, "0")}`;
  return username;
};

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {
  // Get all users from MongoDB
  const users = await User.find().select("-password").lean();

  // If no users
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
};

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = async (req, res) => {
  const { firstName, lastName, email, phoneNo, password, roles } = req.body;

  // Confirm data
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNo ||
    !password ||
    !roles?.length
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Generate username based on role
  const role = roles[0]; // Assuming roles is an array and the first role is the primary role
  let username;
  try {
    username = await generateUsername(role);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  // Check for duplicate email or phone number
  const duplicate = await User.findOne({ $or: [{ email }, { phoneNo }] })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate email or phone number" });
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  const userObject =
    !Array.isArray(roles) || !roles.length
      ? { username, password: hashedPwd }
      : {
          username,
          password: hashedPwd,
          roles,
          firstName,
          lastName,
          email,
          phoneNo,
        };

  try {
    // Create and store new user
    const user = await User.create(userObject);
    res.status(201).json({ message: `New user ${user.username} created` });
  } catch (error) {
    res.status(400).json({ message: "Invalid user data received" });
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
};

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = async (req, res) => {
  const {
    id,
    username,
    firstName,
    lastName,
    email,
    phoneNo,
    roles,
    active,
    password,
  } = req.body;

  // Confirm data
  if (
    !id ||
    !username ||
    !firstName ||
    !lastName ||
    !email ||
    !phoneNo ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
  }

  // Does the user exist to update?
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check for duplicate
  const duplicate = await User.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  user.username = username;
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.phoneNo = phoneNo;
  user.roles = roles;
  user.active = active;
  user.updatedAt = new Date();

  if (password) {
    // Hash password
    user.password = await bcrypt.hash(password, 10); // salt rounds
  }

  try {
    const updatedUser = await user.save();
    res.json({ message: `${updatedUser.username} updated` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
};

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }

  // Does the user exist to delete?
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  try {
    const result = await user.deleteOne();
    res.json({
      message: `Username ${result.username} with ID ${result._id} deleted`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
