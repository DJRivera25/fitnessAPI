import express from "express";
import { verify } from "../auth.js";
import { registerUser, loginUser, getDetails } from "../controllers/users.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/details", verify, getDetails);

export default router;
