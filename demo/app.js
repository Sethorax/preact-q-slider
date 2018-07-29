var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { h, render } from "preact";
import { QSlider } from "../src/index";
var breakpoints = {
    2: {
        slidesToScroll: 1
    }
};
var props = {
    breakpoints: breakpoints
};
render(h(QSlider, __assign({}, props)), document.getElementById("root"));
