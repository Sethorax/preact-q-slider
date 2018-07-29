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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var preact_1 = require("preact");
var preact_utils_1 = require("../utils/preact-utils");
var classnames_1 = require("classnames");
var SliderPaginationComponent = /** @class */ (function (_super) {
    __extends(SliderPaginationComponent, _super);
    function SliderPaginationComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SliderPaginationComponent.prototype.getNavigatableSlides = function () {
        var sliceEnd = this.props.slides.length - this.props.slidesToShow + 1;
        return this.props.slides.slice(0, sliceEnd);
    };
    SliderPaginationComponent.prototype.renderPaginationItem = function (key, isCurrent) {
        var _this = this;
        var props = {
            key: key,
            className: classnames_1.default("q-slider__pagination-item", { "q-slider__pagination-item_is-current": isCurrent }),
            onClick: function (event) { return _this.props.onPaginationItemClick(event, key); },
        };
        var modifiedProps = this.props.onPaginationItemRender(props, key, this.props.currentSlideIndex);
        if (typeof modifiedProps === "object") {
            props = __assign({}, props, modifiedProps);
        }
        return this.props.paginationItem ? preact_1.cloneElement(this.props.paginationItem, props) : preact_1.h("div", props);
    };
    SliderPaginationComponent.prototype.render = function () {
        var _this = this;
        return (preact_1.h("div", { className: "q-slider__pagination" }, this.getNavigatableSlides().map(function (_, index) { return _this.renderPaginationItem(index, index === _this.props.currentSlideIndex); })));
    };
    return SliderPaginationComponent;
}(preact_1.Component));
var mapStateToProps = function (state) { return ({
    slides: state.slides,
    currentSlideIndex: state.currentSlideIndex
}); };
exports.SliderPagination = preact_utils_1.connectClass(mapStateToProps, null)(SliderPaginationComponent);
