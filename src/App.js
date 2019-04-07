import React, { Component } from 'react';
import { Route, Switch, Link, NavLink } from 'react-router-dom';
import './App.css';
import MangaPage from './pages/MangaPage';
import SettingsPage from './pages/SettingsPage';
import QueuePage from './pages/QueuePage';
import routes from './constants/routes';

class App extends Component {
  Routes = [{ MANGA: 1 }, { QUEUE: 2 }, { SETTINGS: 3 }];

  render() {
    return (
      <div className="App">
        <div className="app-title-bar">
          <div className="app-name">Manga Bot</div>
        </div>

        <ul className="app-toolbar uk-subnav uk-subnav-pill" data-uk-margin>
          <li className="uk-active">
            <Link
              to={{
                pathname: routes.HOME,
                state: { isHomeRoute: true }
              }}
            >
              Danh sách truyện
            </Link>
          </li>
          <li>
            <NavLink
              to={{
                pathname: routes.QUEUE,
                state: { activeRoute: routes.QUEUE }
              }}
            >
              Danh sách tải
            </NavLink>
          </li>
          <li>
            <NavLink
              to={{
                pathname: routes.SETTINGS,
                state: { activeRoute: routes.SETTINGS }
              }}
            >
              Cấu hình
            </NavLink>
          </li>
        </ul>

        <div className="app-content-container">
          <Switch>
            <Route exact path="/" render={props => <MangaPage {...props} />} />
            <Route path="/queue" render={props => <QueuePage {...props} />} />
            <Route
              path="/settings"
              render={props => <SettingsPage {...props} />}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
