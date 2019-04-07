import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import Chapter from '../models/chapter.model';
import Manga from "../models/manga.model";
import PageSourceService from "../services/page-source.service";
import StringUtils from "../utils/string.util";
import Scraper, { DefaultScraper } from './scraper';

declare var $: any;

export class BlogTruyenScraper extends DefaultScraper implements Scraper {
  private pageSourceService = new PageSourceService();

  constructor() {
    super("http://blogtruyen.com/ajax/Search/AjaxLoadListManga?key=tatca&orderBy=1&p=");
  }


  getTotalPages(): Observable<number> {
    return this.pageSourceService.getPageSource(this.getMangaListUrl(1)).pipe(
      map(html => {
        let pagingFilter = "<(?<TAG>\\w+)[^>]*?class\\s*=\\s*['|\"]\\s*page\\s*['|\"][^>]*?>.*?</\\k<TAG>>";
        let pagingIndexFilter = "<a[^>]*?href[^>]*?LoadListMangaPage\\s*\\((?<INDEX>\\d+)\\)[^>]*?>(?<TEXT>.*?)</a>";
        let pagingBlock = "";

        let reg = new RegExp(pagingFilter, "gmi");
        let matches = html.match(reg);
        matches.forEach(m => pagingBlock += m + '<br/>');

        let match, lastMatch;
        reg = new RegExp(pagingIndexFilter, "gmi");
        while (match = reg.exec(pagingBlock)) {
          lastMatch = match;
        }

        return lastMatch != null ? +lastMatch.groups["INDEX"] : 1;
      })
    );
  }

  getMangaList(pageIndex: number): Observable<Array<Manga>> {
    return this.pageSourceService.getPageSource(this.getMangaListUrl(pageIndex)).pipe(
      map(html => {
        let blockFilter = "<(?<TAG>\\w+)[^>]*?class\\s*=\\s*[\"|']\\s*tiptip[^>]*?>(?<TEXT>(.|\\n|\\s)+?)</\\k<TAG>>";
        let nameAndUrlFilter = "<a[^>]*?href\\s*=\\s*[\"|'](?<MANGA_URL>.*?)[\"|'][^>]*?>(?<MANGA_NAME>.*?)</a>";

        let results = new Array<Manga>();
        let reg = new RegExp(blockFilter, 'gmi');
        let match;

        while (match = reg.exec(html)) {
          let subReg = new RegExp(nameAndUrlFilter, 'gmi');
          let subMatch: any = subReg.exec(match.groups['TEXT']);
          let name = StringUtils.trimAll(subMatch.groups['MANGA_NAME']);
          let url = StringUtils.fixUrl('http://blogtruyen.com', subMatch.groups['MANGA_URL']);
          if (name != null && url != null) {
            results.push(new Manga(name, url));
          }
        }

        return results;
      })
    );
  }

  getChapterList(mangaUrl: string): Observable<Array<Chapter>> {
    let reg = new RegExp("(http://|https://)?blogtruyen.com/(?<MANGA_ID>[^/]*?)/.*", "gmi");
    let match: any = reg.exec(mangaUrl);
    let mangaId = match.groups["MANGA_ID"];

    return this.pageSourceService.getPageSource(this.getChapterListUrl(mangaId)).pipe(
      map(html => {
        let results = new Array<Chapter>();
        let $doc = $(html);
        let chapterBlocks: Array<any> = $doc.find('#list-chapters p');
        for (let i = 0; i < chapterBlocks.length; i++) {
          let chapBlk = chapterBlocks[i];
          let title = $(chapBlk).find('.title a');
          let name = StringUtils.trimAll($(title).html());
          let url = StringUtils.fixUrl('http://blogtruyen.com', $(title).attr('href').replace(/\.\.\//gi, ''));
          if (name != null && url != null) {
            results.push(new Chapter(name, url));
          }
        }
        return results;
      })
    );
  }
}