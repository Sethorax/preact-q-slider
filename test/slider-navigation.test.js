import Preact, { h } from 'preact';
import { createSliderNavigation, resetSliderNavigation, setSliderNavigationProps } from './components/slider-navigation';

describe('Slider Navigation', () => {
    beforeEach(() => {
        resetSliderNavigation();
    });

    it('should render the navigation wrapper', async () => {
        const nav = await createSliderNavigation();

        expect(nav.find('.q-slider__navigation').length).toBe(1);
    });

    it('should render the default arrows', async () => {
        const nav = await createSliderNavigation();

        expect(nav.find('.q-slider__arrow').length).toBe(2);
        expect(nav.find('.q-slider__arrow_next').length).toBe(1);
        expect(nav.find('.q-slider__arrow_prev').length).toBe(1);
    });

    it('should trigger the onNextClick prop if next arrow is clicked', async () => {
        const onNextClickMock = jest.fn();

        const nav = await createSliderNavigation({ onNextClick: onNextClickMock });

        nav.find('.q-slider__arrow_next').simulate('click');
        expect(onNextClickMock.mock.calls.length).toBe(1);
    });

    it('should trigger the onPrevClick prop if next arrow is clicked', async () => {
        const onPrevClickMock = jest.fn();
        const nav = await createSliderNavigation({ onPrevClick: onPrevClickMock });

        nav.find('.q-slider__arrow_prev').simulate('click');
        expect(onPrevClickMock.mock.calls.length).toBe(1);
    });

    it('should render custom next arrow if passed as prop', async () => {
        const nextArrow = h('button');
        const nav = await createSliderNavigation({ nextArrow });

        expect(nav.find('button').length).toBe(1);
        expect(nav.find('.q-slider__arrow_next').length).toBe(0);
    });

    it('should render custom prev arrow if passed as prop', async () => {
        const prevArrow = h('button');
        const nav = await createSliderNavigation({ prevArrow });

        expect(nav.find('button').length).toBe(1);
        expect(nav.find('.q-slider__arrow_prev').length).toBe(0);
    });
});