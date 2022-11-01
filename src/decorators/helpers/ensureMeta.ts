import { BaseService } from "../../BaseService";

/**
 * Ensure the `__meta__` attribute is in the target object and `methodName` has been initialized.
 * @param target
 * @param methodName
 */
const ensureMeta = (target: BaseService, methodName: string) => {
  if (!target.__meta__) {
    target.__meta__ = {};
  }
  if (!target.__meta__[methodName]) {
    target.__meta__[methodName] = {};
  }
};

export default ensureMeta;
