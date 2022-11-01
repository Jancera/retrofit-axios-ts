import * as qs from "qs";
import BaseDataResolver from "./BaseData";

export default class FormUrlencodedResolver extends BaseDataResolver {
  /*   constructor() {
    super();
  } */

  public resolve(headers: any, data: any): any {
    const deepStringify = (obj: any) => {
      const res = {};
      for (const key in obj) {
        if (!obj.hasOwnProperty(key)) {
          continue;
        }
        if (typeof obj[key] === "object") {
          res[key] = JSON.stringify(obj[key]);
        } else {
          res[key] = obj[key];
        }
      }
      return qs.stringify(res);
    };
    return deepStringify(data);
  }
}
