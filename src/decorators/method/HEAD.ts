import { registerMethod } from "../helpers/registerMethod";
import { HttpMethodOptions } from "../types";

/**
 * HEAD decorator.
 * @param url
 * @param options
 * @sample @HEAD("/users/{userId}")
 * @constructor
 */
export const HEAD = (url: string, options?: HttpMethodOptions) => {
  return registerMethod("HEAD", url, options);
};
