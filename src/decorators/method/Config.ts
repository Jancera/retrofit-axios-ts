import { AxiosRequestConfig } from "axios";
import { ensureMeta } from "../helpers/ensureMeta";

/**
 * A direct way to set config for a request in axios.
 * @param config
 * @sample @Config({ maxRedirects: 1 })
 * @constructor
 */
export const Config = (config: Partial<AxiosRequestConfig>) => {
  return (target: any, methodName: string, another: any) => {
    ensureMeta(target, methodName);
    target.__meta__[methodName].config = config;
  };
};
