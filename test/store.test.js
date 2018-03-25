import { createQSlider, resetQSlider, setQSliderProps } from './components/qslider';
import { store, resetStore, mockedStoreDependency } from './mocks/store-mock';

describe('Store', async () => {
    beforeEach(() => {
        resetQSlider();
        resetStore();
    });

    it('should always create one store', async () => {
        await createQSlider();
        expect(mockedStoreDependency.createNewStore.mock.calls.length).toBe(1);
    });

    it('should correctly set the initial state', async () => {
        await createQSlider();
        expect(store().getState()).toEqual({
            slides: [],
            grabbedTrackOffset: 0,
            isGrabbing: false,
            lastSlide: 0,
            currentSlide: 0,
            isFading: false
        });
    });
});