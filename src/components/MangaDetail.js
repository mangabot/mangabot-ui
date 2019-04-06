import React, { Component } from 'react';
import styles from './MangaDetail.module.css';

export default class MangaDetail extends Component {
  render() {
    const { site, manga } = this.props;

    return (
      <div className="">
        <div
          className={
            styles.mbMangaName +
            ' uk-flex uk-flex-middle uk-margin-left uk-margin-right'
          }
        >
          <div className="uk-flex uk-flex-middle">
            <img src={manga.thumbnail} width="48px" height="48px" alt="" />
            <span className="uk-margin-left">{manga.name}</span>
          </div>
          <ul className="uk-flex-right uk-flex-auto uk-iconnav">
            <li>
              <a href="" uk-icon="icon: plus" />
            </li>
            <li>
              <a href="" uk-icon="icon: download" />
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
              <tr>
                <td>01</td>
                <td>Tập 1 - xxxx</td>
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
              <tr>
                <td>02</td>
                <td>Tập 2 - xxxx</td>
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
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
