import { ensureMeta } from "../helpers/ensureMeta";

/**
 * Set field of form for API endpoint. Only effective when method has been decorated by @FormUrlEncoded.
 * @param paramName
 * @sample @Field("title") title: string
 * @constructor
 */

export const Field = (paramName: string) => {
  return (target: any, methodName: string, paramIndex: number) => {
    ensureMeta(target, methodName);
    if (!target.__meta__[methodName].fields) {
      target.__meta__[methodName].fields = {};
    }
    target.__meta__[methodName].fields[paramIndex] = paramName;
  };
};
