'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _preact2 = _interopRequireDefault(_preact);

var _preact3 = require('unistore/preact');

var _actions = require('../actions');

var _actions2 = _interopRequireDefault(_actions);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @todo Move option-type props to the store
 * 
 * @class DraggableTrack
 * @extends {Preact.Component}
 */
var DraggableTrack = function (_Preact$Component) {
    _inherits(DraggableTrack, _Preact$Component);

    function DraggableTrack() {
        _classCallCheck(this, DraggableTrack);

        return _possibleConstructorReturn(this, (DraggableTrack.__proto__ || Object.getPrototypeOf(DraggableTrack)).apply(this, arguments));
    }

    _createClass(DraggableTrack, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.grabbedStartingX = 0;
        }
    }, {
        key: 'handleMouseTouchDown',
        value: function handleMouseTouchDown(event) {
            var clientX = _utils2.default.getClientPosFromTouchOrMouseEvent(event, this.props.vertical);

            this.grabbedStartingX = clientX;
            this.props.setGrabbingState(true);
        }
    }, {
        key: 'handleMouseTouchMove',
        value: function handleMouseTouchMove(event) {
            if (!this.props.isGrabbing) return;

            var clientX = _utils2.default.getClientPosFromTouchOrMouseEvent(event, this.props.vertical);
            var distance = (this.grabbedStartingX - clientX) * 100 / this.props.getSliderWidth();
            this.props.setGrabbedTrackOffset(distance);
        }
    }, {
        key: 'handleMouseTouchUp',
        value: function handleMouseTouchUp() {
            this.grabbedStartingX = 0;

            var draggedSlides = parseFloat(this.props.grabbedTrackOffset) / (100 / parseInt(this.props.slidesToShow));
            draggedSlides = draggedSlides > 0 ? Math.ceil(draggedSlides) : Math.floor(draggedSlides);

            if (draggedSlides !== 0) {
                this.props.gotoSlide(this.props.currentSlide + draggedSlides);
            }
            this.props.setGrabbedTrackOffset(0);
            this.props.setGrabbingState(false);
        }
    }, {
        key: 'render',
        value: function render() {
            return (0, _preact.h)(
                'div',
                {
                    className: 'q-slider__draggable-track',
                    onMouseDown: this.handleMouseTouchDown.bind(this),
                    onTouchStart: this.handleMouseTouchDown.bind(this),
                    onMouseMove: this.handleMouseTouchMove.bind(this),
                    onTouchMove: this.handleMouseTouchMove.bind(this),
                    onMouseUp: this.handleMouseTouchUp.bind(this),
                    onMouseOut: this.handleMouseTouchUp.bind(this),
                    onTouchEnd: this.handleMouseTouchUp.bind(this)
                },
                this.props.children
            );
        }
    }]);

    return DraggableTrack;
}(_preact2.default.Component);

exports.default = (0, _preact3.connect)(['isGrabbing', 'grabbedTrackOffset', 'currentSlide'], _actions2.default)(DraggableTrack);