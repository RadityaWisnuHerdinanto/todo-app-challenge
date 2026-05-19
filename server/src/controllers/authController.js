/**
 * Authentication Controller
 * Handles registration and login requests
 */
import { registerUser, loginUser } from "../services/authService.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { validateRequiredFields, isValidEmail } from "../utils/validators.js";

/**
 * Register new user
 * POST /api/auth/register
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Validate required fields
  const validation = validateRequiredFields(
    { name, email, password, confirmPassword },
    ["name", "email", "password", "confirmPassword"]
  );

  if (!validation.valid) {
    return res.status(400).json({
      success: false,
      message: validation.message,
    });
  }

  // Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  // Validate password length
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  // Validate passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  // Register user
  const { user, token } = await registerUser(name, email, password);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      user,
      token,
    },
  });
});

/**
 * Login user
 * POST /api/auth/login
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  const validation = validateRequiredFields(
    { email, password },
    ["email", "password"]
  );

  if (!validation.valid) {
    return res.status(400).json({
      success: false,
      message: validation.message,
    });
  }

  // Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  // Login user
  const { user, token } = await loginUser(email, password);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user,
      token,
    },
  });
});
