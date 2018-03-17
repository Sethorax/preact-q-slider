'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNewStore = undefined;

var _unistore = require('unistore');

var _unistore2 = _interopRequireDefault(_unistore);

var _devtools = require('unistore/devtools');

var _devtools2 = _interopRequireDefault(_devtools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** 
 * Define initial state
 */
var initialState = {
  slides: [],
  isGrabbing: false,
  grabbedTrackOffset: 0,
  lastSlide: 0,
  currentSlide: 0,
  isFading: false
};

/** 
 * Export the store with devtool support if not in production
 */
var createNewStore = exports.createNewStore = function createNewStore() {
  return process.env.NODE_ENV === 'production' ? (0, _unistore2.default)(initialState) : (0, _devtools2.default)((0, _unistore2.default)(initialState));
};