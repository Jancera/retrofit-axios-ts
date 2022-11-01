import BaseDataResolver from "./BaseData";

export default class TextXmlResolver extends BaseDataResolver {
  /* constructor() {
    super();
  } */

  public resolve(headers: any, data: any): any {
    return data;
  }
}
