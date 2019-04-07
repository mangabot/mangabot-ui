import React, { Component } from 'react';
import { Categories, Sites, SiteType } from '../core/models/site.model';
import { ScraperFactory } from '../core/scrapers/scraper';
import './MangaList.css';
import { tap, switchMap, repeat, finalize } from 'rxjs/operators';

export default class MangaList extends Component {
  scraperFactory = new ScraperFactory();

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      categories: Categories,
      sites: Sites,
      activeSiteId: Sites[0].id,
      activeSite: Sites[0],
      mangas: [],
      totalManga: 0
    };
  }

  getActiveSiteName() {
    return this.state.sites.find(s => s.id === this.state.activeSiteId).name;
  }

  handleSiteSelected = siteId => e => {
    let activeSite = this.state.sites.find(site => site.id === siteId);

    this.setState({ activeSiteId: siteId, activatedSite: activeSite });

    this.props.onSiteSelected(activeSite);

    let scraper = this.scraperFactory.getScraper(SiteType[activeSite.type]);

    scraper
      .getTotalPages()
      .pipe(
        tap(total => this.setState({ totalManga: total })),
        switchMap(total => scraper.getMangaList(1)),
        repeat(5),
        finalize(() => {
          this.loading = false;
          console.log('Fetch manga completed.');
        })
      )
      .subscribe(list => this.setState({ mangas: list }));
  };

  handleMangaSelected = mangaId => e => {
    this.setState({ activeMangaId: mangaId });
    this.props.onMangaSelected(
      this.state.mangas.find(manga => manga.id === mangaId)
    );
  };

  render() {
    const { categories, sites, mangas, activeSiteId } = this.state;

    return (
      <div className="">
        <div className="mb-searchbox uk-padding-small uk-padding-remove-top uk-padding-remove-bottom">
          <form className="uk-search uk-search-default uk-width-1-1">
            <a
              href=""
              className="uk-search-icon-flip"
              data-uk-search-icon
              data-uk-icon="search"
            />
            <input
              className="uk-search-input"
              type="search"
              placeholder="Tìm theo tên truyện, link"
            />
          </form>
        </div>

        <hr className="mb-hr" />

        <div className="mb-site-selector uk-padding-small uk-padding-remove-top uk-padding-remove-bottom">
          <a className="uk-link-reset">
            {this.getActiveSiteName()} <span uk-icon="icon: triangle-down" />
          </a>
          <div className="uk-width-large" data-uk-dropdown="mode: click">
            <div
              className="uk-dropdown-grid uk-child-width-1-2 uk-grid-divider"
              data-uk-grid
            >
              {categories.map(cat => (
                <div key={cat}>
                  <ul className="uk-nav uk-dropdown-nav">
                    <li className="uk-nav-header">{cat}</li>
                    {sites
                      .filter(site => site.category === cat)
                      .map(site => (
                        <li key={site.id}>
                          <a
                            href="#"
                            onClick={this.handleSiteSelected(site.id)}
                          >
                            {site.name}
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="mb-hr" />

        <div className="">
          <ul className="uk-nav-default uk-nav-parent-icon" data-uk-nav>
            <li className="uk-nav-header uk-padding-small uk-padding-remove-top">
              Danh sách truyện: {mangas.length}
            </li>

            {mangas.map(m => (
              <MangaListItem
                key={m.id}
                manga={m}
                active={activeSiteId === m.id}
                onSelected={this.handleMangaSelected(m.id)}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

class MangaListItem extends Component {
  handleClicked = () => {
    this.props.onSelected();
  };

  render() {
    const { active, manga } = this.props;

    return (
      <React.Fragment>
        <li className={active ? 'uk-active' : ''}>
          <a className="uk-padding-small" href="#" onClick={this.handleClicked}>
            <div className="uk-flex uk-flex-middle uk-padding-small uk-padding-remove-top uk-padding-remove-bottom">
              <img src={manga.thumbnail} width="48px" height="48px" alt="" />
              <span className="uk-margin-left">{manga.name}</span>
            </div>
          </a>
        </li>
        <li className="uk-nav-divider" />
      </React.Fragment>
    );
  }
}
