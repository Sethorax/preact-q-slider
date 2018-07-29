import { ComponentConstructor, VNode } from "preact";
import { MouseTouchEvent } from "../utils/index";
export interface SlideTrackConfigProps {
    onSlideClick?: (event: MouseTouchEvent, index: number) => void;
}
export interface SlideTrackProps extends SlideTrackConfigProps {
    slidesToShow: number;
    fade: boolean;
    fadeDuration: number;
    vertical?: boolean;
}
interface SlideTrackState {
    currentSlide: VNode;
    currentSlideIndex: number;
    nextSlide: VNode;
    nextSlideIndex: number;
}
export declare const SlideTrack: ComponentConstructor<SlideTrackProps, SlideTrackState>;
export {};
