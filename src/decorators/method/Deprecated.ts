import { ensureMeta } from "../helpers/ensureMeta";

/**
 * Mark method as deprecated
 * @param hint
 * @sample @Deprecated("This method is deprecated on version 2.0, please use xxx.")
 * @constructor
 */
export const Deprecated = (hint?: string) => {
  return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
    ensureMeta(target, methodName);
    target.__meta__[methodName].deprecated = true;
    target.__meta__[methodName].deprecatedHint = hint;
  };
};
