import { BaseService } from "../../BaseService";
import ensureMeta from "../helpers/ensureMeta";
import { QueryArrayFormat as QueryArrayFormatType } from "../types";

/**
 * Set array format for query
 * @param queryArrayFormat
 * @sample @QueryArrayFormat('repeat')
 * @constructor
 */
const QueryArrayFormat = (queryArrayFormat: QueryArrayFormatType) => {
  return (
    target: BaseService,
    methodName: string,
    descriptor: PropertyDescriptor,
  ) => {
    ensureMeta(target, methodName);
    target.__meta__[methodName].queryArrayFormat = queryArrayFormat;
  };
};

export default QueryArrayFormat;
