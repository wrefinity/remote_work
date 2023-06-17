import express from "express";
import MessageRepo from "../controllers/message.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();

router.post("/", verifyToken, MessageRepo.createMessage);
router.get("/:id", verifyToken, MessageRepo.getMessages);

export default router;
