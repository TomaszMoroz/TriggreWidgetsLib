import BaseWidget from '../BaseWidget.js'
import DOMPurify from 'dompurify';

export default class WidgetC extends BaseWidget {
    constructor() {
        super()
    }
    async init(target) {
        target.classList.add('initialized-c');
        const content = '<p>Widget C initialized</p>';
        const sanitizedContent = DOMPurify.sanitize(content);
        target.innerHTML = sanitizedContent;
    }

    destroy(target) {
      if (!target) return; 
        target.classList.remove('initialized-c');
        target.innerHTML = DOMPurify.sanitize('');
    }
}
