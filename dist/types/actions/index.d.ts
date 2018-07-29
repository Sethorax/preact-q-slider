import { VNode } from "preact";
import { StoreState } from "../store";
export declare const setSlides: (state: StoreState, slides: VNode<any>[]) => {
    slides: VNode<any>[];
};
export declare const setGrabbingState: (state: StoreState, isGrabbing: boolean) => {
    isGrabbing: boolean;
};
export declare const setGrabbedTrackOffset: (state: StoreState, grabbedTrackOffset: number) => {
    grabbedTrackOffset: number;
};
export declare const setFadingState: (state: StoreState, isFading: boolean) => {
    isFading: boolean;
};
export declare const setCurrentSlideIndex: (state: StoreState, index: number) => {
    lastSlide: number;
    currentSlideIndex: number;
};
