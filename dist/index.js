'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _preact2 = _interopRequireDefault(_preact);

var _slider = require('./components/slider.jsx');

var _slider2 = _interopRequireDefault(_slider);

var _preact3 = require('unistore/preact');

var _store = require('./store');

require('./styles.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Export Slider and initialize new store
 * 
 * @export
 * @class QSlider
 * @extends {Preact.Component}
 */
var QSlider = function (_Preact$Component) {
    _inherits(QSlider, _Preact$Component);

    function QSlider() {
        _classCallCheck(this, QSlider);

        return _possibleConstructorReturn(this, (QSlider.__proto__ || Object.getPrototypeOf(QSlider)).apply(this, arguments));
    }

    _createClass(QSlider, [{
        key: 'render',
        value: function render() {
            var props = _extends({}, this.props, {
                slidesToScroll: this.props.fade ? 1 : this.props.slidesToScroll,
                slidesToShow: this.props.fade ? 1 : this.props.slidesToShow
            });

            return (0, _preact.h)(
                _preact3.Provider,
                { store: (0, _store.createNewStore)() },
                (0, _preact.h)(
                    _slider2.default,
                    props,
                    this.props.children
                )
            );
        }
    }]);

    return QSlider;
}(_preact2.default.Component);

exports.default = QSlider;
;