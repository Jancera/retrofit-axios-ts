import { registerMethod } from "../helpers/registerMethod";
import { HttpMethodOptions } from "../types";

/**
 * OPTIONS decorator.
 * @param url
 * @param options
 * @sample @OPTIONS("/users/{userId}")
 * @constructor
 */
export const OPTIONS = (url: string, options?: HttpMethodOptions) => {
  return registerMethod("OPTIONS", url, options);
};
