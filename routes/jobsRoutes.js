import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { createJobController, deleteJobController, getAllJobsController, jobStatsController, updateJobController } from "../controllers/jobsController.js";

const router = express.Router();

//Create job || POST
router.post("/create-job", userAuth, createJobController);

//Get jobs || GET
router.get("/get-job", userAuth, getAllJobsController);

//Update Jobs || PUT || PATCH
router.patch("/update-job/:id",userAuth, updateJobController)

//Update Jobs || PUT || DELETE
router.delete("/delete-job/:id",userAuth, deleteJobController)

//Job Stats filter \\ GET
router.get("/job-stats",userAuth,jobStatsController)

export default router;
