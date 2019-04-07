export default class DefaultScraper {
  constructor(public listUrl: string) { }

  getMangaListUrl(pageIndex: number): string {
    return process.env.REACT_APP_MOCK === "true" ?
      `assets/sites/mock/blogtruyen/blogtruyen-manga-list-${pageIndex}.html` :
      this.listUrl + pageIndex;
  }

  getChapterListUrl(mangaUrl: string): string {
    return process.env.REACT_APP_MOCK === "true" ?
      'assets/sites/mock/blogtruyen/blogtruyen-manga-detail.html' :
      mangaUrl;
  }

  getPageListUrl(chapterUrl: string): string {
    return process.env.REACT_APP_MOCK === "true" ?
      'assets/sites/mock/blogtruyen/blogtruyen-chapter.html' :
      chapterUrl;
  }
}