import ensureMeta from "../helpers/ensureMeta";

/**
 * Set body for API endpoint.
 * @param target
 * @param methodName
 * @param paramIndex
 * @sample @UploadProgress callback: UploadProgressCallback
 * @constructor
 */
const UploadProgress = (
  target: any,
  methodName: string,
  paramIndex: number,
) => {
  ensureMeta(target, methodName);
  target.__meta__[methodName].uploadProgressIndex = paramIndex;
};

export default UploadProgress;
