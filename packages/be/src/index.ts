import "tsconfig-paths";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { createRepositoriesEndpoints } from "./app/repositories/entrypoint.js";

const app = new Hono();

// Register repository endpoints
createRepositoriesEndpoints(app);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
