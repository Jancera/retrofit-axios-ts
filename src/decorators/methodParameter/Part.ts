import ensureMeta from "../helpers/ensureMeta";

/**
 * Set part of form data for API endpoint. Only effective when method has been decorated by @Multipart.
 * @param paramName
 * @sample @Part("bucket") bucket: PartDescriptor<string>
 * @constructor
 */
const Part = (paramName: string) => {
  return (target: any, methodName: string, paramIndex: number) => {
    ensureMeta(target, methodName);
    if (!target.__meta__[methodName].parts) {
      target.__meta__[methodName].parts = {};
    }
    target.__meta__[methodName].parts[paramIndex] = paramName;
  };
};

export default Part;
