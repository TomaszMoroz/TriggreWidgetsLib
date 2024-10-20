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
        expect(target.innerHTML).toBe('<p>Widget A initialized</p>');
    });

    it('should destroy correctly', () => {
        widgetA.destroy(target);
        expect(target.classList.contains('initialized-a')).toBe(false);
        expect(target.innerHTML).toBe('');
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

         // Use a delay to wait for the fade-out animation to complete
        await new Promise((resolve) => setTimeout(resolve, 500));

        expect(target.querySelector('[widget]').classList.contains('initialized-a')).toBe(false);
        expect(target.querySelector('[widget]').innerHTML).toBe('');
    });
});
