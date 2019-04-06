import randomKey from '../utils/RandomKey';

export default class SiteRepo {
  static get() {
    return [
      {
        id: randomKey(),
        name: 'Blog Truyện',
        url: 'blogtruyen.com',
        icon: '',
        category: 'Vietnamese'
      },
      {
        id: randomKey(),
        name: 'Truyện Tranh 8',
        url: 'truyentranh8.net',
        icon: '',
        category: 'Vietnamese'
      },
      {
        id: randomKey(),
        name: 'Truyện Tranh Tuần',
        url: 'truyentranhtuan.com',
        icon: '',
        category: 'Vietnamese'
      },
      {
        id: randomKey(),
        name: 'MangaK',
        url: 'mangak.info',
        icon: '',
        category: 'Vietnamese'
      },
      {
        id: randomKey(),
        name: 'Manga Fox',
        url: 'mangafox.me',
        icon: '',
        category: 'English'
      },
      {
        id: randomKey(),
        name: 'Manga Park',
        url: 'mangapark.me',
        icon: '',
        category: 'English'
      }
    ];
  }
}
