import Preact, { h } from 'preact';
import { shallow, render } from 'preact-render-spy';
import { renderComponent } from '../utils';
import QSlider from '../../src/index';

let component = renderComponent();;
component.registerComponent(props => <QSlider {...props} />);

export const createQSlider = async (props = {}) => {
    return await component.render(props);
}

export const resetQSlider = (props = {}) => {
    component.reset({
        breakpoints: undefined,
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

export const setQSliderProps = async (newProps) => {
    return await component.setProps(newProps);
};