import { ComponentConstructor } from "preact";
import { SliderPaginationConfigProps } from "./slider-pagination";
import { SliderNavigationConfigProps } from "./slider-navigation";
import { SlideTrackConfigProps } from "./slide-track";
declare type ChildConfigProps = SliderPaginationConfigProps & SliderNavigationConfigProps & SlideTrackConfigProps;
export interface SliderConfigProps extends ChildConfigProps {
    slidesToShow?: number;
    slidesToScroll?: number;
    slidesHTML?: string;
    vertical?: boolean;
    fade?: boolean;
    fadeDuration?: number;
    autoplay?: boolean;
    autoplaySpeed?: number;
    rewindOnEnd?: boolean;
    showArrows?: boolean;
    showPagination?: boolean;
    canMove?: () => boolean;
    beforeChange?: (currentSlideIndex: number, nextSlideIndex: number) => Promise<void> | void;
    afterChange?: (currentSlideIndex: number, previousSlideIndex: number) => Promise<void> | void;
    onNextClick?: (willChange: boolean, currentSlideIndex: number, nextSlideIndex: number) => Promise<void> | void;
    onPrevClick?: (willChange: boolean, currentSlideIndex: number, nextSlideIndex: number) => Promise<void> | void;
    onFirstSlideRender?: () => void;
}
export interface SliderProps extends SliderConfigProps {
}
interface SliderState {
    renderChildren: boolean;
}
export declare const Slider: ComponentConstructor<SliderProps, SliderState>;
export {};
