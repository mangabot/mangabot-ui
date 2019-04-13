export default class LogService {

  static log(message: any) {
    let env = process.env.NODE_ENV;
    if (env === 'development') {
      console.log(message);
    }
  }
}