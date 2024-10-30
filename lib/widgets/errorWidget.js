import BaseWidget from '../BaseWidget.js'

class MockErrorWidget extends BaseWidget {
  async init(el) {
    throw new Error("Simulated initialization error");
  }

  beforeInit(el, options) {
  }

  afterInit(el) {
  }

  destroy(el) {
  }
}

export default MockErrorWidget;
