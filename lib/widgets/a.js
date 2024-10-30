import BaseWidget from '../BaseWidget.js';
import DOMPurify from 'dompurify';

export default class WidgetA extends BaseWidget {
    constructor() {
        super();
    }

    beforeInit(target, options) {
        // Pre-initialization logic, e.g., setting temporary placeholder content or styles
        console.log(`Preparing Widget A before initialization with options: ${options}`);
    }

    async init(target) {
        // Main initialization logic
        target.classList.add('initialized-a');
        const content = '<p>Widget A initialized</p>';
        target.innerHTML = DOMPurify.sanitize(content);
    }

    afterInit(target) {
        // Post-initialization logic, e.g., adding animations, event listeners, or other final touches
        console.log("Finalizing Widget A setup after initialization.");
    }

    destroy(target) { 
        if (!target) return;
        target.classList.remove('initialized-a');
        target.innerHTML = DOMPurify.sanitize('');
    }
}
