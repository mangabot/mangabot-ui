import React, { Component } from 'react';
import './App.css';
import MangaList from './components/MangaList';
import MangaDetail from './components/MangaDetail';

class App extends Component {
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

  render() {
    const { activeSite, activeManga } = this.state;

    return (
      <div className="App">
        <div className="app-title-bar">
          <div className="app-name">Manga Bot</div>
        </div>

        <ul className="app-toolbar uk-subnav uk-subnav-pill" data-uk-margin>
          <li className="uk-active">
            <a href="#">Danh sách truyện</a>
          </li>
          <li>
            <a href="#">Danh sách tải</a>
          </li>
          <li>
            <a href="#">Cấu hình</a>
          </li>
        </ul>

        <div
          className="app-content-container uk-grid-divider uk-grid-match uk-child-width-1-3"
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
              <div />
            ) : (
              <MangaDetail site={activeSite} manga={activeManga} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
