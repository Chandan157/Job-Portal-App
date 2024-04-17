import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors"

//files import
import connectDB from "./config/db.js";

//routes import
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";


dotenv.config();

//mongodb connection
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//Routes

// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to Job Portal</h1>");
// });

app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth",authRoutes)

//validation middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;

app.listen(8080, () => {
  console.log(`Node server is listening on port ${PORT}`.bgCyan.white);
});
