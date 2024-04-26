const express = require("express");
const mongoose = require("mongoose");

//url to connect to cloud db
const url =
  "mongodb+srv://asiyyyka:Annastasiya04@hotaskbd.fci7s6s.mongodb.net/hotaskDB";

const app = express();
app.use(express.json());

mongoose.connect(url);
const con = mongoose.connection;
con.on("open", () => {
  console.log("Connected to DB");
});

const customerRouter = require("./routes/customers");
app.use("/customer", customerRouter);

const taskRouter = require("./routes/tasks");
app.use("/task", taskRouter);

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
