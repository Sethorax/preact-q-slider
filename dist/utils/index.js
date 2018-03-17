"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Utility class
 * 
 * @export
 * @class Utils
 */
var Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
        key: "getClientPosFromTouchOrMouseEvent",

        /**
         * Returns the x or y position of a mouse or touch event.
         * 
         * @static
         * @param {Event} event 
         * @param {boolean} [getY=false] 
         * @returns Int
         * @memberof Utils
         */
        value: function getClientPosFromTouchOrMouseEvent(event) {
            var getY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (event.touches) {
                return getY ? event.touches[0].clientY : event.touches[0].clientX;
            } else {
                return getY ? event.clientY : event.clientX;
            }
        }
    }]);

    return Utils;
}();

exports.default = Utils;