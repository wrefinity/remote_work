import express from "express";
import Auth from "../controllers/auth.js"


const router = express.Router();

router.post("/register", Auth.register)
router.post("/login", Auth.login)
router.post("/logout", Auth.logout)
router.route("/reset_link").post(Auth.reset_link);
router.get("/users_verification/:id/:token", Auth.confirmRegistration);
router.post("/reset_password/:id/:token", Auth.changePassword);

export default router;
