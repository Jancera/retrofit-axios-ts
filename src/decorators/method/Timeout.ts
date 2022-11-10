import { ensureMeta } from "../helpers/ensureMeta";

/**
 * Set timeout for method, this config will shield service timeout.
 * @param timeout
 * @sample @Timeout(5000)
 * @constructor
 */
export const Timeout = (timeout: number) => {
  return (target: any, methodName: string) => {
    ensureMeta(target, methodName);
    target.__meta__[methodName].timeout = timeout;
  };
};
