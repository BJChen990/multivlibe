import type { Hono } from "hono";
import type { BlankEnv, BlankSchema } from "hono/types";
import {
  AddRepositoryReqSchema,
  type AddRepositoryRes,
} from "multivlibe-model/repositories/add_repository";
import { db } from "@/model.js";
import { RepositoriesRepository } from "./repository.js";

export const createRepositoriesEndpoints = (
  app: Hono<BlankEnv, BlankSchema, "/">,
) => {
  const repo = new RepositoriesRepository(db);

  app.get("/repositories", async (c) => {
    try {
      return c.json({
        code: "ok",
        repositories: await repo.getAllRepositories(),
      });
    } catch (error) {
      console.error(error);
      return c.json({ code: "unknown_error" }, 500);
    }
  });

  app.get("/repositories/:id", async (c) => {
    try {
      const id = parseInt(c.req.param("id"));
      const repository = await repo.getRepositoryDetail(id);
      return c.json({ code: "ok", repository });
    } catch (error) {
      console.error(error);
      return c.json({ code: "unknown_error" }, 500);
    }
  });

  app.post("/repositories", async (c) => {
    try {
      const req = AddRepositoryReqSchema.parse(await c.req.json());

      const repository = await repo.addRepository(req);

      const response: AddRepositoryRes = {
        code: "ok",
        repository,
      };

      return c.json(response);
    } catch (error) {
      console.error(error);
      return c.json({ code: "unknown_error" }, 400);
    }
  });
};
