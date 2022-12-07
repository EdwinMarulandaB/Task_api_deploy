import Task from "../models/Task";
import { getPagination } from "../libs/getPagination";

export const getTask = async (req, res) => {
  try {
    const { size, page, title } = req.query;

    const condition = title
      ? { title: { $regex: new RegExp(title), $options: "i" } }
      : {};

    const { limit, offset } = getPagination(page, size);
    const data = await Task.paginate(condition, { offset, limit });
    res.json({
      totalItems:data.totalDocs,
      task:data.docs,
      totalPages: data.totalPages,
      currentPage:data.page - 1
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving the task",
    });
  }
};

export const createTask = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({ message: "Title is required" });
  }

  try {
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description ? req.body.description : "",
      done: req.body.done ? req.body.done : false,
    });
    const tasksave = await newTask.save();
    res.json(tasksave);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving the task",
    });
  }
};

export const getAllDoneTasks = async (req, res) => {
  try {
    const task = await Task.find({ done: true });
    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving the task",
    });
  }
};

export const getOneTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);

    if (!task)
      return res
        .status(400)
        .json({ message: `Task with id ${id} does not exists` });

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message || `Error Retrieving Task with id ${id}`,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const data = await Task.findByIdAndDelete(req.params.id);
    if (data) {
      res.json({
        message: `Task with the title: "${data.title}" was deleted`,
      });
    } else {
      res.json({
        message: `Task not found`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving the task",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body);
    if (updateTask) {
      res.json({
        message: `Task was updated Successfully`,
      });
    } else {
      res.json({
        message: `Task not found`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving the task",
    });
  }
};
