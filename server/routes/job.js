import express from "express";
import GigsRepo from "../controllers/job.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();

router.post("/", verifyToken, GigsRepo.createGig);
router.delete("/:id", verifyToken, GigsRepo.deleteGig);
router.get("/single/:id", GigsRepo.getGig);
router.get("/", GigsRepo.getGigs);

export default router;