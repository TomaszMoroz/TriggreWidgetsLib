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
        target.innerHTML = '<div widget="widgets/a" class="hidden"></div>';
    });

    it('should initialize widgets correctly', async () => {
        const callback = jest.fn();

        await X.init(target, callback);

        expect(callback).toHaveBeenCalledWith(null);
        expect(target.querySelector('[widget]').classList.contains('initialized-a')).toBe(true);
    });

    it('should handle errors during widget initialization', async () => {
        const callback = jest.fn();
    
        const mockResolver = jest.fn().mockImplementation(() => {
            return Promise.reject(new Error('Error loading widget'));
        });
    
        await X.init(target, callback, mockResolver);
    
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({
                error: expect.any(String),
                widget: expect.any(String)
            })
        ]));
        
        const errorArgument = callback.mock.calls[0][0];
        expect(errorArgument[0].error).toBe('Error loading widget');
        expect(errorArgument[0].widget).toBe('a');
    });

    it('should destroy widgets correctly', async () => {
        await X.init(target, jest.fn());

        X.destroy(target);

         // Use a delay to wait for the fade-out animation to complete
        await new Promise((resolve) => setTimeout(resolve, 500));

        expect(target.querySelector('[widget]').classList.contains('initialized-a')).toBe(false);
    });

});
