const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const Performer = require("../models/performer");
const {addUserToChatroom} = require("../controllers/chat-room-controllers.js");
const Chatroom = require("../models/chatroom.js");

router.get("/", async (req, res) => {
  try {
    const performers = await Performer.find();
    if (!performers) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(performers);
  } catch (err) {
    res.status(500).send("Error " + err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const performer = await Performer.findById(req.params.id);
    if (!performer) {
      return res.status(404).json({ error: "Performer not found" });
    }

    res.json(performer);
  } catch (err) {
    res.status(500).send("Error " + err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { firstname, surname, phone, email, location, password, categories } =
      req.body;
    const newPerformer = new Performer({
      firstname,
      surname,
      phone,
      email,
      location,
      password,
      categories,
    });

    const savedPerformer = await newPerformer.save();

    res.json(savedPerformer);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating performer", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { tasks, ...performerData } = req.body;

    const performer = await Performer.findById(req.params.id);
    if (!performer) {
      return res.status(404).json({ error: "Performer not found" });
    }

    for (const [key, value] of Object.entries(performerData)) {
      if (performer[key] !== undefined) {
        performer[key] = value;
      }
    }

    if (Array.isArray(tasks) && tasks.length > 0) {
      for (const taskId of tasks) {
        try {
          const taskExists = performer.tasks.includes(taskId);

          if (!taskExists) {
            const task = await Task.findById(taskId);

            if (task) {
              task.performer = performer._id;
              task.claimed = new Date();
              performer.tasks.push(task._id);
              await task.save();
            }
          }
        } catch (error) {
          console.error("Error updating task:", error);
        }
      }
    }

    const p1 = await performer.save();
    res.json(p1);
  } catch (err) {
    res.status(500).send("Error " + err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const performer = await Performer.findById(req.params.id);
    if (!performer) {
      return res.status(404).json({ error: "Performer not found" });
    }

    await performer.deleteOne();
    res.json({ message: "Performer deleted successfully" });
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Performer.findOne({ email: email });

    if (!user || password !== user.password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.json(user);
  } catch {
    res.status(500).json({ error: "User not found" });
  }
});

router.post('/add-to-chatroom', async (req, res) => addUserToChatroom(Chatroom, Performer, req, res))

module.exports = router;

//POST
// {
//   "firstname": "John",
//   "middlename": "Doe",
//   "surname": "Smith",
//   "rating": 0,
//   "reviews": 0,
//   "phone": "1234567890",
//   "categories" : ["C1", "C2"],
//   "email": "john@example.com",
//   "password" : "1",
//   "location": "New York"
// }

//PUT
// {
//   "rating": 5,
//   "reviews": 2,
//   {
//   "tasks": [
//     "662c0d45971ba3f055305ba4"
//     ]
// }
// }
