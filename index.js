const express = require("express");
const mongoose = require("mongoose");
const Customer = require("./models/customer");
const Task = require("./models/task");
const Performer = require("./models/performer");
const Message = require("./models/message");
const serverPort = 9000;
const socketioPort = 3001;
const io = require("socket.io")(socketioPort);

io.on("connection", (socket) => {
  console.log("A user connected");
  console.log(socket.id);
  socket.on("send-message", (message, room, Userid) => {
    if (room === "") {
      socket.broadcast.emit("recive-message", message, Userid, room);
    } else {
      socket.to(room).emit("recive-message", message, Userid, room);
    }
    socket.broadcast.emit("message-sent");
    console.log("Message sent");
    let data = {
      message: message,
      room: room,
      sender: Userid,
      timestamp: Date.now(),
    };
    console.log(data);
    con.collection("Message").insertOne(data, (err, collection) => {
      if (err) {
        throw err;
      }
      console.log("Record inserted successfully");
    });
  });
  socket.on("create-room", (room, UserId) => {
    console.log("Someone created room");
    socket.broadcast.emit("created-room", room, UserId);
  });
  socket.on("join-room", (room, cb) => {
    socket.join(room);
    cb("Joined ${room}");
  });
});
//url to connect to cloud db
const url =
  "mongodb+srv://asiyyyka:Annastasiya04@hotaskbd.fci7s6s.mongodb.net/hotaskDB";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("website"));
mongoose.connect(url);
const con = mongoose.connection;
con.on("open", () => {
  console.log("Connected to DB");
});

app.use(express.static("website"));

const customerRouter = require("./routes/customers");
app.use("/customer", customerRouter);

const taskRouter = require("./routes/tasks");
app.use("/task", taskRouter);

const performerRouter = require("./routes/performers");
app.use("/performer", performerRouter);

app.get("/", () => {});

app.listen(serverPort, "0.0.0.0", () => {
  console.log(`Server is running on port ${serverPort}`);
});
