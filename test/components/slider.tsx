import { h, Component } from "preact";
import { renderComponent } from "../utils";
import { getStore } from "../../src/store";
import { Provider } from "unistore/preact";
import { Slider } from "../../src/components/slider";
import { QSlider } from "../../src/components/slider-wrapper";
import { RenderContext } from "preact-render-spy";

let component = renderComponent();
component.registerComponent(props => {
    return (
        <Provider store={getStore()}>
            <Slider {...props} />
        </Provider>
    );
});

export const createSlider = async (newProps = {}) => {
    const ctx = await component.render(newProps);
    return ctx as RenderContext<{},{}>;
};

export const resetSlider = (props = {}) => {
    const defaultProps = QSlider.defaultProps;
    const mergedProps = {...defaultProps, ...props};

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
    }, mergedProps);
};

export const setSliderProps = async (newProps) => {
    return await component.setProps(newProps);
};