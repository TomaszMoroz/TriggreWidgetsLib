import BaseWidget from '../BaseWidget.js'
import DOMPurify from 'dompurify';

export default class WidgetC extends BaseWidget {
    constructor() {
        super()
    }

    beforeInit(target, options) {
        // Pre-initialization logic, e.g., setting temporary placeholder content or styles
        console.log(`Preparing Widget C before initialization with options: ${options}`);
    }

    async init(target) {
        target.classList.add('initialized-c');
        const content = '<p class="contentA">Widget C initialized</p>';
        const sanitizedContent = DOMPurify.sanitize(content);
        target.innerHTML = sanitizedContent;
    }

    afterInit(target) {
        // Post-initialization logic, e.g., adding animations, event listeners, or other final touches
        console.log("Finalizing Widget C setup after initialization.");
    }

    destroy(target) { 
        if (!target) return;
        target.classList.remove('initialized-c');
        const contentToRemove = document.querySelectorAll('.contentC')
        contentToRemove.forEach(el => el.remove());
    }
}
