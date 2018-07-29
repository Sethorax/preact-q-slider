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
var actions_1 = require("../actions");
var preact_utils_1 = require("../utils/preact-utils");
var index_1 = require("../utils/index");
var DraggableTrackComponent = /** @class */ (function (_super) {
    __extends(DraggableTrackComponent, _super);
    function DraggableTrackComponent() {
        var _this = _super.call(this) || this;
        _this.grabbedStartingX = 0;
        _this.handleMouseTouchDown = _this.handleMouseTouchDown.bind(_this);
        _this.handleMouseTouchMove = _this.handleMouseTouchMove.bind(_this);
        _this.handleMouseTouchUp = _this.handleMouseTouchUp.bind(_this);
        return _this;
    }
    DraggableTrackComponent.prototype.handleMouseTouchDown = function (event) {
        if (this.props.slides.length <= this.props.slidesToShow)
            return;
        var clientX = index_1.getClientPosFromTouchOrMouseEvent(event, this.props.vertical);
        this.grabbedStartingX = clientX;
        this.props.setGrabbingState(true);
    };
    DraggableTrackComponent.prototype.handleMouseTouchMove = function (event) {
        if (!this.props.isGrabbing || this.props.slides.length <= this.props.slidesToShow)
            return;
        var clientX = index_1.getClientPosFromTouchOrMouseEvent(event, this.props.vertical);
        var distance = (this.grabbedStartingX - clientX) * 100 / this.props.getSliderWidth();
        this.props.setGrabbedTrackOffset(distance);
    };
    DraggableTrackComponent.prototype.handleMouseTouchUp = function () {
        if (this.props.slides.length <= this.props.slidesToShow)
            return;
        this.grabbedStartingX = 0;
        var draggedSlides = this.props.grabbedTrackOffset / (100 / this.props.slidesToShow);
        draggedSlides = (draggedSlides > 0) ? Math.ceil(draggedSlides) : Math.floor(draggedSlides);
        if (draggedSlides !== 0) {
            this.props.gotoSlide(this.props.currentSlideIndex + draggedSlides);
        }
        this.props.setGrabbedTrackOffset(0);
        this.props.setGrabbingState(false);
    };
    DraggableTrackComponent.prototype.render = function () {
        return (preact_1.h("div", { className: "q-slider__draggable-track", onMouseDown: this.handleMouseTouchDown, onTouchStart: this.handleMouseTouchDown, onMouseMove: this.handleMouseTouchMove, onTouchMove: this.handleMouseTouchMove, onMouseUp: this.handleMouseTouchUp, onMouseOut: this.handleMouseTouchUp, onTouchEnd: this.handleMouseTouchUp }, this.props.children));
    };
    return DraggableTrackComponent;
}(preact_1.Component));
var mapStateToProps = function (state) { return ({
    slides: state.slides,
    currentSlideIndex: state.currentSlideIndex,
    grabbedTrackOffset: state.grabbedTrackOffset,
    isGrabbing: state.isGrabbing,
}); };
var mapActionsToProps = function (store) { return ({
    setGrabbingState: actions_1.setGrabbingState,
    setGrabbedTrackOffset: actions_1.setGrabbedTrackOffset
}); };
exports.DraggableTrack = preact_utils_1.connectClass(mapStateToProps, mapActionsToProps)(DraggableTrackComponent);
