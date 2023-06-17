import express from "express";
import { verifyToken } from "../middlewares/jwt.js";
import ReviewRepo from "../controllers/review.js";

const router = express.Router();

router.post("/", verifyToken, ReviewRepo.createReview )
router.get("/:gigId", ReviewRepo.getReviews )
router.delete("/:id", ReviewRepo.deleteReview)

export default router;
