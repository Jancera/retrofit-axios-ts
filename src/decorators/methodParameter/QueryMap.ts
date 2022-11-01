import ensureMeta from "../helpers/ensureMeta";

/**
 * Set query map for API endpoint.
 * @param target
 * @param methodName
 * @param paramIndex
 * @sample @QueryMap query: SearchQuery
 * @constructor
 */
const QueryMap = (target: any, methodName: string, paramIndex: number) => {
  ensureMeta(target, methodName);
  target.__meta__[methodName].queryMapIndex = paramIndex;
};

export default QueryMap;
