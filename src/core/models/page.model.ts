import randomKey from "../utils/RandomKey";

export default class Page {
  id: string = randomKey();
  url: string;
  site: string;
}