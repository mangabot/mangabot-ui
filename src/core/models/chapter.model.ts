import randomKey from "../utils/RandomKey";

export default class Chapter {
  id: string = randomKey();
  name: string;
  url: string;
  thumbnail: string;
  site: string;
}