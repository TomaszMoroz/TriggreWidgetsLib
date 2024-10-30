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
    const resolver = customResolver || this.resolver;
    const widgets = target.querySelectorAll('[widget]');
    const errors = []; // To collect errors

    for (const el of widgets) {
        const widgetPath = this.extractWidgetName(el);

        // Reset state for re-initialization
        el.__isInitializing = true; // Reset to allow initialization
        el.__widgetInstance = null; // Clear existing instance

        try {
            const Widget = await resolver(widgetPath);
            const widgetInstance = new Widget.default();

            // Execute pre-initialization
            widgetInstance.beforeInit && widgetInstance.beforeInit(el, { someOption: true });

            await widgetInstance.init(el); // Main init logic

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

        } catch (error) {
            // Log the error and continue with the next widget
            console.error(`Error initializing widget "${widgetPath}":`, error);
            errors.push({ widget: widgetPath, error: error.message });
            console.log(el)
            el.__isInitializing = false; // Ensure state is reset for this widget
        }
    }

    // Call the callback with errors if any, or null if successful
    callback(errors.length > 0 ? errors : null);
}

  static destroy(target) {
    const widgets = target.querySelectorAll('[widget]');
    for (const el of widgets) {
        const widgetInstance = el.__widgetInstance;
        if (widgetInstance) {
            console.log(`Destroying widget: ${this.extractWidgetName(el)}`);
            
            el.__isInitializing = false; // Interrupt ongoing initialization

            el.classList.add('fade-out');

            setTimeout(() => {
                console.log(`Cleaning up widget: ${this.extractWidgetName(el)}`);
                
                el.classList.remove('visible', 'bounce-in', 'fade-out');
                el.classList.remove(`initialized-${this.extractWidgetName(el)}`);
                el.classList.add('hidden');

                try {
                    widgetInstance.destroy(el); // Call the widget's destroy method
                } catch (err) {
                    console.error(`Error during widget destroy: ${err.message}`);
                }
                
                delete el.__widgetInstance; // Cleanup
            }, 400);
        }
    }
}
}

export default X;
