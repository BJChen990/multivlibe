import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { DATA_URL } from "./constants.js";

export const db = drizzle(`file://${DATA_URL}`);
