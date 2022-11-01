import { AxiosRequestTransformer } from "axios";
import ensureMeta from "../helpers/ensureMeta";

/**
 * Set request transformer for method.
 * @param transformer
 * @sample @RequestTransformer((data: any, headers?: any) => {
 *           data.foo = 'foo';
 *           return JSON.stringify(data);
 *         })
 * @constructor
 */
const RequestTransformer = (transformer: AxiosRequestTransformer) => {
  return (target: any, methodName: string) => {
    ensureMeta(target, methodName);
    target.__meta__[methodName].requestTransformer = transformer;
  };
};

export default RequestTransformer;
