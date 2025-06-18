import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: ["./src/app/repositories/schema.ts"],
  dialect: "sqlite",
  dbCredentials: { url: "file:" + __dirname + "/data/db.sqlite" },
});
