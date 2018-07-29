import { VNode } from "preact";
import { StoreState } from "../store";

export const setSlides = (state: StoreState, slides: VNode[]) => ({ slides });
export const setGrabbingState = (state: StoreState, isGrabbing: boolean) => ({ isGrabbing });
export const setGrabbedTrackOffset = (state: StoreState, grabbedTrackOffset: number) => ({ grabbedTrackOffset });
export const setFadingState = (state: StoreState, isFading: boolean) => ({ isFading });
export const setCurrentSlideIndex = (state: StoreState, index: number) => ({ lastSlide: state.currentSlideIndex, currentSlideIndex: index })