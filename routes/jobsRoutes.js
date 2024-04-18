import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { createJobController, getAllJobsController } from "../controllers/jobsController.js";

const router = express.Router();

//Create job || POST
router.post("/create-job", userAuth, createJobController);

//Get jobs || GET
router.get("/get-job", userAuth, getAllJobsController);

export default router;
