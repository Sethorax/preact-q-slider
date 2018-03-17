'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseSlider = function (_React$Component) {
    _inherits(BaseSlider, _React$Component);

    function BaseSlider() {
        _classCallCheck(this, BaseSlider);

        var _this = _possibleConstructorReturn(this, (BaseSlider.__proto__ || Object.getPrototypeOf(BaseSlider)).call(this));

        _this.state = {
            slides: [],
            isGrabbing: false,
            grabbedTrackOffset: 0,
            currentSlide: 0,
            renderChildren: false
        };

        _this.handleNextButtonClick = _this.handleNextButtonClick.bind(_this);
        _this.handlePrevButtonClick = _this.handlePrevButtonClick.bind(_this);
        _this.gotoNext = _this.gotoNext.bind(_this);
        _this.gotoPrev = _this.gotoPrev.bind(_this);
        _this.gotoSlide = _this.gotoSlide.bind(_this);
        return _this;
    }

    _createClass(BaseSlider, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.slider = null;

            this.setMaxSlideOffset();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.setMaxSlideOffset();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.children) {
                this.setState({
                    slides: this.props.children,
                    renderChildren: true
                });
            }
        }
    }, {
        key: 'setMaxSlideOffset',
        value: function setMaxSlideOffset() {
            this.maxSlideOffset = this.state.slides.length - this.props.slidesToShow;
        }
    }, {
        key: 'setStateRemotely',
        value: function setStateRemotely(state) {
            this.setState(_extends({}, state));
        }
    }, {
        key: 'canGoPrev',
        value: function canGoPrev() {
            return this.state.currentSlide > 0;
        }
    }, {
        key: 'canGoNext',
        value: function canGoNext() {
            return this.state.currentSlide < this.maxSlideOffset;
        }
    }, {
        key: 'gotoNext',
        value: function gotoNext() {
            var slidesToAdvance = void 0;

            if (this.state.currentSlide + this.props.slidesToScroll <= this.maxSlideOffset) {
                slidesToAdvance = this.props.slidesToScroll;
            } else if (this.props.rewindOnEnd && this.state.currentSlide === this.maxSlideOffset) {
                slidesToAdvance = this.state.currentSlide * -1;
            } else {
                slidesToAdvance = this.maxSlideOffset - this.state.currentSlide;
            }

            this.setState({ currentSlide: this.state.currentSlide + slidesToAdvance });
        }
    }, {
        key: 'gotoPrev',
        value: function gotoPrev() {
            var slidesToGoBack = void 0;

            if (this.state.currentSlide - this.props.slidesToScroll >= 0) {
                slidesToGoBack = this.props.slidesToScroll;
            } else if (this.props.rewindOnEnd && this.state.currentSlide === 0) {
                slidesToGoBack = this.maxSlideOffset * -1;
            } else {
                slidesToGoBack = this.state.currentSlide;
            }

            this.setState({ currentSlide: this.state.currentSlide - slidesToGoBack });
        }
    }, {
        key: 'gotoSlide',
        value: function gotoSlide(slideIndex) {
            var returnIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var nextSlide = void 0;

            if (slideIndex <= 0) {
                nextSlide = 0;
            } else if (slideIndex >= this.maxSlideOffset) {
                nextSlide = this.maxSlideOffset;
            } else {
                nextSlide = slideIndex;
            }

            if (returnIndex) {
                return nextSlide;
            } else {
                this.setState({ currentSlide: nextSlide });
            }
        }
    }, {
        key: 'handlePrevButtonClick',
        value: function handlePrevButtonClick() {
            if (this.props.rewindOnEnd || this.canGoPrev()) this.gotoPrev();
        }
    }, {
        key: 'handleNextButtonClick',
        value: function handleNextButtonClick() {
            if (this.props.rewindOnEnd || this.canGoNext()) this.gotoNext();
        }
    }]);

    return BaseSlider;
}(_react2.default.Component);

exports.default = BaseSlider;