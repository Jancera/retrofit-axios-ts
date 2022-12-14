import { ensureMeta } from "../helpers/ensureMeta";
import { RetrofitQuery } from "../types";

/**
 * Set static query for API endpoint.
 * @param query
 * @sample @Queries({
 *           page: 1,
 *           size: 20,
 *           sort: "createdAt:desc",
 *         })
 * @constructor
 */
export const Queries = (query: RetrofitQuery) => {
  return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
    ensureMeta(target, methodName);
    if (!target.__meta__[methodName].query) {
      target.__meta__[methodName].query = {};
    }
    target.__meta__[methodName].query = query;
  };
};
