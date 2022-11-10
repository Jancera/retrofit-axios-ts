import { BaseService } from "../../BaseService";
import { HttpMethod } from "../../constants";
import { HttpMethodOptions } from "../types";
import { ensureMeta } from "./ensureMeta";

/**
 * Register HTTP method and path in API method.
 * @param method
 * @param url
 * @param options
 */
export const registerMethod = (
  method: HttpMethod,
  url: string,
  options?: HttpMethodOptions,
) => {
  return (
    target: BaseService,
    methodName: string,
    descriptor: PropertyDescriptor,
  ) => {
    ensureMeta(target, methodName);
    target.__meta__[methodName].method = method;
    target.__meta__[methodName].path = url;
    target.__meta__[methodName].options = options;
  };
};
