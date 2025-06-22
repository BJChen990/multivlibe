import type {
        AddInstanceReq,
        AddInstanceRes,
} from "multivlibe-model/instances/add_instance";
import type {
        ListInstancesReq,
        ListInstancesRes,
} from "multivlibe-model/instances/list_instances";
import type { Instance } from "multivlibe-model/instances/instance";
import { delay } from "multivlibe-model/utils/delay";
import type { InstanceService } from "./instance_service";

/**
 * In-memory mock implementation of InstanceService used for development.
 */
const DEFAULT_DATE = new Date("2023-01-01T00:00:00Z").valueOf();

export class MockInstanceClient implements InstanceService {
        private instances: Instance[] = [
                {
                        id: 1,
                        repositoryId: 1,
                        location: "/tmp/repo1",
                        created: DEFAULT_DATE,
                        updated: DEFAULT_DATE,
                        occupiedBy: undefined,
                },
                {
                        id: 2,
                        repositoryId: 1,
                        location: "/tmp/repo1-copy",
                        created: DEFAULT_DATE,
                        updated: DEFAULT_DATE,
                        occupiedBy: "user1",
                },
        ];
        private nextId = 3;

        constructor(private readonly timeout: number = 1000) {}

        async listInstances(req: ListInstancesReq): Promise<ListInstancesRes> {
                await delay(this.timeout);

                const ids = req.repositoryIds;
                const result =
                        !ids || ids.length === 0
                                ? this.instances
                                : this.instances.filter((i) => ids.includes(i.repositoryId));

                return {
                        code: "ok",
                        instances: result,
                };
        }

        async addInstance(req: AddInstanceReq): Promise<AddInstanceRes> {
                await delay(this.timeout);

                try {
                        const now = Date.now();
                        const instance: Instance = {
                                id: this.nextId,
                                created: now,
                                updated: now,
                                ...req,
                        };
                        this.instances.push(instance);
                        this.nextId++;

                        return { code: "ok", instance };
                } catch (err) {
                        console.error(err);
                        return { code: "unknown_error" };
                }
        }
}
