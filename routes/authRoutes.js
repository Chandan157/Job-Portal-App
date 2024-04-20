import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";
import { testPostController } from "../controllers/testController.js";
import { rateLimit } from "express-rate-limit";

//ip limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

//Router object
const router = express.Router();

//Routes
router.post("/test-post", testPostController);
router.post("/register",limiter, registerController);
router.post("/login",limiter, loginController);

export default router;
