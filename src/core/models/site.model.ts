export default class Site {
  id: string;
  domain: string;
  name: string;
  logo: string;
  category: string;
  type: string;
}

export enum CategoryType {
  VIETNAMESE, ENGLISH
}

export const Categories = [
  CategoryType[CategoryType.VIETNAMESE],
  CategoryType[CategoryType.ENGLISH]
];

export enum SiteType {
  // Vietnamese
  BLOGTRUYEN,
  TRUYENTRANH8,
  TRUYENTRANHTUAN,
  MANGAK,

  // English
  MANGAFOX,
  MANGAPARK
}

export const BlogTruyen: Site = {
  id: 'bt',
  domain: 'blogtruyen.com',
  name: 'Blog Truyen',
  logo: 'assets/sites/blogtruyen.jpg',
  category: CategoryType[CategoryType.VIETNAMESE],
  type: SiteType[SiteType.BLOGTRUYEN],
};

export const TruyenTranh8: Site = {
  id: 'tt8',
  domain: 'truyentranh8.net',
  name: 'Truyện Tranh 8',
  logo: 'assets/sites/blogtruyen.jpg',
  category: CategoryType[CategoryType.VIETNAMESE],
  type: SiteType[SiteType.TRUYENTRANH8],
};

export const TruyenTranhTuan: Site = {
  id: 'ttt',
  domain: 'truyentranhtuan.com',
  name: 'Truyện Tranh Tuần',
  logo: 'assets/sites/blogtruyen.jpg',
  category: CategoryType[CategoryType.VIETNAMESE],
  type: SiteType[SiteType.TRUYENTRANHTUAN],
};

export const MangaK: Site = {
  id: 'mk',
  domain: 'mangak.info',
  name: 'MangaK',
  logo: 'assets/sites/blogtruyen.jpg',
  category: CategoryType[CategoryType.VIETNAMESE],
  type: SiteType[SiteType.MANGAK],
};

export const MangaFox: Site = {
  id: 'mf',
  domain: 'mangafox.me',
  name: 'Manga Fox',
  logo: 'assets/sites/mangafox.png',
  category: CategoryType[CategoryType.ENGLISH],
  type: SiteType[SiteType.MANGAFOX]
};

export const MangaPark: Site = {
  id: 'mp',
  domain: 'mangapark.me',
  name: 'Manga Park',
  logo: 'assets/sites/mangafox.png',
  category: CategoryType[CategoryType.ENGLISH],
  type: SiteType[SiteType.MANGAPARK]
};

export const Sites = [
  BlogTruyen,
  TruyenTranh8,
  TruyenTranhTuan,
  MangaK,
  MangaFox,
  MangaPark
];