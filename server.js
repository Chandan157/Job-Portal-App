// API documentation
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";

// packages import
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";

//security packages
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

//files import
import connectDB from "./config/db.js";

//routes import
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";

dotenv.config();

//mongodb connection
connectDB();

//Swagger API config
//Swagger API options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job portal Application",
      description: "Node ExpressJs Job portal",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spec = swaggerDoc(options);

const app = express();

//middlewares
app.use(helmet());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//Routes

// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to Job Portal</h1>");
// });

app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoutes);

//homeroute
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

//validation middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;

app.listen(8080, () => {
  console.log(`Node server is listening on port ${PORT}`.bgCyan.white);
});
