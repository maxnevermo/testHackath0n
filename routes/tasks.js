const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");
const Task = require("../models/task");

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    if (!tasks) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).send("Error " + err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).send("Error " + err);
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      deadline,
      format,
      location,
      customer,
    } = req.body;
    const newTask = new Task({
      name,
      description,
      price,
      category,
      deadline,
      format,
      location,
      customer,
    });

    const savedTask = await newTask.save();

    //adding task to customer tasks
    const taskCustomer = await Customer.findById(savedTask.customer);

    if (!taskCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    taskCustomer.tasks.push(savedTask._id);

    await taskCustomer.save();

    //adding task to performer tasks if needed

    res.json(savedTask);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating task", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    for (const [key, value] of Object.entries(req.body)) {
      if (task[key] !== undefined) {
        task[key] = value;
      }
    }

    //adding task to performer tasks if needed

    const savedTask = await task.save();
    res.json(savedTask);
  } catch (err) {
    res.status(500).send("Error " + err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    //deleting task from customer tasks

    const customer = await Customer.findById(task.customer._id);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    customer.tasks.remove(task._id);
    await customer.save();

    //deleting task from performer tasks if needed

    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

module.exports = router;
