'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _preact2 = _interopRequireDefault(_preact);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _preact3 = require('unistore/preact');

var _actions = require('../actions');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @todo Move option-type props to the store
 * 
 * @class SlideTrack
 * @extends {Preact.Component}
 */
var SlideTrack = function (_Preact$Component) {
    _inherits(SlideTrack, _Preact$Component);

    function SlideTrack() {
        _classCallCheck(this, SlideTrack);

        var _this = _possibleConstructorReturn(this, (SlideTrack.__proto__ || Object.getPrototypeOf(SlideTrack)).call(this));

        _this.state = {
            currentSlideIndex: 0,
            currentSlide: null,
            nextSlide: null,
            nextSlideIndex: -1
        };
        return _this;
    }

    _createClass(SlideTrack, [{
        key: 'renderSlidingTrack',
        value: function renderSlidingTrack() {
            var _this2 = this;

            var slideWidth = 100 / this.props.slidesToShow;
            var trackOffset = slideWidth * this.props.currentSlide * -1 - this.props.grabbedTrackOffset;

            return (0, _preact.h)(
                'div',
                {
                    className: (0, _classnames2.default)('q-slider__track', { 'q-slider__track_no-transition': this.props.isGrabbing }),
                    style: { transform: this.props.vertical ? 'translate3d(0, ' + trackOffset + '%, 0)' : 'translate3d(' + trackOffset + '%, 0, 0)' }
                },
                this.props.slides.map(function (slide, index) {
                    return (0, _preact.h)(
                        'div',
                        { key: index, className: 'q-slider__slide', style: _this2.props.vertical ? { height: slideWidth + '%' } : { width: slideWidth + '%' } },
                        slide
                    );
                })
            );
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.fadeQueue = null;
            this.activeFadeSlide = 0;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.fade) {
                this.setState({
                    currentSlide: this.props.slides[this.props.currentSlide]
                });
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var _this3 = this;

            if (this.props.fade) {
                if (this.props.currentSlide !== this.state.currentSlideIndex && !this.props.isFading) {
                    var nextSlideIndex = void 0;
                    var goForward = true;

                    if (this.props.currentSlide !== 0 && this.props.lastSlide !== 0 && this.props.currentSlide > this.props.lastSlide) {
                        goForward = true;
                    } else if (this.props.currentSlide !== 0 && this.props.lastSlide !== 0) {
                        goForward = false;
                    } else if (this.props.lastSlide === 0 && this.props.currentSlide === 1) {
                        goForward = true;
                    } else if (this.props.currentSlide === 0 && this.props.lastSlide === 1) {
                        goForward = false;
                    } else if (this.props.currentSlide === 0 && this.props.lastSlide !== 1) {
                        goForward = true;
                    } else if (this.props.lastSlide === 0) {
                        goForward = false;
                    }

                    if (goForward) {
                        nextSlideIndex = this.state.currentSlideIndex < this.props.slides.length - 1 ? this.state.currentSlideIndex + 1 : 0;
                    } else {
                        nextSlideIndex = this.state.currentSlideIndex > 0 ? this.state.currentSlideIndex - 1 : this.props.slides.length - 1;
                    }

                    if (this.state.nextSlideIndex !== nextSlideIndex) {
                        this.setState({
                            nextSlide: this.props.slides[nextSlideIndex],
                            nextSlideIndex: nextSlideIndex
                        });
                    } else {
                        this.props.setFadingState(true);

                        clearTimeout(this.fadeQueue);
                        this.fadeQueue = setTimeout(function () {
                            _this3.activeFadeSlide = _this3.activeFadeSlide === 0 ? 1 : 0;
                            _this3.props.setFadingState(false);
                            _this3.setState({ currentSlideIndex: _this3.props.currentSlide, currentSlide: _this3.props.slides[_this3.props.currentSlide] });
                        }, this.props.fadeDuration);
                    }
                }
            }
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            if (nextProps.isFading === false && this.props.isFading === true) {
                return false;
            }

            return true;
        }
    }, {
        key: 'renderFadingTrack',
        value: function renderFadingTrack() {
            return (0, _preact.h)(
                'div',
                { className: (0, _classnames2.default)('q-slider__track q-slider__track_fading-track', { 'q-slider__track_fading-track_is-fading': this.props.isFading }) },
                (0, _preact.h)(
                    'div',
                    {
                        className: 'q-slider__slide q-slider__slide_is-current',
                        style: {
                            zIndex: this.activeFadeSlide === 0 ? 2 : 1,
                            opacity: this.activeFadeSlide === 0 && this.props.isFading ? 0 : 1,
                            transition: 'opacity ' + this.props.fadeDuration + 'ms ease'
                        } },
                    this.activeFadeSlide === 0 ? this.state.currentSlide : this.state.nextSlide
                ),
                (0, _preact.h)(
                    'div',
                    {
                        className: 'q-slider__slide q-slider__slide_is-next',
                        style: {
                            zIndex: this.activeFadeSlide === 1 ? 2 : 1,
                            opacity: this.activeFadeSlide === 1 && this.props.isFading ? 0 : 1,
                            transition: 'opacity ' + this.props.fadeDuration + 'ms ease'
                        } },
                    this.activeFadeSlide === 1 ? this.state.currentSlide : this.state.nextSlide
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.props.slidesToShow === 1 && this.props.fade) {
                return this.renderFadingTrack();
            } else {
                return this.renderSlidingTrack();
            }
        }
    }]);

    return SlideTrack;
}(_preact2.default.Component);

exports.default = (0, _preact3.connect)(['slides', 'isGrabbing', 'currentSlide', 'lastSlide', 'grabbedTrackOffset', 'isFading'], _actions2.default)(SlideTrack);