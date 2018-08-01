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
var preact_html_converter_1 = require("preact-html-converter");
var actions_1 = require("../actions");
var preact_utils_1 = require("../utils/preact-utils");
var slider_pagination_1 = require("./slider-pagination");
var slider_navigation_1 = require("./slider-navigation");
var slide_track_1 = require("./slide-track");
var draggable_track_1 = require("./draggable-track");
;
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
            var converter = preact_html_converter_1.PreactHTMLConverter();
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
        return (this.props.slides.length > 0 && (preact_1.h("div", { ref: this.handleSliderRef, className: classnames_1.default('q-slider__slider', { 'q-slider__slider_is-vertical': this.props.vertical, 'q-slider__slider_no-sliding': this.props.slides.length <= this.props.slidesToShow }) },
            preact_1.h(draggable_track_1.DraggableTrack, { slidesToShow: this.props.slidesToShow, vertical: this.props.vertical, gotoSlide: this.gotoSlide, getSliderWidth: this.getSliderWidth },
                preact_1.h(slide_track_1.SlideTrack, { fade: this.props.fade, fadeDuration: this.props.fadeDuration, vertical: this.props.vertical, slidesToShow: this.props.slidesToShow, onSlideClick: this.props.onSlideClick, afterChange: this.props.afterChange })),
            this.props.showArrows && this.props.slides.length > 1 && (preact_1.h(slider_navigation_1.SliderNavigation, { onNextArrowClick: this.handleNextClick, onPrevArrowClick: this.handlePrevClick, nextArrow: this.props.nextArrow, prevArrow: this.props.prevArrow })),
            this.props.showPagination && this.props.slides.length > 1 && (preact_1.h(slider_pagination_1.SliderPagination, { slidesToShow: this.props.slidesToShow, onPaginationItemClick: this.handlePaginationItemClick, onPaginationItemRender: this.props.onPaginationItemRender })))));
    };
    return SliderComponent;
}(preact_1.Component));
var mapStateToProps = function (state) { return ({
    slides: state.slides,
    isFading: state.isFading,
    currentSlideIndex: state.currentSlideIndex
}); };
var mapActionsToProps = function (store) { return ({
    setSlides: actions_1.setSlides,
    setCurrentSlideIndex: actions_1.setCurrentSlideIndex
}); };
exports.Slider = preact_utils_1.connectClass(mapStateToProps, mapActionsToProps)(SliderComponent);
