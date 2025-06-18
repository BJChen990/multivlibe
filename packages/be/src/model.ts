import { DB_FILE_PATH } from "../constants.js";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";

export const db = drizzle(`file://${DB_FILE_PATH}`);
