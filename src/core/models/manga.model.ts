import randomKey from "../utils/RandomKey";

export default class Manga {
  id: string = randomKey();
  name: string;
  url: string;
  thumbnail: string;
  site: string;
}