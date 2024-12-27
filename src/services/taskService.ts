import { PrismaClient, Task } from "@prisma/client";
import { CreateTaskDto, UpdateTaskDto } from "../types/task";

class TaskService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async createTask(data: CreateTaskDto): Promise<Task> {
    const { title, color } = data;

    if (!title?.trim() || !color?.trim()) {
      throw new Error("Title and color are required");
    }

    return this.prisma.task.create({
      data: {
        title: title.trim(),
        color: color.trim(),
      },
    });
  }

  async updateTask(id: number, data: UpdateTaskDto): Promise<Task> {
    if (!id || isNaN(id)) {
      throw new Error("Invalid task ID");
    }

    const { title, color, completed } = data;

    return this.prisma.task.update({
      where: { id },
      data: {
        ...(title && { title: title.trim() }),
        ...(color && { color: color.trim() }),
        ...(completed !== undefined && { completed }),
      },
    });
  }

  async deleteTask(id: number): Promise<void> {
    if (!id || isNaN(id)) {
      throw new Error("Invalid task ID");
    }

    await this.prisma.task.delete({
      where: { id },
    });
  }
}

export const taskService = new TaskService();
