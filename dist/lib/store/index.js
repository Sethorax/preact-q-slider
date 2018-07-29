"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var unistore_1 = require("unistore");
exports.initialState = {
    slides: new Array(),
    currentSlideIndex: 0,
    lastSlide: 0,
    isGrabbing: false,
    isFading: false,
    grabbedTrackOffset: 0
};
exports.getStore = function () { return unistore_1.default(exports.initialState); };
