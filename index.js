const express = require("express");
const mongoose = require("mongoose");
const Customer = require("./models/customer");
const Task = require("./models/task");
const Performer = require("./models/performer");

//url to connect to cloud db
const url =
  "mongodb+srv://asiyyyka:Annastasiya04@hotaskbd.fci7s6s.mongodb.net/hotaskDB";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(url);
const con = mongoose.connection;
con.on("open", () => {
  console.log("Connected to DB");
});

const customerRouter = require("./routes/customers");
app.use("/customer", customerRouter);

const taskRouter = require("./routes/tasks");
app.use("/task", taskRouter);

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Customer.findOne({ email: email });
    user.userType = "customer";

    if (!user) {
      user = await Performer.findOne({ email: email });
      user.userType = "performer";
    }

    if (!user || password !== user.password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "User not found" });
  }
});

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
