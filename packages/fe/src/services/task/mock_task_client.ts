import type { AddTaskReq, AddTaskRes } from "multivlibe-model/tasks/add_task";
import type {
  ListTasksReq,
  ListTasksRes,
} from "multivlibe-model/tasks/list_tasks";
import type { Task } from "multivlibe-model/tasks/task";
import { delay } from "multivlibe-model/utils/delay";
import type { TaskService } from "./task_service";

/** In-memory mock implementation of TaskService used for development. */
const DEFAULT_DATE = new Date("2023-01-01T00:00:00Z").valueOf();

export class MockTaskClient implements TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      instanceId: 1,
      runner: "DryRun",
      title: "Initial task",
      created: DEFAULT_DATE,
      updated: DEFAULT_DATE,
    },
  ];
  private nextId = 2;

  constructor(private readonly timeout: number = 1000) {}

  async listTasks(req: ListTasksReq): Promise<ListTasksRes> {
    await delay(this.timeout);

    const ids = req.instanceIds;
    const result =
      !ids || ids.length === 0
        ? this.tasks
        : this.tasks.filter((t) => ids.includes(t.instanceId));

    return {
      code: "ok",
      tasks: result,
    };
  }

  async addTask(req: AddTaskReq): Promise<AddTaskRes> {
    await delay(this.timeout);

    try {
      const now = Date.now();
      const task: Task = {
        id: this.nextId,
        created: now,
        updated: now,
        ...req,
      };
      this.tasks.push(task);
      this.nextId++;

      return { code: "ok", task };
    } catch (err) {
      console.error(err);
      return { code: "unknown_error" };
    }
  }
}
