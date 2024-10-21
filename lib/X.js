import DOMPurify from "dompurify";
class X {
  static extractWidgetName(el) {
    return el.getAttribute('widget').split('/').pop();
  }

  static async init(target, callback) {
    try {
      const widgets = target.querySelectorAll('[widget]');
      for (const el of widgets) {
        const widgetPath = this.extractWidgetName(el);
        const Widget = await import(`./widgets/${widgetPath}.js`);
        const widgetInstance = new Widget.default();
        await widgetInstance.init(el);
        el.__widgetInstance = widgetInstance; // Store instance on element

        // Show the widget with animation
        el.classList.remove('hidden');
        requestAnimationFrame(() => {
          el.classList.add('widget', 'visible', 'bounce-in'); // Add classes for animation
        });
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
        // Add the class for fade-out animation
        el.classList.add('fade-out'); // Start the fade-out animation
  
        // Set a timeout for the slide-out animation duration before removing the widget
        setTimeout(() => {
          const widgetName = this.extractWidgetName(el);
          // Remove all animation and visible-related classes before hiding
          el.classList.remove('visible', 'bounce-in', 'fade-out');
          el.classList.remove(`initialized-${widgetName}`)
          
          // Clear the inner HTML and hide the widget
          el.innerHTML = DOMPurify.sanitize('');
          el.classList.add('hidden'); // Add hidden class after fade-out
          
          // Call the destroy method of the widget instance
          widgetInstance.destroy(); 
          delete el.__widgetInstance; // Clean up instance reference
        }, 400);
      }
    }
  }
  
}

export default X;
