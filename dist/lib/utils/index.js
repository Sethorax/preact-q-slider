"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientPosFromTouchOrMouseEvent = function (event, getY) {
    if (getY === void 0) { getY = false; }
    if (event instanceof TouchEvent) {
        return getY ? event.touches[0].clientY : event.touches[0].clientX;
    }
    else {
        return getY ? event.clientY : event.clientX;
    }
};
exports.getNumericKeys = function (source) {
    var validKeys = [];
    Object.keys(source).forEach(function (key) {
        var numericKey = Number(key);
        if (Number(key)) {
            validKeys.push(numericKey);
        }
    });
    return validKeys;
};
