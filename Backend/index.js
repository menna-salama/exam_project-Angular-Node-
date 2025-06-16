const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/admin");
const examRoutes = require("./routes/exam");
const questionRoutes = require("./routes/question");
const resultRoutes = require('./routes/result');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/project")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

app.use("/admin", adminRoutes);
app.use("/exam", examRoutes);
app.use("/question", questionRoutes);
app.use('/results', resultRoutes);

const port =3000;
app.listen(port, () => {
  console.log(`Server started listening on port ${port}`);
});