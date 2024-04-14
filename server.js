import express from "express";
import dotenv from "dotenv";
import colors from "colors";  

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Job Portal</h1>");
});

const PORT = process.env.PORT || 8080;

app.listen(8080, () => {
  console.log(`Node server is listening on port ${PORT}`.bgCyan.white);
});
