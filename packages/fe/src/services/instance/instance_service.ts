import type {
  AddInstanceReq,
  AddInstanceRes,
} from "multivlibe-model/instances/add_instance";
import type {
  ListInstancesReq,
  ListInstancesRes,
} from "multivlibe-model/instances/list_instances";

/**
 * Service responsible for managing repository instances.
 *
 * An instance represents a cloned repository located at a specific path on disk.
 * Each instance belongs to a repository and may be temporarily occupied by a user.
 */
export interface InstanceService {
  /**
   * Retrieve instances for the specified repositories.
   *
   * @param req - optional repository IDs to filter by
   * @returns a response containing the matching instances or an error code
   */
  listInstances: (req: ListInstancesReq) => Promise<ListInstancesRes>;

  /**
   * Create a new instance in the given location.
   *
   * @param req - repository ID, location and optional occupiedBy value
   * @returns the created instance or a failure response
   */
  addInstance: (req: AddInstanceReq) => Promise<AddInstanceRes>;
}
