import Preact, { h } from 'preact';
import { renderComponent } from '../utils';
import { createNewStore } from '../../src/store';
import { Provider } from 'unistore/preact';
import Slider from '../../src/components/slider';

let component = renderComponent();
component.registerComponent(props => (
    <Provider store={createNewStore()}>
        <Slider {...props} />
    </Provider>
));

export const createSlider = async (newProps = {}) => {
    return await component.render(newProps);
};

export const resetSlider = (props = {}) => {
    component.reset({
        slidesToShow: undefined,
        slidesToScroll: undefined,
        slidesHTML: undefined,
        rewindOnEnd: undefined,
        fade: undefined,
        fadeDuration: undefined,
        showArrows: undefined,
        nextArrow: undefined,
        prevArrow: undefined,
        showPagination: undefined,
        paginationItem: undefined,
        onSlideClick: undefined,
        autoplay: undefined,
        autoplaySpeed: undefined
    }, props);
};

export const setSliderProps = async (newProps) => {
    return await component.setProps(newProps);
};