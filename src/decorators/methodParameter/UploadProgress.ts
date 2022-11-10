import { ensureMeta } from "../helpers/ensureMeta";

/**
 * Set upload progress callback for API endpoint.
 * @param target
 * @param methodName
 * @param paramIndex
 * @sample @UploadProgress callback: UploadProgressCallback
 * @constructor
 */

export const UploadProgress = (
  target: any,
  methodName: string,
  paramIndex: number,
) => {
  ensureMeta(target, methodName);
  target.__meta__[methodName].uploadProgressIndex = paramIndex;
};
