import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { handleGetCurrentUser, handleLogin, handleLogout, handleRegister } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/me", protect, handleGetCurrentUser);
router.post("/register", handleRegister);
router.post("/login", handleLogin
);
router.post("/logout", handleLogout);

export default router;