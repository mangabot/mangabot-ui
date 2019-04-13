import React, { Component } from 'react';
import styles from './MangaDetail.module.css';
import { SiteType } from '../core/models/site.model';
import { ScraperFactory } from '../core/scrapers/scraper';
import Chapter from '../core/models/chapter.model';
import { tap, finalize } from 'rxjs/operators';

export default class MangaDetail extends Component {
  scraperFactory = new ScraperFactory();

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      chapters: []
    };

    let scraper = this.scraperFactory.getScraper(
      SiteType[this.props.site.type]
    );

    scraper
      .getChapterList(this.props.manga.url)
      .pipe(finalize(() => this.setState({ loading: false })))
      .subscribe(list => this.setState({ chapters: list }));
  }

  handleAddQueue() {}

  render() {
    const { site, manga } = this.props;
    const { loading, chapters } = this.state;

    return (
      <div className="">
        <div uk-spinner="ratio: 2" className="uk-align-center uk-text-center" />

        <div
          className={
            styles.mbMangaName +
            ' uk-flex uk-flex-middle uk-margin-left uk-margin-right'
          }
        >
          <div className="uk-flex uk-flex-middle">
            <img src={manga.thumbnail} className="{styles.mangaImage}" alt="" />
            <span className="uk-margin-left">{manga.name}</span>
          </div>
          <ul className="uk-flex-right uk-flex-auto uk-iconnav">
            <li>
              <a href="#" uk-icon="icon: plus" onClick={this.handleAddQueue} />
            </li>
            <li>
              <a
                href="#"
                uk-icon="icon: download"
                onClick={this.handleAddQueue}
              />
            </li>
          </ul>
        </div>

        <hr className={styles.mbHr} />

        <div className="">
          <table className="uk-table">
            <thead>
              <tr>
                <th>TT</th>
                <th>Tập</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {chapters.map(chapter => (
                <tr key={chapter.id}>
                  <td>{chapter.id}</td>
                  <td>{chapter.name}</td>
                  <td className="uk-text-center">
                    <span
                      data-uk-icon="icon: check"
                      className="uk-text-success"
                    />
                  </td>
                  <td className="uk-text-center">
                    <a
                      href="#"
                      className="uk-icon-link"
                      data-uk-icon="download"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
