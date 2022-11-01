import ensureMeta from "../helpers/ensureMeta";
import { Headers as HeadersObj } from "../types";
// [ ] Check Headers new API
/**
 * Set static HTTP headers for API endpoint.
 * @param headers
 * @sample @Headers({
 *           "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
 *           "Accept": "application/json"
 *         })
 * @constructor
 */
const Headers = (headers: HeadersObj) => {
  return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
    ensureMeta(target, methodName);
    if (!target.__meta__[methodName].headers) {
      target.__meta__[methodName].headers = {};
    }
    target.__meta__[methodName].headers = headers;
  };
};

export default Headers;
