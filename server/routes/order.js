import express from "express";
import { verifyToken } from "../middlewares/jwt.js";
import OrderRepo from "../controllers/payment.js";
const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, OrderRepo.getOrders);
router.post("/create-payment-intent/:id", verifyToken, OrderRepo.intent);
router.put("/", verifyToken, OrderRepo.confirm);
router.delete("/delete/:id", verifyToken, OrderRepo.deletePayments)

export default router;