import express from "express";
import {registerController} from "../controllers/authController.js";
import { testPostController } from "../controllers/testController.js";

//Router object
const router = express.Router();

//Routes
router.post("/test-post",testPostController)
router.post("/register", registerController);

export default router;
