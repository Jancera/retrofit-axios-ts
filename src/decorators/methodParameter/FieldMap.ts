import ensureMeta from "../helpers/ensureMeta";

/**
 * Set field map for API endpoint.
 * @param target
 * @param methodName
 * @param paramIndex
 * @sample @FieldMap post: Post
 * @constructor
 */
const FieldMap = (target: any, methodName: string, paramIndex: number) => {
  ensureMeta(target, methodName);
  target.__meta__[methodName].fieldMapIndex = paramIndex;
};

export default FieldMap;
