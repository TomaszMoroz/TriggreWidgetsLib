import WidgetA from '../lib/widgets/a';
import X from '../lib/X';

describe('WidgetA Class', () => {
    let target;
    let widgetA;

    beforeEach(() => {
        target = document.createElement('div');
        widgetA = new WidgetA();
    });

    it('should initialize correctly', async () => {
        await widgetA.init(target);
        expect(target.classList.contains('initialized-a')).toBe(true);
        expect(target.innerHTML).toBe('<p class="contentA">Widget A initialized</p>');
    });

    it('should destroy correctly', () => {
        widgetA.destroy(target);
        expect(target.classList.contains('initialized-a')).toBe(false);
        expect(target.innerHTML).toBe('');
    });


    it('should not initialize if target is not provided', async () => {
        await expect(widgetA.init()).rejects.toThrow();
    });

    it('should call destroy with the correct target', () => {
        const targetDestroy = document.createElement('div');
        widgetA.init(targetDestroy);
        widgetA.destroy(targetDestroy);
        expect(targetDestroy.classList.contains('initialized-a')).toBe(false);
    });
});

describe('X Class', () => {
    let target;

    beforeEach(() => {
        target = document.createElement('div');
        target.innerHTML = '<div widget="widgets/a" class="hidden"></div>'; // Simulating a widget
    });

    it('should initialize widgets correctly', async () => {
        const callback = jest.fn(); // Mock callback

        await X.init(target, callback);

        expect(callback).toHaveBeenCalledWith(null); // Ensure no errors occurred
        expect(target.querySelector('[widget]').classList.contains('initialized-a')).toBe(true);
    });

    it('should handle errors during widget initialization', async () => {
        const callback = jest.fn();
    
        // Simulate an error in the resolver
        const mockResolver = jest.fn().mockImplementation(() => {
            return Promise.reject(new Error('Error loading widget')); // Simulate an error
        });
    
        await X.init(target, callback, mockResolver);
    
        // Ensure the callback was called once with an array of errors
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({
                error: expect.any(String), // Check if error field is a string
                widget: expect.any(String)  // Check if widget field is a string
            })
        ]));
        
        // Verify specific error message and widget name
        const errorArgument = callback.mock.calls[0][0]; // Get the error argument
        expect(errorArgument[0].error).toBe('Error loading widget'); // Check the error message
        expect(errorArgument[0].widget).toBe('a'); // Check the widget name
    });

    it('should destroy widgets correctly', async () => {
        await X.init(target, jest.fn()); // Initialize first

        X.destroy(target);

         // Use a delay to wait for the fade-out animation to complete
        await new Promise((resolve) => setTimeout(resolve, 500));

        expect(target.querySelector('[widget]').classList.contains('initialized-a')).toBe(false);
    });

});
