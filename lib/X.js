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

        // Stage 1: Widget pre-initialization
        if (widgetInstance.beforeInit) {
          widgetInstance.beforeInit(el); // Allow widget to perform any setup before subtree is rendered
        }

        // Display and animate the widget
        el.__widgetInstance = widgetInstance;
        el.classList.remove('hidden');
        requestAnimationFrame(() => {
          el.classList.add('widget', 'visible', 'bounce-in');
        });

        // Stage 2: Widget subtree initialization and finalization
        await widgetInstance.init(el); // Initialize widget subtree
        if (widgetInstance.afterInit) {
          widgetInstance.afterInit(el); // Notify widget to finalize setup after animation is applied
        }
      }
      
      callback(null); // Initialization successful
    } catch (error) {
      console.error(error);
      callback(error); // Pass errors to the callback
    }
  }

  static destroy(target) {
    const widgets = target.querySelectorAll('[widget]');
    for (const el of widgets) {
      const widgetInstance = el.__widgetInstance;
      if (widgetInstance) {
        // Start the fade-out animation
        el.classList.add('fade-out'); 
        
        // Wait for animation to complete before removing widget
        setTimeout(() => {
          const widgetName = this.extractWidgetName(el);
          el.classList.remove('visible', 'bounce-in', 'fade-out');
          el.classList.remove(`initialized-${widgetName}`);

          // Clear content and set hidden class
          el.innerHTML = DOMPurify.sanitize('');
          el.classList.add('hidden');
          
          widgetInstance.destroy(); // Call destroy on widget instance
          delete el.__widgetInstance; // Clean up instance reference
        }, 400);
      }
    }
  }
}

export default X;
