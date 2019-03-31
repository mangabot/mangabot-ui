import React, { Component } from 'react';

export default class MangaDetail extends Component {
  render() {
    const { site, manga } = this.props;

    return (
      <div className="">
        <div className="uk-panel">
          <h4 className="uk-heading-divider">
            <img src={manga.thumbnail} width="48px" height="48px" alt="" />
            <span className="uk-margin-left">{manga.name}</span>
          </h4>
        </div>

        <table className="uk-table uk-table-justify">
          <thead>
            <tr>
              <th>TT</th>
              <th>Tập</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01</td>
              <td>Tập 1 - xxxx</td>
              <td className="uk-text-center">
                <span data-uk-icon="icon: check" className="uk-text-success" />
              </td>
              <td className="uk-text-center">
                <a href="#" className="uk-icon-link" data-uk-icon="download" />
              </td>
            </tr>
            <tr>
              <td>02</td>
              <td>Tập 2 - xxxx</td>
              <td className="uk-text-center">
                <span data-uk-icon="icon: check" className="uk-text-success" />
              </td>
              <td className="uk-text-center">
                <a href="#" className="uk-icon-link" data-uk-icon="download" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
