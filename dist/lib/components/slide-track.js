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
var classnames_1 = require("classnames");
var actions_1 = require("../actions");
var preact_utils_1 = require("../utils/preact-utils");
var index_1 = require("../utils/index");
var SlideTrackComponent = /** @class */ (function (_super) {
    __extends(SlideTrackComponent, _super);
    function SlideTrackComponent() {
        var _this = _super.call(this) || this;
        _this.state = {
            currentSlideIndex: 0,
            currentSlide: null,
            nextSlide: null,
            nextSlideIndex: -1
        };
        _this.onClickStartX = 0;
        _this.onClickStartY = 0;
        _this.fadeTimeout = null;
        _this.activeFadeSlide = 0;
        _this.handleSlideClick = _this.handleSlideClick.bind(_this);
        _this.handleSlideMouseTouchDown = _this.handleSlideMouseTouchDown.bind(_this);
        return _this;
    }
    SlideTrackComponent.prototype.componentDidMount = function () {
        if (this.props.fade) {
            this.setState({
                currentSlide: this.props.slides[this.props.currentSlideIndex]
            });
        }
    };
    SlideTrackComponent.prototype.componentDidUpdate = function () {
        var _this = this;
        if (this.props.fade) {
            if (!this.props.isFading && this.props.currentSlideIndex !== this.state.currentSlideIndex) {
                if (this.state.nextSlideIndex === this.props.currentSlideIndex) {
                    this.props.setFadingState(true);
                    clearTimeout(this.fadeTimeout);
                    this.fadeTimeout = setTimeout(function () {
                        _this.activeFadeSlide = (_this.activeFadeSlide === 0) ? 1 : 0;
                        _this.props.setFadingState(false);
                        _this.setState({
                            currentSlide: _this.state.nextSlide,
                            currentSlideIndex: _this.state.nextSlideIndex
                        });
                    }, this.props.fadeDuration);
                }
                else {
                    this.setState({
                        nextSlide: this.props.slides[this.props.currentSlideIndex],
                        nextSlideIndex: this.props.currentSlideIndex
                    });
                }
            }
        }
    };
    SlideTrackComponent.prototype.shouldComponentUpdate = function (nextProps) {
        if (nextProps.isFading === false && this.props.isFading === true) {
            return false;
        }
        return true;
    };
    SlideTrackComponent.prototype.handleSlideMouseTouchDown = function (event) {
        this.onClickStartX = index_1.getClientPosFromTouchOrMouseEvent(event);
        this.onClickStartY = index_1.getClientPosFromTouchOrMouseEvent(event, true);
    };
    SlideTrackComponent.prototype.handleSlideClick = function (event, index) {
        if (this.onClickStartX !== index_1.getClientPosFromTouchOrMouseEvent(event) || this.onClickStartY !== index_1.getClientPosFromTouchOrMouseEvent(event, true))
            return;
        this.props.onSlideClick(event, index);
    };
    SlideTrackComponent.prototype.renderSlidingTrack = function () {
        var _this = this;
        var slideWidth = 100 / this.props.slidesToShow;
        var trackOffset = (slideWidth * this.props.currentSlideIndex * -1) - this.props.grabbedTrackOffset;
        return (preact_1.h("div", { className: classnames_1.default("q-slider__track", { "q-slider__track_no-transition": this.props.isGrabbing }), style: { transform: this.props.vertical ? "translate3d(0, " + trackOffset + "%, 0)" : "translate3d(" + trackOffset + "%, 0, 0)" } }, this.props.slides.map(function (slide, index) { return (preact_1.h("div", { key: index, onMouseDown: _this.handleSlideMouseTouchDown, onTouchStart: _this.handleSlideMouseTouchDown, onClick: function (event) { return _this.handleSlideClick(event, index); }, className: "q-slider__slide", "data-slide-index": index, style: _this.props.vertical ? { height: slideWidth + "%" } : { width: slideWidth + "%" } }, slide)); })));
    };
    SlideTrackComponent.prototype.renderFadingTrack = function () {
        return (preact_1.h("div", { className: classnames_1.default("q-slider__track q-slider__track_fading-track", { "q-slider__track_fading-track_is-fading": this.props.isFading }) },
            preact_1.h("div", { className: classnames_1.default("q-slider__slide q-slider__slide_is-current", { "q-slider__slide_is-active": this.activeFadeSlide === 0 }), style: {
                    zIndex: this.activeFadeSlide === 0 ? 2 : 1,
                    opacity: this.activeFadeSlide === 0 && this.props.isFading ? 0 : 1,
                    transition: "opacity " + this.props.fadeDuration + "ms ease"
                } }, this.activeFadeSlide === 0 ? this.state.currentSlide : this.state.nextSlide),
            preact_1.h("div", { className: classnames_1.default("q-slider__slide q-slider__slide_is-next", { "q-slider__slide_is-active": this.activeFadeSlide === 1 }), style: {
                    zIndex: this.activeFadeSlide === 1 ? 2 : 1,
                    opacity: this.activeFadeSlide === 1 && this.props.isFading ? 0 : 1,
                    transition: "opacity " + this.props.fadeDuration + "ms ease"
                } }, this.activeFadeSlide === 1 ? this.state.currentSlide : this.state.nextSlide)));
    };
    SlideTrackComponent.prototype.render = function () {
        if (this.props.slidesToShow === 1 && this.props.fade) {
            return this.renderFadingTrack();
        }
        else {
            return this.renderSlidingTrack();
        }
    };
    SlideTrackComponent.defaultProps = {
        vertical: false,
        onSlideClick: function () { }
    };
    return SlideTrackComponent;
}(preact_1.Component));
var mapStateToProps = function (state) { return ({
    slides: state.slides,
    currentSlideIndex: state.currentSlideIndex,
    grabbedTrackOffset: state.grabbedTrackOffset,
    isGrabbing: state.isGrabbing,
    isFading: state.isFading
}); };
var mapActionsToProps = function (store) { return ({
    setFadingState: actions_1.setFadingState
}); };
exports.SlideTrack = preact_utils_1.connectClass(mapStateToProps, mapActionsToProps)(SlideTrackComponent);
