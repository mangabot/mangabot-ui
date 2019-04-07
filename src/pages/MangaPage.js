import React, { Component } from 'react';
import styles from './MangaPage.module.css';
import MangaList from '../components/MangaList';
import MangaDetail from '../components/MangaDetail';
import readme from '../README.md';

export default class MangaPage extends Component {
  constructor(props) {
    super(props);

    this.state = { activeSite: null, activeManga: null };
  }

  handleSiteSelected = site => {
    this.setState({ activeSite: site });
  };

  handleMangaSelected = manga => {
    this.setState({ activeManga: manga });
  };

  wrapMarkup = html => ({
    __html: html
  });

  render() {
    const { activeSite, activeManga } = this.state;

    return (
      <div
        className={
          styles.mbGridDivider +
          ' uk-grid-divider uk-grid-match uk-child-width-1-3'
        }
        data-uk-grid
      >
        <div className="">
          <MangaList
            onSiteSelected={this.handleSiteSelected}
            onMangaSelected={this.handleMangaSelected}
          />
        </div>

        <div className="uk-width-2-3">
          {activeManga == null ? (
            <div
              className="markdown"
              dangerouslySetInnerHTML={this.wrapMarkup(readme)}
            />
          ) : (
            <MangaDetail site={activeSite} manga={activeManga} />
          )}
        </div>
      </div>
    );
  }
}
