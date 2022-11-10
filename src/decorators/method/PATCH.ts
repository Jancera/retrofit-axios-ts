import { registerMethod } from "../helpers/registerMethod";
import { HttpMethodOptions } from "../types";

/**
 * PATCH decorator.
 * @param url
 * @param options
 * @sample @PATCH("/users/{userId}")
 * @constructor
 */
export const PATCH = (url: string, options?: HttpMethodOptions) => {
  return registerMethod("PATCH", url, options);
};
