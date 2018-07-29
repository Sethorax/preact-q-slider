import { h } from "preact";
import { RenderContext } from "preact-render-spy";
import { renderComponent } from "../utils/index";
import { QSlider } from "../../src/preact-q-slider";

let component = renderComponent();;
component.registerComponent(props => <QSlider {...props} />);

export const createQSlider = async (props = {}) => {
    const ctx = await component.render(props);
    return ctx as RenderContext<{}, {}>;
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