import express from "express";
import Auth from "../controllers/auth.js"


const router = express.Router();

router.post("/register", Auth.register)
router.post("/login", Auth.login)
router.post("/logout", Auth.logout)

export default router;
