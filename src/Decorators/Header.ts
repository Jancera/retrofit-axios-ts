import ensureMeta from "./helpers/ensureMeta";

/**
 * Set HTTP header as variable in API method.
 * @param paramName
 * @sample @Header("X-Token") token: string
 * @constructor
 */
const Header = (paramName: string) => {
  return (target: any, methodName: string, paramIndex: number) => {
    ensureMeta(target, methodName);
    if (!target.__meta__[methodName].headerParams) {
      target.__meta__[methodName].headerParams = {};
    }
    target.__meta__[methodName].headerParams[paramIndex] = paramName;
  };
};

export default Header;
