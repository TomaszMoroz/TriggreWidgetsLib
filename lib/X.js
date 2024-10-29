import DOMPurify from "dompurify";

class X {
  static extractWidgetName(el) {
    return el.getAttribute('widget').split('/').pop();
  }

  static async resolver(widgetPath) {
    try {
      return import(`./widgets/${widgetPath}.js`);
    } catch (err) {
      console.error(err);
    }
  }

  static async init(target, callback, customResolver) {
    try {
      const resolver = customResolver || this.resolver;
      const widgets = target.querySelectorAll('[widget]');
      for (const el of widgets) {
        const widgetPath = this.extractWidgetName(el);
        const Widget = await resolver(widgetPath);
        const widgetInstance = new Widget.default();

        // Mark as initializing
        el.__isInitializing = true;

        // Execute pre-initialization
        widgetInstance.beforeInit && widgetInstance.beforeInit(el);

        await widgetInstance.init(el); // Main init logic

        // If destroy was called during initialization, throw WidgetDestroyed error
        if (!el.__isInitializing) {
          throw new Error("WidgetDestroyed");
        }

        // Mark initialization complete
        el.__isInitializing = false;

        // Execute post-initialization
        widgetInstance.afterInit && widgetInstance.afterInit(el);

        // Store instance on the element
        el.__widgetInstance = widgetInstance;

        // Show the widget with animation
        el.classList.remove('hidden');
        requestAnimationFrame(() => {
          el.classList.add('widget', 'visible', 'bounce-in');
        });
      }
      callback(null); // No errors, initialization successful
    } catch (error) {
      callback(error); // Pass errors to callback
    }
  }

  static destroy(target) {
    const widgets = target.querySelectorAll('[widget]');
    for (const el of widgets) {
      const widgetInstance = el.__widgetInstance;

      if (widgetInstance) {
        // Interrupt any ongoing initialization
        el.__isInitializing = false;

        // Add the class for fade-out animation
        el.classList.add('fade-out');

        setTimeout(() => {
          const widgetName = this.extractWidgetName(el);

          // Clear all initialization-related classes
          el.classList.remove('visible', 'bounce-in', 'fade-out');
          el.classList.remove(`initialized-${widgetName}`);
          
          // Clear the inner HTML and hide the widget
          el.innerHTML = DOMPurify.sanitize('');
          el.classList.add('hidden');

          // Call the destroy method on the widget instance
          widgetInstance.destroy(el);
          delete el.__widgetInstance; // Cleanup
        }, 400);
      }
    }
  }
}

export default X;
