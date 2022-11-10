import { ensureMeta } from "../helpers/ensureMeta";

/**
 * Set path parameter for API endpoint.
 * @param paramName
 * @sample @Path("userId") userId: number
 * @constructor
 */

export const Path = (paramName: string) => {
  return (target: any, methodName: string, paramIndex: number) => {
    ensureMeta(target, methodName);
    if (!target.__meta__[methodName].pathParams) {
      target.__meta__[methodName].pathParams = {};
    }
    target.__meta__[methodName].pathParams[paramIndex] = paramName;
  };
};
