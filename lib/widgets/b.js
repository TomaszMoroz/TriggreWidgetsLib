import BaseWidget from '../BaseWidget.js'
import DOMPurify from 'dompurify';

export default class WidgetB extends BaseWidget {
    constructor() {
        super()
    }

    beforeInit(target, options) {
        // Pre-initialization logic, e.g., setting temporary placeholder content or styles
        console.log(`Preparing Widget B before initialization with options: ${options}`);
    }
    
    async init(target) {
        target.classList.add('initialized-b');
        const content = '<p>Widget B initialized</p>';
        const sanitizedContent = DOMPurify.sanitize(content);
        target.innerHTML = sanitizedContent;
    }

    afterInit(target) {
        // Post-initialization logic, e.g., adding animations, event listeners, or other final touches
        console.log("Finalizing Widget B setup after initialization.");
    }

    destroy(target) {
        if (!target) return;
        target.classList.remove('initialized-b');
        target.innerHTML = DOMPurify.sanitize('');
    }
}
