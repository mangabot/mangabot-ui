import StringUtils from "../utils/string.util";

export default class Page {
  id: string = StringUtils.createUUID();
  url: string;
  site: string;
}