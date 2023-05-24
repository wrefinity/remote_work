import express from "express";
import UserControls from "../controllers/users_con.js";
import { AuthVerify } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.delete("/:id", AuthVerify, UserControls.deleteUser);
router.get("/:id", UserControls.getUser);

export default router;
