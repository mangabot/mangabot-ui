import {
  BlogTruyen,
  TruyenTranh8,
  TruyenTranhTuan,
  MangaK,
  MangaFox,
  MangaPark
} from '../models/site.model';

export default class SiteRepo {
  static get() {
    return [
      BlogTruyen,
      TruyenTranh8,
      TruyenTranhTuan,
      MangaK,
      MangaFox,
      MangaPark
    ];
  }
}
