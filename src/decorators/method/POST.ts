import { registerMethod } from "../helpers/registerMethod";
import { HttpMethodOptions } from "../types";

/**
 * POST decorator.
 * @param url
 * @param options
 * @sample @POST("/users")
 * @constructor
 */
export const POST = (url: string, options?: HttpMethodOptions) => {
  return registerMethod("POST", url, options);
};
