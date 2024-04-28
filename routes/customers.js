const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");
const Task = require("../models/task");
const Chatroom = require("../models/chatroom.js");
const addUserToChatroom =
  require("../controllers/chat-room-controllers.js").addUserToChatroom;

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    if (!customers) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(customers);
  } catch (err) {
    res.status(500).send("Error " + err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(customer);
  } catch (err) {
    res.status(500).send("Error " + err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { firstname, surname, phone, email, location, password } = req.body;
    const newCustomer = new Customer({
      firstname,
      surname,
      phone,
      email,
      location,
      password,
    });

    const savedCustomer = await newCustomer.save();

    res.json(savedCustomer);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating customer", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { tasks, ...customerData } = req.body;

    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    for (const [key, value] of Object.entries(customerData)) {
      if (customer[key] !== undefined) {
        customer[key] = value;
      }
    }

    if (Array.isArray(tasks) && tasks.length > 0) {
      for (const taskData of tasks) {
        const newTask = new Task({
          name: taskData.name,
          description: taskData.description,
          price: taskData.price,
          category: taskData.category,
          deadline: taskData.deadline,
          format: taskData.format,
          location: taskData.location || "",
          customer: customer._id,
        });

        try {
          const savedTask = await newTask.save();
          customer.tasks.push(savedTask._id);
        } catch (error) {
          console.error(error);
        }
      }
    }

    const c1 = await customer.save();
    res.json(c1);
  } catch (err) {
    res.status(500).send("Error " + err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    const tasksToDelete = await Task.find({ _id: { $in: customer.tasks } });

    for (const task of tasksToDelete) {
      await task.deleteOne();
    }

    await customer.deleteOne();
    res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Customer.findOne({ email: email });

    if (!user || password !== user.password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.json(user);
  } catch {
    res.status(500).json({ error: "User not found" });
  }
});
router.post("/add-to-chatroom", async (req, res) =>
  addUserToChatroom(Chatroom, Customer, req, res)
);

module.exports = router;

//POST
// {
//   "firstname": "John",
//   "middlename": "Doe",
//   "surname": "Smith",
//   "rating": 0,
//   "reviews": 0,
//   "phone": "1234567890",
//   "email": "john@example.com",
//   "location": "New York",
// }

//PUT
// {
//   "rating": 5,
//   "reviews": 2,
//   "tasks": [
//     {
//       "name": "Task 3",
//       "description": "Task 3 description",
//       "price": 100,
//       "category": "Category 2",
//       "deadline": "2024-05-20",
//       "posted": "2024-04-26",
//       "format": "offline",
//       "location": "Lviv"
//     }
//   ]
// }
