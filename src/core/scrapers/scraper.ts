import { Observable } from "rxjs";
import Chapter from '../models/chapter.model';
import Manga from '../models/manga.model';
import Page from "../models/page.model";
import { SiteType } from "../models/site.model";
import { BlogTruyenScraper } from "./blogtruyen-scraper";

export default interface Scraper {
  getTotalPages(): Observable<number>;
  getMangaList(pageIndex: number): Observable<Array<Manga>>;
  getChapterList(mangaUrl: string): Observable<Array<Chapter>>;
  getPageList(chapterUrl: string): Observable<Array<Page>>;
}


export class ScraperFactory {

  getScraper(site: SiteType): Scraper {
    if (site === SiteType.BLOGTRUYEN) return new BlogTruyenScraper();

    throw "Unsupported site " + site;
  }
}