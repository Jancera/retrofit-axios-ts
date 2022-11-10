import { BaseService } from "../../BaseService";
import { ensureMeta } from "../helpers/ensureMeta";
import { RetrofitQueryArrayFormat } from "../types";

/**
 * Set array format for query
 * @param queryArrayFormat
 * @sample @QueryArrayFormat('repeat')
 * @constructor
 */
export const QueryArrayFormat = (
  queryArrayFormat: RetrofitQueryArrayFormat,
) => {
  return (
    target: BaseService,
    methodName: string,
    descriptor: PropertyDescriptor,
  ) => {
    ensureMeta(target, methodName);
    target.__meta__[methodName].queryArrayFormat = queryArrayFormat;
  };
};
