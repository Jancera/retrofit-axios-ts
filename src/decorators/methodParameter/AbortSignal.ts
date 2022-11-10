import { ensureMeta } from "../helpers/ensureMeta";

/**
 * Set body for API endpoint.
 * @param target
 * @param methodName
 * @param paramIndex
 * @sample @AbortSignal callback: UploadProgressCallback
 * @constructor
 */

export const AbortSignal = (
  target: any,
  methodName: string,
  paramIndex: number,
) => {
  ensureMeta(target, methodName);
  target.__meta__[methodName].signal = paramIndex;
};
