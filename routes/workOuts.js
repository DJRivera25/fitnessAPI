import express from "express";
import { verify } from "../auth.js";
import { addWorkOut, getWorkOut, updateWorkOut, deleteWorkOut } from "../controllers/workOuts.js";
const router = express.Router();

router.post("/", verify, addWorkOut);
router.get("/", verify, getWorkOut);
router.patch("/:id", verify, updateWorkOut);
router.delete("/:id", verify, deleteWorkOut);

export default router;
