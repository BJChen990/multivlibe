import type { Hono } from "hono";
import type { BlankEnv, BlankSchema } from "hono/types";
import {
  AddTaskReqSchema,
  type AddTaskRes,
} from "multivlibe-model/tasks/add_task";
import {
  ListTasksReqSchema,
  type ListTasksRes,
} from "multivlibe-model/tasks/list_tasks";
import { db } from "@/model.js";
import { TasksRepository } from "./tasks.js";

export const createTasksEndpoints = (
  app: Hono<BlankEnv, BlankSchema, "/">,
) => {
  const tasksRepo = new TasksRepository(db);

  // GET /tasks - List all tasks, optionally filtered by instance IDs
  app.get("/tasks", async (c) => {
    try {
      const instanceIds = c.req.query("instanceIds");
      const filters = instanceIds ? 
        ListTasksReqSchema.parse({ 
          instanceIds: instanceIds.split(',').map(id => parseInt(id.trim())) 
        }) : undefined;

      const tasks = await tasksRepo.getAllTasks(filters);
      
      const response: ListTasksRes = {
        code: "ok",
        tasks,
      };

      return c.json(response);
    } catch (error) {
      console.error(error);
      const response: ListTasksRes = {
        code: "unknown_error",
      };
      return c.json(response, 500);
    }
  });

  // GET /tasks/:id - Get a specific task by ID
  app.get("/tasks/:id", async (c) => {
    try {
      const id = parseInt(c.req.param("id"));
      const task = await tasksRepo.getTaskById(id);
      
      if (!task) {
        return c.json({ code: "not_found" }, 404);
      }

      return c.json({ code: "ok", task });
    } catch (error) {
      console.error(error);
      return c.json({ code: "unknown_error" }, 500);
    }
  });

  // POST /tasks - Create a new task
  app.post("/tasks", async (c) => {
    try {
      const req = AddTaskReqSchema.parse(await c.req.json());

      const task = await tasksRepo.addTask(req);

      const response: AddTaskRes = {
        code: "ok",
        task,
      };

      return c.json(response);
    } catch (error) {
      console.error(error);
      const response: AddTaskRes = {
        code: "unknown_error",
      };
      return c.json(response, 400);
    }
  });

  // PUT /tasks/:id - Update an existing task
  app.put("/tasks/:id", async (c) => {
    try {
      const id = parseInt(c.req.param("id"));
      const updates = await c.req.json();

      const task = await tasksRepo.updateTask(id, updates);
      
      if (!task) {
        return c.json({ code: "not_found" }, 404);
      }

      return c.json({ code: "ok", task });
    } catch (error) {
      console.error(error);
      return c.json({ code: "unknown_error" }, 500);
    }
  });

  // DELETE /tasks/:id - Delete a task
  app.delete("/tasks/:id", async (c) => {
    try {
      const id = parseInt(c.req.param("id"));
      const deleted = await tasksRepo.deleteTask(id);
      
      if (!deleted) {
        return c.json({ code: "not_found" }, 404);
      }

      return c.json({ code: "ok" });
    } catch (error) {
      console.error(error);
      return c.json({ code: "unknown_error" }, 500);
    }
  });
};