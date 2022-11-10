import { ensureMeta } from "../helpers/ensureMeta";

/**
 * Set query as variable in API method.
 * @param paramName
 * @sample @Query('group') group: string
 * @constructor
 */

export const Query = (paramName: string) => {
  return (target: any, methodName: string, paramIndex: number) => {
    ensureMeta(target, methodName);
    if (!target.__meta__[methodName].queryParams) {
      target.__meta__[methodName].queryParams = {};
    }
    target.__meta__[methodName].queryParams[paramIndex] = paramName;
  };
};

export default Query;
