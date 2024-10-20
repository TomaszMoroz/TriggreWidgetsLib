import WidgetA from '../lib/widgets/a'; // Adjust the import based on your structure
import X from '../lib/X'; // Import the main widget manager

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
        expect(target.innerHTML).toBe('<p>Widget A initialized</p>'); // Check sanitized content
    });

    it('should destroy correctly', () => {
        widgetA.destroy(target);
        expect(target.classList.contains('initialized-a')).toBe(false);
        expect(target.innerHTML).toBe(''); // Check that innerHTML is cleared
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


    it('should destroy widgets correctly', async () => {
        await X.init(target, jest.fn()); // Initialize first

        X.destroy(target);

        expect(target.querySelector('[widget]').classList.contains('initialized-a')).toBe(false); // Check if class is removed
        expect(target.querySelector('[widget]').innerHTML).toBe(''); // Check if innerHTML is cleared
    });
});
