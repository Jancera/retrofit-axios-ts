import { ensureMeta } from "../helpers/ensureMeta";

/**
 * Set download progress callback for API endpoint.
 * @param target
 * @param methodName
 * @param paramIndex
 * @sample @DownloadProgress callback: DownloadProgressCallback
 * @constructor
 */

export const DownloadProgress = (
  target: any,
  methodName: string,
  paramIndex: number,
) => {
  ensureMeta(target, methodName);
  target.__meta__[methodName].downloadProgressIndex = paramIndex;
};
