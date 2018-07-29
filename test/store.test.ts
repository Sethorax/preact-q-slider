import { mockStore } from './mocks/store-mock';
const getStoreMock = mockStore();

import { createQSlider, resetQSlider } from './components/qslider';
import { getStore } from '../src/store/index';

describe('Store', async () => {
    beforeEach(() => {
        resetQSlider();
    });

    it('should create mock', () => {
        expect(jest.isMockFunction(getStore)).toBeTruthy();
    });

    it('should always create one store', async () => {
        await createQSlider();

        expect(getStoreMock.mock.calls.length).toBe(1);
    });

    it('should correctly set the initial state', async () => {
        await createQSlider();
        expect(getStoreMock().getState()).toEqual({
            slides: [],
            grabbedTrackOffset: 0,
            isGrabbing: false,
            lastSlide: 0,
            currentSlideIndex: 0,
            isFading: false
        });
    });
});