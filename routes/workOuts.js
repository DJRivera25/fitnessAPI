import express from "express";
import { verify } from "../auth.js";
import {
  addWorkOut,
  getWorkOut,
  updateWorkOut,
  deleteWorkOut,
  completeWorkOutStatus,
} from "../controllers/workOuts.js";
const router = express.Router();

router.post("/addWorkout", verify, addWorkOut);
router.get("/getMyWorkouts", verify, getWorkOut);
router.patch("/updateWorkout/:id", verify, updateWorkOut);
router.delete("/deleteWorkout/:id", verify, deleteWorkOut);
router.patch("/completeWorkoutStatus/:id", verify, completeWorkOutStatus);

export default router;
