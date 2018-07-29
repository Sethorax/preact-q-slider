"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var preact_1 = require("preact");
var SliderNavigation = /** @class */ (function (_super) {
    __extends(SliderNavigation, _super);
    function SliderNavigation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SliderNavigation.prototype.render = function () {
        var nextArrow = this.props.nextArrow ? preact_1.cloneElement(this.props.nextArrow, { onClick: this.props.onNextArrowClick }) : preact_1.h("div", { className: "q-slider__arrow q-slider__arrow_next", onClick: this.props.onNextArrowClick });
        var prevArrow = this.props.prevArrow ? preact_1.cloneElement(this.props.prevArrow, { onClick: this.props.onPrevArrowClick }) : preact_1.h("div", { className: "q-slider__arrow q-slider__arrow_prev", onClick: this.props.onPrevArrowClick });
        return (preact_1.h("div", { className: "q-slider__navigation" },
            prevArrow,
            nextArrow));
    };
    SliderNavigation.defaultProps = {
        onNextArrowClick: function () { },
        onPrevArrowClick: function () { }
    };
    return SliderNavigation;
}(preact_1.Component));
exports.SliderNavigation = SliderNavigation;
