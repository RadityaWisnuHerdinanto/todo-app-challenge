/**
 * Authentication Routes
 * POST /api/auth/register - Register new user
 * POST /api/auth/login - Login user
 * POST /api/auth/logout - Logout user (client-side token removal)
 */
import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

/**
 * Register route
 */
router.post("/register", register);

/**
 * Login route
 */
router.post("/login", login);

/**
 * Logout route
 * Note: Logout is handled on frontend by removing token from storage
 * This endpoint can be used for server-side cleanup if needed
 */
router.post("/logout", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

export default router;
