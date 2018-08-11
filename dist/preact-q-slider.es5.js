import preact, { h, Component, cloneElement } from 'preact';
import classNames from 'classnames';
import { PreactHTMLConverter } from 'preact-html-converter';
import createStore from 'unistore';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var preact$1 = createCommonjsModule(function (module, exports) {
var t=preact;function n(t,n){for(var r in n)t[r]=n[r];return t}function r(t){this.getChildContext=function(){return {store:t.store}};}r.prototype.render=function(t){return t.children[0]},exports.connect=function(r,e){var o;return "function"!=typeof r&&("string"==typeof(o=r||[])&&(o=o.split(/\s*,\s*/)),r=function(t){for(var n={},r=0;r<o.length;r++)n[o[r]]=t[o[r]];return n}),function(o){function i(i,u){var c=this,f=u.store,s=r(f?f.getState():{},i),a=e?function(t,n){"function"==typeof t&&(t=t(n));var r={};for(var e in t)r[e]=n.action(t[e]);return r}(e,f):{store:f},p=function(){var t=r(f?f.getState():{},c.props);for(var n in t)if(t[n]!==s[n])return s=t,c.setState(null);for(var e in s)if(!(e in t))return s=t,c.setState(null)};this.componentDidMount=function(){p(),f.subscribe(p);},this.componentWillUnmount=function(){f.unsubscribe(p);},this.render=function(r){return t.h(o,n(n(n({},a),r),s))};}return (i.prototype=new t.Component).constructor=i}},exports.Provider=r;

});
var preact_1 = preact$1.connect;
var preact_2 = preact$1.Provider;

var setSlides = function (state, slides) { return ({ slides: slides }); };
var setGrabbingState = function (state, isGrabbing) { return ({ isGrabbing: isGrabbing }); };
var setGrabbedTrackOffset = function (state, grabbedTrackOffset) { return ({ grabbedTrackOffset: grabbedTrackOffset }); };
var setFadingState = function (state, isFading) { return ({ isFading: isFading }); };
var setCurrentSlideIndex = function (state, index) { return ({ lastSlide: state.currentSlideIndex, currentSlideIndex: index }); };

var connectClass = function (mapStateToProps, actions) { return function (component) {
    return preact_1(mapStateToProps, actions)(function (props) { return h(component, props); });
}; };

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
            className: classNames("q-slider__pagination-item", { "q-slider__pagination-item_is-current": isCurrent }),
            onClick: function (event) { return _this.props.onPaginationItemClick(event, key); },
        };
        var modifiedProps = this.props.onPaginationItemRender(props, key, this.props.currentSlideIndex);
        if (typeof modifiedProps === "object") {
            props = __assign({}, props, modifiedProps);
        }
        return this.props.paginationItem ? cloneElement(this.props.paginationItem, props) : h("div", props);
    };
    SliderPaginationComponent.prototype.render = function () {
        var _this = this;
        return (h("div", { className: "q-slider__pagination" }, this.getNavigatableSlides().map(function (_, index) { return _this.renderPaginationItem(index, index === _this.props.currentSlideIndex); })));
    };
    return SliderPaginationComponent;
}(Component));
var mapStateToProps = function (state) { return ({
    slides: state.slides,
    currentSlideIndex: state.currentSlideIndex
}); };
var SliderPagination = connectClass(mapStateToProps, null)(SliderPaginationComponent);

var SliderNavigation = /** @class */ (function (_super) {
    __extends(SliderNavigation, _super);
    function SliderNavigation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SliderNavigation.prototype.render = function () {
        var nextArrow = this.props.nextArrow ? cloneElement(this.props.nextArrow, { onClick: this.props.onNextArrowClick }) : h("div", { className: "q-slider__arrow q-slider__arrow_next", onClick: this.props.onNextArrowClick });
        var prevArrow = this.props.prevArrow ? cloneElement(this.props.prevArrow, { onClick: this.props.onPrevArrowClick }) : h("div", { className: "q-slider__arrow q-slider__arrow_prev", onClick: this.props.onPrevArrowClick });
        return (h("div", { className: "q-slider__navigation" },
            prevArrow,
            nextArrow));
    };
    SliderNavigation.defaultProps = {
        onNextArrowClick: function () { },
        onPrevArrowClick: function () { }
    };
    return SliderNavigation;
}(Component));

var getClientPosFromTouchOrMouseEvent = function (event, getY) {
    if (getY === void 0) { getY = false; }
    if (isTouchEvent(event)) {
        return getY ? event.touches[0].clientY : event.touches[0].clientX;
    }
    else {
        return getY ? event.clientY : event.clientX;
    }
};
var getNumericKeys = function (source) {
    var validKeys = [];
    Object.keys(source).forEach(function (key) {
        var numericKey = Number(key);
        if (Number(key)) {
            validKeys.push(numericKey);
        }
    });
    return validKeys;
};
var isTouchEvent = function (event) {
    return event.touches !== undefined && event.touches.length > 0;
};

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
    SlideTrackComponent.prototype.componentDidUpdate = function (prevProps) {
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
        if (this.props.currentSlideIndex !== prevProps.currentSlideIndex) {
            setTimeout(function () {
                _this.props.afterChange(_this.props.currentSlideIndex, prevProps.currentSlideIndex);
            }, this.props.fade ? this.props.fadeDuration : 300);
        }
    };
    SlideTrackComponent.prototype.shouldComponentUpdate = function (nextProps) {
        if (nextProps.isFading === false && this.props.isFading === true) {
            return false;
        }
        return true;
    };
    SlideTrackComponent.prototype.handleSlideMouseTouchDown = function (event) {
        this.onClickStartX = getClientPosFromTouchOrMouseEvent(event);
        this.onClickStartY = getClientPosFromTouchOrMouseEvent(event, true);
    };
    SlideTrackComponent.prototype.handleSlideClick = function (event, index) {
        if (this.onClickStartX !== getClientPosFromTouchOrMouseEvent(event) || this.onClickStartY !== getClientPosFromTouchOrMouseEvent(event, true))
            return;
        this.props.onSlideClick(event, index);
    };
    SlideTrackComponent.prototype.renderSlidingTrack = function () {
        var _this = this;
        var slideWidth = 100 / this.props.slidesToShow;
        var trackOffset = (slideWidth * this.props.currentSlideIndex * -1) - this.props.grabbedTrackOffset;
        return (h("div", { className: classNames("q-slider__track", { "q-slider__track_no-transition": this.props.isGrabbing }), style: { transform: this.props.vertical ? "translate3d(0, " + trackOffset + "%, 0)" : "translate3d(" + trackOffset + "%, 0, 0)" } }, this.props.slides.map(function (slide, index) { return (h("div", { key: index, onMouseDown: _this.handleSlideMouseTouchDown, onTouchStart: _this.handleSlideMouseTouchDown, onClick: function (event) { return _this.handleSlideClick(event, index); }, className: "q-slider__slide", "data-slide-index": index, style: _this.props.vertical ? { height: slideWidth + "%" } : { width: slideWidth + "%" } }, slide)); })));
    };
    SlideTrackComponent.prototype.renderFadingTrack = function () {
        return (h("div", { className: classNames("q-slider__track q-slider__track_fading-track", { "q-slider__track_fading-track_is-fading": this.props.isFading }) },
            h("div", { className: classNames("q-slider__slide q-slider__slide_is-current", { "q-slider__slide_is-active": this.activeFadeSlide === 0 }), style: {
                    zIndex: this.activeFadeSlide === 0 ? 2 : 1,
                    opacity: this.activeFadeSlide === 0 && this.props.isFading ? 0 : 1,
                    transition: "opacity " + this.props.fadeDuration + "ms ease"
                } }, this.activeFadeSlide === 0 ? this.state.currentSlide : this.state.nextSlide),
            h("div", { className: classNames("q-slider__slide q-slider__slide_is-next", { "q-slider__slide_is-active": this.activeFadeSlide === 1 }), style: {
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
}(Component));
var mapStateToProps$1 = function (state) { return ({
    slides: state.slides,
    currentSlideIndex: state.currentSlideIndex,
    grabbedTrackOffset: state.grabbedTrackOffset,
    isGrabbing: state.isGrabbing,
    isFading: state.isFading
}); };
var mapActionsToProps = function (store) { return ({
    setFadingState: setFadingState
}); };
var SlideTrack = connectClass(mapStateToProps$1, mapActionsToProps)(SlideTrackComponent);

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
        var clientX = getClientPosFromTouchOrMouseEvent(event, this.props.vertical);
        this.grabbedStartingX = clientX;
        this.props.setGrabbingState(true);
    };
    DraggableTrackComponent.prototype.handleMouseTouchMove = function (event) {
        if (!this.props.isGrabbing || this.props.slides.length <= this.props.slidesToShow)
            return;
        var clientX = getClientPosFromTouchOrMouseEvent(event, this.props.vertical);
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
        return (h("div", { className: "q-slider__draggable-track", onMouseDown: this.handleMouseTouchDown, onTouchStart: this.handleMouseTouchDown, onMouseMove: this.handleMouseTouchMove, onTouchMove: this.handleMouseTouchMove, onMouseUp: this.handleMouseTouchUp, onMouseOut: this.handleMouseTouchUp, onTouchEnd: this.handleMouseTouchUp }, this.props.children));
    };
    return DraggableTrackComponent;
}(Component));
var mapStateToProps$2 = function (state) { return ({
    slides: state.slides,
    currentSlideIndex: state.currentSlideIndex,
    grabbedTrackOffset: state.grabbedTrackOffset,
    isGrabbing: state.isGrabbing,
}); };
var mapActionsToProps$1 = function (store) { return ({
    setGrabbingState: setGrabbingState,
    setGrabbedTrackOffset: setGrabbedTrackOffset
}); };
var DraggableTrack = connectClass(mapStateToProps$2, mapActionsToProps$1)(DraggableTrackComponent);

var SliderComponent = /** @class */ (function (_super) {
    __extends(SliderComponent, _super);
    function SliderComponent() {
        var _this = _super.call(this) || this;
        _this.slider = null;
        _this.maxSlideOffset = null;
        _this.autoplayPaused = false;
        _this.autoplayCycle = null;
        _this.lastAutoplayCycleStart = 0;
        _this.remainingAutoplayCycleDuration = 0;
        _this.isWaitingForCallback = true;
        _this.canMove = _this.canMove.bind(_this);
        _this.gotoNext = _this.gotoNext.bind(_this);
        _this.gotoPrev = _this.gotoPrev.bind(_this);
        _this.gotoSlide = _this.gotoSlide.bind(_this);
        _this.getSliderWidth = _this.getSliderWidth.bind(_this);
        _this.handleNextClick = _this.handleNextClick.bind(_this);
        _this.handlePrevClick = _this.handlePrevClick.bind(_this);
        _this.handleSliderRef = _this.handleSliderRef.bind(_this);
        _this.handlePaginationItemClick = _this.handlePaginationItemClick.bind(_this);
        return _this;
    }
    SliderComponent.prototype.componentWillMount = function () {
        this.setMaxSlideOffset();
    };
    SliderComponent.prototype.componentWillUnmount = function () {
        this.stopAutoplay();
    };
    SliderComponent.prototype.componentDidMount = function () {
        if (this.props.children.length > 0) {
            this.setState({ renderChildren: true });
            this.props.setSlides(this.props.children);
        }
        else if (this.props.slidesHTML) {
            var converter = PreactHTMLConverter();
            var slides = converter.convert(this.props.slidesHTML.trim());
            this.props.setSlides(slides);
        }
        if (this.props.autoplay) {
            this.startAutoplay();
        }
    };
    SliderComponent.prototype.componentDidUpdate = function (prevProps) {
        if (!prevProps.autoplay && this.props.autoplay) {
            this.startAutoplay();
        }
        else if (prevProps.autoplay && !this.props.autoplay) {
            this.stopAutoplay();
        }
        this.setMaxSlideOffset();
    };
    SliderComponent.prototype.startAutoplay = function () {
        var cycleDuration = this.remainingAutoplayCycleDuration > 0 && this.remainingAutoplayCycleDuration < this.props.autoplaySpeed ? this.remainingAutoplayCycleDuration : this.props.autoplaySpeed;
        this.runAutoplayCycle(cycleDuration);
    };
    SliderComponent.prototype.stopAutoplay = function () {
        this.remainingAutoplayCycleDuration = (new Date()).getTime() - this.remainingAutoplayCycleDuration;
        clearTimeout(this.autoplayCycle);
    };
    SliderComponent.prototype.runAutoplayCycle = function (cycleDuration) {
        var _this = this;
        this.autoplayCycle = setTimeout(function () {
            _this.lastAutoplayCycleStart = (new Date()).getTime();
            _this.runAutoplayCycle(cycleDuration);
            _this.handleNextClick();
        }, cycleDuration);
    };
    SliderComponent.prototype.setMaxSlideOffset = function () {
        this.maxSlideOffset = this.props.slides.length - this.props.slidesToShow;
    };
    SliderComponent.prototype.canGoPrev = function () {
        return this.props.currentSlideIndex > 0;
    };
    SliderComponent.prototype.canGoNext = function () {
        return this.props.currentSlideIndex < this.maxSlideOffset;
    };
    SliderComponent.prototype.canMove = function () {
        if (this.props.isFading)
            return false;
        if (this.isWaitingForCallback === false)
            return false;
        if (this.props.canMove() === false)
            return false;
        return true;
    };
    SliderComponent.prototype.calculateSlidesToAdvance = function () {
        var slidesToAdvance;
        if (this.props.currentSlideIndex + this.props.slidesToScroll <= this.maxSlideOffset) {
            slidesToAdvance = this.props.slidesToScroll;
        }
        else if (this.props.rewindOnEnd && this.props.currentSlideIndex === this.maxSlideOffset) {
            slidesToAdvance = this.props.currentSlideIndex * -1;
        }
        else {
            slidesToAdvance = this.maxSlideOffset - this.props.currentSlideIndex;
        }
        return slidesToAdvance;
    };
    SliderComponent.prototype.gotoNext = function (slidesToAdvance) {
        var _this = this;
        if (!this.canMove())
            return;
        if (!slidesToAdvance) {
            slidesToAdvance = this.calculateSlidesToAdvance();
        }
        var nextSlideIndex = this.props.currentSlideIndex + slidesToAdvance;
        this.isWaitingForCallback = false;
        Promise.resolve(this.props.beforeChange(this.props.currentSlideIndex, nextSlideIndex)).then(function () {
            _this.props.setCurrentSlideIndex(nextSlideIndex);
            _this.isWaitingForCallback = true;
        });
    };
    SliderComponent.prototype.calculateSlidesToRegress = function () {
        var slidesToRegress;
        if (this.props.currentSlideIndex - this.props.slidesToScroll >= 0) {
            slidesToRegress = this.props.slidesToScroll;
        }
        else if (this.props.rewindOnEnd && this.props.currentSlideIndex === 0) {
            slidesToRegress = this.maxSlideOffset * -1;
        }
        else {
            slidesToRegress = this.props.currentSlideIndex;
        }
        return slidesToRegress;
    };
    SliderComponent.prototype.gotoPrev = function (slidesToRegress) {
        var _this = this;
        if (!this.canMove())
            return;
        if (!slidesToRegress) {
            slidesToRegress = this.calculateSlidesToRegress();
        }
        var nextSlideIndex = this.props.currentSlideIndex - slidesToRegress;
        this.isWaitingForCallback = false;
        Promise.resolve(this.props.beforeChange(this.props.currentSlideIndex, nextSlideIndex)).then(function () {
            _this.props.setCurrentSlideIndex(nextSlideIndex);
            _this.isWaitingForCallback = true;
        });
    };
    SliderComponent.prototype.gotoSlide = function (slideIndex, returnIndex) {
        var _this = this;
        if (returnIndex === void 0) { returnIndex = false; }
        if (!this.canMove())
            return;
        var nextSlideIndex;
        if (slideIndex < 0) {
            nextSlideIndex = this.props.fade ? this.maxSlideOffset : 0;
        }
        else if (slideIndex > this.maxSlideOffset) {
            nextSlideIndex = this.props.fade ? 0 : this.maxSlideOffset;
        }
        else {
            nextSlideIndex = slideIndex;
        }
        if (returnIndex) {
            return nextSlideIndex;
        }
        this.isWaitingForCallback = false;
        Promise.resolve(this.props.beforeChange(this.props.currentSlideIndex, nextSlideIndex)).then(function () {
            _this.props.setCurrentSlideIndex(nextSlideIndex);
            _this.isWaitingForCallback = true;
        });
    };
    SliderComponent.prototype.getSliderWidth = function () {
        return this.slider.getBoundingClientRect().width;
    };
    SliderComponent.prototype.handlePrevClick = function () {
        var _this = this;
        var willChange = (this.props.slides.length >= this.props.slidesToShow && this.props.rewindOnEnd) || this.canGoPrev();
        var slidesToRegress = this.calculateSlidesToRegress();
        Promise.resolve(this.props.onPrevClick(willChange, this.props.currentSlideIndex, this.props.currentSlideIndex - slidesToRegress)).then(function () {
            if (willChange)
                _this.gotoPrev(slidesToRegress);
        });
    };
    SliderComponent.prototype.handleNextClick = function () {
        var _this = this;
        var willChange = (this.props.slides.length >= this.props.slidesToShow && this.props.rewindOnEnd) || this.canGoNext();
        var slidesToAdvance = this.calculateSlidesToAdvance();
        Promise.resolve(this.props.onNextClick(willChange, this.props.currentSlideIndex, this.props.currentSlideIndex + slidesToAdvance)).then(function () {
            if (willChange)
                _this.gotoNext();
        });
    };
    SliderComponent.prototype.handlePaginationItemClick = function (event, key) {
        if (this.props.slides.length < this.props.slidesToShow)
            return;
        this.gotoSlide(key);
    };
    SliderComponent.prototype.handleSliderRef = function (element) {
        this.slider = element;
    };
    SliderComponent.prototype.render = function () {
        return (this.props.slides.length > 0 && (h("div", { ref: this.handleSliderRef, className: classNames('q-slider__slider', { 'q-slider__slider_is-vertical': this.props.vertical, 'q-slider__slider_no-sliding': this.props.slides.length <= this.props.slidesToShow }) },
            h(DraggableTrack, { slidesToShow: this.props.slidesToShow, vertical: this.props.vertical, gotoSlide: this.gotoSlide, getSliderWidth: this.getSliderWidth },
                h(SlideTrack, { fade: this.props.fade, fadeDuration: this.props.fadeDuration, vertical: this.props.vertical, slidesToShow: this.props.slidesToShow, onSlideClick: this.props.onSlideClick, afterChange: this.props.afterChange })),
            this.props.showArrows && this.props.slides.length > 1 && (h(SliderNavigation, { onNextArrowClick: this.handleNextClick, onPrevArrowClick: this.handlePrevClick, nextArrow: this.props.nextArrow, prevArrow: this.props.prevArrow })),
            this.props.showPagination && this.props.slides.length > 1 && (h(SliderPagination, { slidesToShow: this.props.slidesToShow, onPaginationItemClick: this.handlePaginationItemClick, onPaginationItemRender: this.props.onPaginationItemRender })))));
    };
    return SliderComponent;
}(Component));
var mapStateToProps$3 = function (state) { return ({
    slides: state.slides,
    isFading: state.isFading,
    currentSlideIndex: state.currentSlideIndex
}); };
var mapActionsToProps$2 = function (store) { return ({
    setSlides: setSlides,
    setCurrentSlideIndex: setCurrentSlideIndex
}); };
var Slider = connectClass(mapStateToProps$3, mapActionsToProps$2)(SliderComponent);

var initialState = {
    slides: new Array(),
    currentSlideIndex: 0,
    lastSlide: 0,
    isGrabbing: false,
    isFading: false,
    grabbedTrackOffset: 0
};
var getStore = function () { return createStore(initialState); };

var store = getStore();
var QSlider = /** @class */ (function (_super) {
    __extends(QSlider, _super);
    function QSlider(props) {
        var _this = _super.call(this, props) || this;
        var initialProps = __assign({}, props, { slidesToScroll: props.fade ? 1 : props.slidesToScroll, slidesToShow: props.fade ? 1 : props.slidesToShow });
        _this.state = {
            ready: false,
            initialProps: __assign({}, initialProps),
            currentProps: initialProps
        };
        return _this;
    }
    QSlider.prototype.componentDidMount = function () {
        this.watchBreakpoints();
    };
    QSlider.prototype.watchBreakpoints = function () {
        var _this = this;
        if (this.props.breakpoints) {
            var onMediaQueryChange_1 = function (mediaQuery, props) {
                if (mediaQuery.matches) {
                    var newProps = (props !== null) ? props : _this.state.initialProps;
                    _this.setState({
                        currentProps: __assign({}, _this.state.currentProps, newProps)
                    });
                }
            };
            var registerMediaQuery_1 = function (queryString, props) {
                var mediaQuery = window.matchMedia(queryString);
                mediaQuery.addListener(function (mq) { return onMediaQueryChange_1(mq, props); });
                onMediaQueryChange_1(mediaQuery, props);
            };
            var lastBreakpoint_1 = -1;
            var breakpoints = getNumericKeys(this.props.breakpoints).sort(function (a, b) { return a - b; });
            breakpoints.forEach(function (key) {
                registerMediaQuery_1("(min-width: " + (lastBreakpoint_1 + 1) + "px) and (max-width: " + key + "px)", _this.props.breakpoints[key]);
                lastBreakpoint_1 = key;
            });
            registerMediaQuery_1("(min-width: " + (lastBreakpoint_1 + 1) + "px)", null);
        }
        this.setState({ ready: true });
    };
    QSlider.prototype.render = function () {
        return this.state.ready && (h(preact_2, { store: store },
            h(Slider, __assign({}, this.state.currentProps))));
    };
    QSlider.defaultProps = {
        slidesToShow: 3,
        slidesToScroll: 1,
        slidesHTML: null,
        fade: false,
        fadeDuration: 500,
        autoplay: false,
        autoplaySpeed: 6000,
        rewindOnEnd: true,
        showArrows: true,
        showPagination: true,
        onSlideClick: function () { },
        canMove: function () { return true; },
        beforeChange: function () { },
        afterChange: function () { },
        onPaginationItemRender: function (props) { return props; },
        onNextClick: function () { },
        onPrevClick: function () { }
    };
    return QSlider;
}(Component));

export { QSlider };
