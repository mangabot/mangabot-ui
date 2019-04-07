import randomKey from '../utils/RandomKey';

export default class ChapterRepo {
  get(mangaId) {
    return [
      {
        id: randomKey(),
        name: 'Kanojo to Kanojo no Neko',
        thumbnail:
          'http://mangak.info/wp-content/uploads/2014/03/The-Gamer-61x61.png'
      },
      {
        id: randomKey(),
        name: ':rebirth',
        thumbnail:
          'http://mangak.info/wp-content/uploads/2014/07/Noragami-61x61.jpg'
      },
      {
        id: randomKey(),
        name: '[LH] LADY JUSTICE MANGA',
        thumbnail:
          'http://mangak.info/wp-content/uploads/2014/08/soma-61x61.jpg'
      }
    ];
  }
}
