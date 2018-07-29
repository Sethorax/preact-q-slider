"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var preact_1 = require("preact");
var preact_2 = require("unistore/preact");
exports.connectClass = function (mapStateToProps, actions) { return function (component) {
    return preact_2.connect(mapStateToProps, actions)(function (props) { return preact_1.h(component, props); });
}; };
