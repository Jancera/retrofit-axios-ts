import { AxiosRequestConfig } from "axios";
import ensureMeta from "../helpers/ensureMeta";

/**
 * A direct way to set config for a request in axios.
 * @param config
 * @sample @Config({ maxRedirects: 1 })
 * @constructor
 */
const Config = (config: Partial<AxiosRequestConfig>) => {
  return (target: any, methodName: string, another: any) => {
    /* console.warn("Target", target);
    console.warn("MethodName", methodName);
    console.warn("Another", another); */
    ensureMeta(target, methodName);
    target.__meta__[methodName].config = config;
  };
};

export default Config;
