import request from "supertest";
import app from "../app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Task API", () => {
  describe("GET /tasks", () => {
    it("should return all tasks", async () => {
      await prisma.task.create({
        data: {
          title: "Test Task",
          color: "#FF0000",
        },
      });

      const response = await request(app).get("/tasks");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toHaveProperty("title", "Test Task");
    });
  });

  describe("POST /tasks", () => {
    it("should create a new task", async () => {
      const taskData = {
        title: "New Task",
        color: "#00FF00",
      };

      const response = await request(app).post("/tasks").send(taskData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("title", taskData.title);
      expect(response.body).toHaveProperty("color", taskData.color);
    });

    it("should validate required fields", async () => {
      const response = await request(app).post("/tasks").send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("PUT /tasks/:id", () => {
    it("should update an existing task", async () => {
      const task = await prisma.task.create({
        data: {
          title: "Test Task",
          color: "#FF0000",
        },
      });

      const updateData = {
        title: "Updated Task",
        completed: true,
      };

      const response = await request(app)
        .put(`/tasks/${task.id}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("title", updateData.title);
      expect(response.body).toHaveProperty("completed", true);
    });

    it("should return 404 for non-existent task", async () => {
      const response = await request(app)
        .put("/tasks/999")
        .send({ title: "Update" });

      expect(response.status).toBe(404);
    });
  });

  describe("DELETE /tasks/:id", () => {
    it("should delete an existing task", async () => {
      const task = await prisma.task.create({
        data: {
          title: "Test Task",
          color: "#FF0000",
        },
      });

      const response = await request(app).delete(`/tasks/${task.id}`);

      expect(response.status).toBe(204);

      const deletedTask = await prisma.task.findUnique({
        where: { id: task.id },
      });
      expect(deletedTask).toBeNull();
    });
  });
});
