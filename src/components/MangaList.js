import React, { Component } from 'react';
import randomKey from '../utils/RandomKey';
import MangaRepo from '../models/mangaRepo';
import SiteRepo from '../models/siteRepo';
import CategoryRepo from '../models/categoryRepo';

export default class MangaList extends Component {
  constructor(props) {
    super(props);

    const sites = SiteRepo.get();

    this.state = {
      open: false,
      categories: CategoryRepo.get(),
      activeSiteId: sites[0].id,
      sites: sites,
      mangas: MangaRepo.get()
    };
  }

  getActiveSiteName() {
    return this.state.sites.find(s => s.id === this.state.activeSiteId).name;
  }

  handleSiteSelected = siteId => e => {
    this.setState({ activeSiteId: siteId });
    this.props.onSiteSelected(
      this.state.sites.find(site => site.id === siteId)
    );
  };

  handleMangaSelected = mangaId => e => {
    this.setState({ activeMangaId: mangaId });
    this.props.onMangaSelected(
      this.state.mangas.find(manga => manga.id === mangaId)
    );
  };

  render() {
    const { categories, sites, mangas } = this.state;

    return (
      <div className="">
        <h4 className="uk-margin-remove-bottom">
          <a className="uk-link-reset">
            {this.getActiveSiteName()} <span uk-icon="icon: triangle-down" />
          </a>
        </h4>
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
                        <a href="#" onClick={this.handleSiteSelected(site.id)}>
                          {site.name}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr />

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

        <hr />

        <div className="">
          <ul className="uk-nav-default uk-nav-parent-icon" data-uk-nav>
            <li className="uk-nav-header uk-margin-bottom">
              Danh sách truyện: {mangas.length}
            </li>

            {mangas.map(m => (
              <li key={m.id}>
                <a href="#" onClick={this.handleMangaSelected(m.id)}>
                  <img src={m.thumbnail} width="48px" height="48px" alt="" />
                  <span className="uk-margin-left">{m.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
