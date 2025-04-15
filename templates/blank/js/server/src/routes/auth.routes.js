import express from "express";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me",protect,getCurrentUser);
router.post("/register",handleRegister);
router.post("/login",handleLogin);
router.post("/logout",handleLogout);

export default router;