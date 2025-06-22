import type {
        AddTaskReq,
        AddTaskRes,
} from "multivlibe-model/tasks/add_task";
import type {
        ListTasksReq,
        ListTasksRes,
} from "multivlibe-model/tasks/list_tasks";

/** Service responsible for managing tasks attached to repository instances. */
export interface TaskService {
        /**
         * Retrieve tasks for the specified instances.
         *
         * @param req - optional instance IDs to filter by
         * @returns a response containing the matching tasks or an error code
         */
        listTasks: (req: ListTasksReq) => Promise<ListTasksRes>;

        /**
         * Create a new task for the given instance.
         *
         * @param req - instance ID, runner and title
         * @returns the created task or a failure response
         */
        addTask: (req: AddTaskReq) => Promise<AddTaskRes>;
}
