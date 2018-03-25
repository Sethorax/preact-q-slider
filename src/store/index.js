import createStore from 'unistore';

/** 
 * Define initial state
 */
const initialState = {
    slides: [],
    isGrabbing: false,
    grabbedTrackOffset: 0,
    lastSlide: 0,
    currentSlide: 0,
    isFading: false
};

/** 
 * Export the store with devtool support if not in production
 */
export const createNewStore = () => createStore(initialState);