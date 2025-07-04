import { eq, inArray, type InferSelectModel } from "drizzle-orm";
import {
  type Task,
  TaskSchema,
} from "multivlibe-model/tasks/task";
import type { AddTaskReq } from "multivlibe-model/tasks/add_task";
import type { ListTasksReq } from "multivlibe-model/tasks/list_tasks";
import type { db } from "@/model.js";
import { tasksTable } from "./schema.js";

type TaskDraft = {
  instanceId: number;
  runner: "DryRun";
  title: string;
};

export class TasksRepository {
  constructor(private readonly database: typeof db) {}

  async getAllTasks(filters?: ListTasksReq): Promise<Task[]> {
    let query = this.database.select().from(tasksTable);
    
    if (filters?.instanceIds && filters.instanceIds.length > 0) {
      // Filter by instance IDs if provided
      if (filters.instanceIds.length === 1) {
        query = query.where(eq(tasksTable.instanceId, filters.instanceIds[0]));
      } else {
        query = query.where(inArray(tasksTable.instanceId, filters.instanceIds));
      }
    }
    
    const results = await query.all();
    return results.map((row: InferSelectModel<typeof tasksTable>) => TaskSchema.parse(row));
  }

  async getTaskById(id: number): Promise<Task | null> {
    const result = await this.database
      .select()
      .from(tasksTable)
      .where(eq(tasksTable.id, id))
      .get();
    
    return result ? TaskSchema.parse(result) : null;
  }

  async addTask(taskData: AddTaskReq): Promise<Task> {
    const now = Date.now();
    const [record] = await this.database
      .insert(tasksTable)
      .values({
        instanceId: taskData.instanceId,
        runner: taskData.runner,
        title: taskData.title,
        created: now,
        updated: now,
      })
      .returning();
    
    return TaskSchema.parse(record);
  }

  async updateTask(id: number, updates: Partial<TaskDraft>): Promise<Task | null> {
    const now = Date.now();
    const [record] = await this.database
      .update(tasksTable)
      .set({
        ...updates,
        updated: now,
      })
      .where(eq(tasksTable.id, id))
      .returning();
    
    return record ? TaskSchema.parse(record) : null;
  }

  async deleteTask(id: number): Promise<boolean> {
    const result = await this.database
      .delete(tasksTable)
      .where(eq(tasksTable.id, id))
      .returning();
    
    return result.length > 0;
  }
}