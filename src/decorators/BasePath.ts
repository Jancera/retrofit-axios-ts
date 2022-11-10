import { BaseService } from "../BaseService";
import { ensureMeta } from "./helpers/ensureMeta";

/**
 * Set base path for API service.
 * @param path
 * @sample @BasePath("/api/v1")
 * @constructor
 */

export const BasePath = (path: string) => {
  return (target: typeof BaseService) => {
    ensureMeta(target.prototype, "basePath");
    target.prototype.__meta__.basePath = path;
  };
};
