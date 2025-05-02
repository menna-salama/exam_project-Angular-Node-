const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/admin");
const examRoutes = require("./routes/exam");
const questionRoutes = require("./routes/question");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect("mongodb://127.0.0.1:27017/project")
  .then(() => {
    console.log("connect to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/admin", adminRoutes);
app.use("/exam", examRoutes);
app.use("/question", questionRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`server started listening port ${port}`);
});

 