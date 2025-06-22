import type {
        AddTaskReq,
        AddTaskRes,
} from "multivlibe-model/tasks/add_task";
import type {
        ListTasksReq,
        ListTasksRes,
} from "multivlibe-model/tasks/list_tasks";
import type { TaskService } from "./task_service";

export class HttpTaskClient implements TaskService {
        async listTasks(_req: ListTasksReq): Promise<ListTasksRes> {
                throw new Error("not implemented");
        }

        async addTask(_req: AddTaskReq): Promise<AddTaskRes> {
                throw new Error("not implemented");
        }
}
