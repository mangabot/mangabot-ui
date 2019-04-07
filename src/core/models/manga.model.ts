import StringUtils from "../utils/string.util";

export default class Manga {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  site: string;

  constructor(private name1?: string, private url1?: string) {
    this.id = StringUtils.createUUID();
    this.name = name1;
    this.url = url1;
  }
}