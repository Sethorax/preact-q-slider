import { Store } from "unistore";
import { VNode } from "preact";
export interface StoreState {
    slides: VNode[];
    currentSlideIndex: number;
    lastSlide: number;
    isGrabbing: boolean;
    isFading: boolean;
    grabbedTrackOffset: number;
}
export declare const initialState: StoreState;
export declare const getStore: () => Store<StoreState>;
