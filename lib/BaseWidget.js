export default class BaseWidget {
  constructor() {
    this.autoBindHandlers();
  }

  autoBindHandlers() {
    Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach((key) => {
      if (key.endsWith('Handler')) {
        this[key] = this[key].bind(this);
      }
    });
  }
}