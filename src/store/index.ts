import createStore, { Store } from "unistore";
import { VNode } from "preact"

export interface StoreState {
    slides: VNode[],
    currentSlideIndex: number,
    lastSlide :number,
    isGrabbing: boolean,
    isFading: boolean,
    grabbedTrackOffset: number,
}

export const initialState: StoreState = {
    slides: new Array<VNode>(),
    currentSlideIndex: 0,
    lastSlide: 0,
    isGrabbing: false,
    isFading: false,
    grabbedTrackOffset: 0
};

export const getStore = () => createStore(initialState);