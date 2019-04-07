import StringUtils from "../utils/string.util";

export default class Chapter {
  id: string = StringUtils.createUUID();
  name: string;
  url: string;
  thumbnail: string;
  site: string;
}