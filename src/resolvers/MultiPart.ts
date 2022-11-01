import BaseDataResolver from "./BaseData";

export default class MultiPartResolver extends BaseDataResolver {
  /* constructor() {
    super();
  } */

  public resolve(headers: any, data: any): any {
    const formData = new FormData();
    for (const key in data) {
      if (data[key].filename) {
        formData.append(key, data[key].value, data[key].filename);
      } else if (Array.isArray(data[key])) {
        for (const element of data[key]) {
          formData.append(key, element.value, element.filename);
        }
      } else if (Array.isArray(data[key].value)) {
        for (const element of data[key].value) {
          formData.append(key, element);
        }
      } else {
        formData.append(key, data[key].value);
      }
    }
    return formData;
  }
}
