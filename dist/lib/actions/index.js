"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSlides = function (state, slides) { return ({ slides: slides }); };
exports.setGrabbingState = function (state, isGrabbing) { return ({ isGrabbing: isGrabbing }); };
exports.setGrabbedTrackOffset = function (state, grabbedTrackOffset) { return ({ grabbedTrackOffset: grabbedTrackOffset }); };
exports.setFadingState = function (state, isFading) { return ({ isFading: isFading }); };
exports.setCurrentSlideIndex = function (state, index) { return ({ lastSlide: state.currentSlideIndex, currentSlideIndex: index }); };
