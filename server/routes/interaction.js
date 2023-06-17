import express from "express";
import InteractRepo from "../controllers/interaction.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();

router.get("/", verifyToken, InteractRepo.getInteractions);
router.post("/", verifyToken, InteractRepo.createInteractions);
router.get("/single/:id", verifyToken, InteractRepo.getSingleInteraction);
router.put("/:id", verifyToken, InteractRepo.updateInteraction);

export default router;