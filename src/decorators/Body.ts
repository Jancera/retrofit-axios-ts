import ensureMeta from "./helpers/ensureMeta";

/**
 * Set body for API endpoint.
 * @param target
 * @param methodName
 * @param paramIndex
 * @sample @Body user: User
 * @constructor
 */
const Body = (target: any, methodName: string, paramIndex: number) => {
  ensureMeta(target, methodName);
  target.__meta__[methodName].bodyIndex = paramIndex;
};

export default Body;
