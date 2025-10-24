import express from "express";
import { createUser, getUsers, getMe } from "../controller/userController.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { isCompanyAdmin } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", authenticateToken, isCompanyAdmin, createUser);
router.get("/", authenticateToken, getUsers);
router.get("/me", authenticateToken, getMe);

export default router;
