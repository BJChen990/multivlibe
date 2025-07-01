import type {
  AddInstanceReq,
  AddInstanceRes,
} from "multivlibe-model/instances/add_instance";
import type {
  ListInstancesReq,
  ListInstancesRes,
} from "multivlibe-model/instances/list_instances";
import type { InstanceService } from "./instance_service";

export class HttpInstanceClient implements InstanceService {
  async listInstances(_req: ListInstancesReq): Promise<ListInstancesRes> {
    throw new Error("not implemented");
  }

  async addInstance(_req: AddInstanceReq): Promise<AddInstanceRes> {
    throw new Error("not implemented");
  }
}
