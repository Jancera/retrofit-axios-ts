import registerMethod from "../helpers/registerMethod";
import { HttpMethodOptions } from "../types";

/**
 * GET decorator.
 * @param url
 * @param options
 * @sample @GET("/users")
 * @constructor
 */
const GET = (url: string, options?: HttpMethodOptions) => {
  return registerMethod("GET", url, options);
};

export default GET;
