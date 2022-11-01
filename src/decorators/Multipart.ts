import Headers from "./Headers";

/**
 * 'content-type': 'multipart/form-data' will be added to HTTP headers.
 * @param target
 * @param methodName
 * @param descriptor
 * @sample @Multipart
 * @constructor
 */
const Multipart = (
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor,
) => {
  Headers({ "content-type": "multipart/form-data" })(
    target,
    methodName,
    descriptor,
  );
};

export default Multipart;
