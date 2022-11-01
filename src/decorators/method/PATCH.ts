import registerMethod from "../helpers/registerMethod";
import { HttpMethodOptions } from "../types";

/**
 * PATCH decorator.
 * @param url
 * @param options
 * @sample @PATCH("/users/{userId}")
 * @constructor
 */
const PATCH = (url: string, options?: HttpMethodOptions) => {
  return registerMethod("PATCH", url, options);
};

export default PATCH;
