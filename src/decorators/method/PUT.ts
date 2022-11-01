import registerMethod from "../helpers/registerMethod";
import { HttpMethodOptions } from "../types";

/**
 * PUT decorator.
 * @param url
 * @param options
 * @sample @PUT("/users/{userId}")
 * @constructor
 */
const PUT = (url: string, options?: HttpMethodOptions) => {
  return registerMethod("PUT", url, options);
};

export default PUT;
