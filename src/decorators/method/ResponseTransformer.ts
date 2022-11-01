import { AxiosResponseTransformer } from "axios";
import ensureMeta from "../helpers/ensureMeta";

/**
 * Set response transformer for method.
 * @param transformer
 * @sample @ResponseTransformer((data: any, headers?: any) => {
 *           const json = JSON.parse(data);
 *           json.foo = 'foo';
 *           return json;
 *         })
 * @constructor
 */
const ResponseTransformer = (transformer: AxiosResponseTransformer) => {
  return (target: any, methodName: string) => {
    ensureMeta(target, methodName);
    target.__meta__[methodName].responseTransformer = transformer;
  };
};

export default ResponseTransformer;
