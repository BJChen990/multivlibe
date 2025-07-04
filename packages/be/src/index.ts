import "tsconfig-paths";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { createRepositoriesEndpoints } from "@/app/repositories/entrypoint.js";
import { createTasksEndpoints } from "@/app/repositories/tasks_entrypoint.js";

const app = new Hono();

// Register repository endpoints
createRepositoriesEndpoints(app);

// Register task endpoints
createTasksEndpoints(app);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
