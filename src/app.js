import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import roleRoutes from "./routes/role.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);

export default app; 
