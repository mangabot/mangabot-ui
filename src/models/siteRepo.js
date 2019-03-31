import randomKey from "../utils/RandomKey";

export default class SiteRepo {

  static get() {
    return [{
        id: randomKey(),
        name: 'BlogTruyện',
        url: 'blogtruyen.com',
        icon: '',
        category: 'Vietnamese'
      },
      {
        id: randomKey(),
        name: 'TruyệnTranh8',
        url: 'truyentranh8.net',
        icon: '',
        category: 'Vietnamese'
      },
      {
        id: randomKey(),
        name: 'TruyệnTranhTuần',
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
        name: 'MangaFox',
        url: 'mangafox.me',
        icon: '',
        category: 'English'
      },
      {
        id: randomKey(),
        name: 'MangaPark',
        url: 'mangapark.me',
        icon: '',
        category: 'English'
      }
    ];
  }
}