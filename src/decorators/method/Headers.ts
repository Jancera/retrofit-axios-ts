import { ensureMeta } from "../helpers/ensureMeta";
import { RetrofitHeaders } from "../types";

/**
 * Set static HTTP headers for API endpoint.
 * @param headers
 * @sample @Headers({
 *           "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
 *           "Accept": "application/json"
 *         })
 * @constructor
 */
export const Headers = (headers: RetrofitHeaders) => {
  return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
    ensureMeta(target, methodName);
    if (!target.__meta__[methodName].headers) {
      target.__meta__[methodName].headers = {};
    }
    target.__meta__[methodName].headers = headers;
  };
};
