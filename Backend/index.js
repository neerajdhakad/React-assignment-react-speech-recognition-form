const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./database/connection");

const userRoute = require('./routes/userRoute');


(PORT = process.env.PORT || 5000), dotenv.config({ path: "config.env" });

//Mongodb connection
connectDB();
app.use(cors());
app.use(express.json());

app.use(userRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
