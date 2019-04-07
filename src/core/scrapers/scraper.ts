import { Observable } from "rxjs";
import Chapter from '../models/chapter.model.js';
import Manga from '../models/manga.model.js';
import { SiteType } from "../models/site.model";
import { BlogTruyenScraper } from "./blogtruyen-scraper.js";

export default interface Scraper {
  getTotalPages(): Observable<number>;
  getMangaList(pageIndex: number): Observable<Array<Manga>>;
  getChapterList(mangaUrl: string): Observable<Array<Chapter>>;
}

export class DefaultScraper {
  constructor(public listUrl: string) { }

  getMangaListUrl(pageIndex: number): string {
    return process.env.MOCK ? 'assets/sites/mock/blogtruyen-manga-list.html' : this.listUrl + pageIndex;
  }

  getChapterListUrl(mangaId: number): string {
    return process.env.MOCK ? 'assets/sites/mock/blogtruyen-manga-detail.html' : "http://blogtruyen.com/ajax/Chapter/PartialLoadListChapter?mangaId=" + mangaId;
  }
}


export class ScraperFactory {

  getScraper(site: SiteType): Scraper {
    if (site === SiteType.BLOGTRUYEN) return new BlogTruyenScraper();

    throw "Unsupported site " + site;
  }
}