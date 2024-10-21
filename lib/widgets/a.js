import BaseWidget from '../BaseWidget.js'
import DOMPurify from 'dompurify';

export default class WidgetA extends BaseWidget {
    constructor() {
        super()
    }

    async init(target) {
        target.classList.add('initialized-a');
        const content = '<p>Widget A initialized</p>';
        target.innerHTML = DOMPurify.sanitize(content);
    }

    destroy(target) { 
        if (!target) return;
        target.classList.remove('initialized-a');
        target.innerHTML = DOMPurify.sanitize('');
    }
}
