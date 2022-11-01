import registerMethod from "./helpers/registerMethod";
import { HttpMethodOptions } from "./types";

/**
 * DELETE decorator.
 * @param url
 * @param options
 * @sample @DELETE("/users/{userId}")
 * @constructor
 */
const DELETE = (url: string, options?: HttpMethodOptions) => {
  return registerMethod("DELETE", url, options);
};

export default DELETE;
