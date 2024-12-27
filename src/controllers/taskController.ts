import { RequestHandler } from "express";
import { taskService } from "../services/taskService";
import { CreateTaskDto, UpdateTaskDto } from "../types/task";

export const taskController = {
  getAllTasks: (async (_req, res) => {
    try {
      const tasks = await taskService.getAllTasks();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks." });
    }
  }) as RequestHandler,

  createTask: (async (req, res) => {
    try {
      const task = await taskService.createTask(req.body as CreateTaskDto);
      res.status(201).json(task);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Failed to create task." });
      }
    }
  }) as RequestHandler,

  updateTask: (async (req, res) => {
    try {
      const task = await taskService.updateTask(
        Number(req.params.id),
        req.body as UpdateTaskDto
      );
      res.status(200).json(task);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Invalid task ID") {
          return res.status(400).json({ error: error.message });
        }
        // Check for Prisma's RecordNotFound error
        if ("code" in error && error.code === "P2025") {
          return res.status(404).json({ error: "Task not found" });
        }
      }
      res.status(400).json({ error: "Failed to update task." });
    }
  }) as RequestHandler,

  deleteTask: (async (req, res) => {
    try {
      await taskService.deleteTask(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message === "Invalid task ID") {
        return res.status(400).json({ error: error.message });
      }
      res.status(400).json({ error: "Failed to delete task." });
    }
  }) as RequestHandler,
};
