import { ensureMeta } from "../helpers/ensureMeta";

/**
 * Declare response status code for method, do nothing just a declaration.
 * @param responseStatus
 * @sample ResponseStatus(204)
 * @constructor
 */
export const ResponseStatus = (responseStatus: number) => {
  return (target: any, methodName: string) => {
    ensureMeta(target, methodName);
    target.__meta__[methodName].responseStatus = responseStatus;
  };
};
