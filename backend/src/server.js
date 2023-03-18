const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

dotenv.config();

// use express.json() to get data in json format
app.use(express.json());
app.use(cookieParser());
//port
const PORT = process.env.PORT || 5000;

// user cors
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// let import the routes
const authRoute = require("./routes/auth");

// Lets connect to monogoDB ...
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// use the routes
app.use("/api/auth", authRoute);

// Add port and connect to server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
