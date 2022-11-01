import ensureMeta from "../helpers/ensureMeta";

/**
 * Set header map for API endpoint.
 * @param target
 * @param methodName
 * @param paramIndex
 * @sample @HeaderMap headers: any
 * @constructor
 */
const HeaderMap = (target: any, methodName: string, paramIndex: number) => {
  ensureMeta(target, methodName);
  target.__meta__[methodName].headerMapIndex = paramIndex;
};

export default HeaderMap;
