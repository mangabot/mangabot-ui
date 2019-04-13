import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import Chapter from '../models/chapter.model';
import Manga from "../models/manga.model";
import Page from "../models/page.model";
import { SiteType } from "../models/site.model";
import LogService from "../services/log.service";
import PageSourceService from "../services/page-source.service";
import StringUtils from "../utils/string.util";
import DefaultScraper from "./default-scraper";
import Scraper from './scraper';


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

        const totalPages = lastMatch != null ? +lastMatch.groups["INDEX"] : 1;
        LogService.log(`Total Pages: ${totalPages}`);

        return totalPages;
      })
    );
  }

  getMangaList(pageIndex: number): Observable<Array<Manga>> {
    return this.pageSourceService.getPageSource(this.getMangaListUrl(pageIndex)).pipe(
      map(html => {
        let result = new Array<Manga>();

        let $ = this.loadHtml(html);
        let rows = $('.tiptip');
        let tips = $('.tiptip-content');

        for (let i = 0; i < rows.length; i++) {
          let row = rows[i];
          let tooltipId = row.attribs['data-tiptip'];
          let a = $('a', row);
          let name = StringUtils.trimAll(a.html());
          let url = StringUtils.fixUrl('http://blogtruyen.com', a.attr('href'));

          if (name != null && url != null) {
            let manga = new Manga();
            manga.name = name;
            manga.url = url;
            manga.site = SiteType[SiteType.BLOGTRUYEN];

            for (let k = 0; k < tips.length; k++) {
              if (tips[k].attribs['id'] === tooltipId) {
                manga.thumbnail = $('img', tips[k]).attr('src');
                break;
              }
            }

            result.push(manga);
          }
        }

        return result;
      })
    );
  }

  getChapterList(mangaUrl: string): Observable<Array<Chapter>> {
    return this.pageSourceService.getPageSource(this.getChapterListUrl(mangaUrl)).pipe(
      map(html => {
        let result = new Array<Chapter>();

        let $ = this.loadHtml(html);
        let chapterBlocks = $('#list-chapters p');

        for (let i = 0; i < chapterBlocks.length; i++) {
          let chapBlk = chapterBlocks[i];
          let a = $('.title a', chapBlk);
          let name = StringUtils.trimAll(a.html());
          let url = StringUtils.fixUrl('http://blogtruyen.com', a.attr('href').replace(/\.\.\//gi, ''));
          if (name != null && url != null) {
            let chapter = new Chapter();
            chapter.name = name;
            chapter.url = url;
            chapter.site = SiteType[SiteType.BLOGTRUYEN];
            result.push(chapter);
          }
        }

        return result;
      })
    );
  }

  getPageList(chapterUrl: string): Observable<Array<Page>> {
    return this.pageSourceService.getPageSource(this.getPageListUrl(chapterUrl)).pipe(
      map(html => {
        let result = new Array<Page>();
        let $doc = $(html);
        let chapterBlocks: Array<any> = $doc.find('#list-chapters p');
        for (let i = 0; i < chapterBlocks.length; i++) {
          let chapBlk = chapterBlocks[i];
          let title = $(chapBlk).find('.title a');
          let name = StringUtils.trimAll($(title).html());
          let url = StringUtils.fixUrl('http://blogtruyen.com', $(title).attr('href').replace(/\.\.\//gi, ''));
          if (name != null && url != null) {
            let page = new Page();
            page.url = url;
            page.site = SiteType[SiteType.BLOGTRUYEN];
            result.push(page);
          }
        }

        return result;
      })
    );
  }
}