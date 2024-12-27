import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import taskRoutes from "./routes/taskRoutes";

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Todo Backend API!");
});

app.use("/tasks", taskRoutes);

export default app;
