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
var preact_2 = require("unistore/preact");
var slider_1 = require("./slider");
var index_1 = require("../utils/index");
var store_1 = require("../store");
var QSlider = /** @class */ (function (_super) {
    __extends(QSlider, _super);
    function QSlider(props) {
        var _this = _super.call(this, props) || this;
        _this.store = store_1.getStore();
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
                    var newProps = props !== null ? props : _this.state.initialProps;
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
            var breakpoints = index_1.getNumericKeys(this.props.breakpoints).sort(function (a, b) { return a - b; });
            breakpoints.forEach(function (key) {
                registerMediaQuery_1("(min-width: " + (lastBreakpoint_1 + 1) + "px) and (max-width: " + key + "px)", _this.props.breakpoints[key]);
                lastBreakpoint_1 = key;
            });
            registerMediaQuery_1("(min-width: " + (lastBreakpoint_1 + 1) + "px)", null);
        }
        this.setState({ ready: true });
    };
    QSlider.prototype.render = function () {
        return (this.state.ready && (preact_1.h(preact_2.Provider, { store: this.store },
            preact_1.h(slider_1.Slider, __assign({}, this.state.currentProps)))));
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
}(preact_1.Component));
exports.QSlider = QSlider;
