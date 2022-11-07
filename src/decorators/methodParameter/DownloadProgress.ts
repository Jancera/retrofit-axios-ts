import ensureMeta from "../helpers/ensureMeta";

/**
 * Set body for API endpoint.
 * @param target
 * @param methodName
 * @param paramIndex
 * @sample @DownloadProgress callback: DownloadProgressCallback
 * @constructor
 */
const DownloadProgress = (
  target: any,
  methodName: string,
  paramIndex: number,
) => {
  ensureMeta(target, methodName);
  target.__meta__[methodName].downloadProgressIndex = paramIndex;
};

export default DownloadProgress;
