import express from "express";
import { sendMessage, getTaskSuggestions } from "../controllers/chatController.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

// All chat routes require authentication
router.use(protect);

// Send message to AI chatbot
router.post("/message", sendMessage);

// Get AI suggestions based on tasks
router.post("/suggestions", getTaskSuggestions);

export default router;
