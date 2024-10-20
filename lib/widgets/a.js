import DOMPurify from 'dompurify';

export default class WidgetA {
    async init(target) {
        target.classList.add('initialized-a');
        const content = '<p>Widget A initialized</p>';
        target.innerHTML = DOMPurify.sanitize(content);
    }

    // Ensure this method accepts the target argument when called
    destroy(target) { 
        if (!target) return;  // Early return if target is undefined
        target.classList.remove('initialized-a');
        target.innerHTML = DOMPurify.sanitize('');
    }
}