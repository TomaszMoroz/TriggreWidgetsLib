import DOMPurify from 'dompurify';

export default class WidgetB {
    async init(target) {
        target.classList.add('initialized-b');
        const content = '<p>Widget B initialized</p>';
        const sanitizedContent = DOMPurify.sanitize(content);
        target.innerHTML = sanitizedContent;
    }

    destroy(target) {
        if (!target) return;
        target.classList.remove('initialized-b');
        target.innerHTML = DOMPurify.sanitize('');
    }
}
