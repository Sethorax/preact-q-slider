"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * Define all store actions
 */
exports.default = function (store) {
    return {
        setSlides: function setSlides(state, slides) {
            return { slides: slides };
        },
        setGrabbingState: function setGrabbingState(state, isGrabbing) {
            return { isGrabbing: isGrabbing };
        },
        setGrabbedTrackOffset: function setGrabbedTrackOffset(state, grabbedTrackOffset) {
            return { grabbedTrackOffset: grabbedTrackOffset };
        },
        setFadingState: function setFadingState(state, isFading) {
            return { isFading: isFading };
        },
        setCurrentSlide: function setCurrentSlide(state, currentSlide) {
            return { lastSlide: state.currentSlide, currentSlide: currentSlide };
        }
    };
};