import Headers from "./Headers";

/**
 * 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' will be added.
 * @param target
 * @param methodName
 * @param descriptor
 * @sample @FormUrlEncoded
 * @constructor
 */
const FormUrlEncoded = (
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor,
) => {
  Headers({
    "content-type": "application/x-www-form-urlencoded;charset=utf-8",
  })(target, methodName, descriptor);
};

export default FormUrlEncoded;
