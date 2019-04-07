
import { Observable } from 'rxjs';
import HttpCall from './http-call.service';

export default class PageSourceService {
  private httpCall: HttpCall;

  constructor() {
    this.httpCall = new HttpCall();
  }

  getPageSource(url: string): Observable<string> {
    return this.httpCall.getText(url);
  }

}