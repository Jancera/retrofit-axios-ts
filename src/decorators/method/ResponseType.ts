import { ResponseType as AxiosResponseType } from "axios";
import { ensureMeta } from "../helpers/ensureMeta";

/**
 * Set the response type for method.
 * @param responseType
 * @sample @ResponseType("stream")
 * @constructor
 */
export const ResponseType = (responseType: AxiosResponseType) => {
  return (target: any, methodName: string) => {
    ensureMeta(target, methodName);
    target.__meta__[methodName].responseType = responseType;
  };
};
