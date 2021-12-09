"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _client = _interopRequireDefault(require("../client"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = {
  User: {
    following: function following(_ref, _ref2) {
      var id = _ref.id;
      var lastId = _ref2.lastId;
      return _client["default"].user.findUnique({
        where: {
          id: id
        }
      }).following(_objectSpread({
        take: 5,
        skip: lastId ? 1 : 0
      }, lastId && {
        cursor: {
          id: lastId
        }
      }));
    },
    followers: function followers(_ref3, _ref4) {
      var id = _ref3.id;
      var lastId = _ref4.lastId;
      return _client["default"].user.findUnique({
        where: {
          id: id
        }
      }).followers(_objectSpread({
        take: 5,
        skip: lastId ? 1 : 0
      }, lastId && {
        cursor: {
          id: lastId
        }
      }));
    }
  }
};
exports["default"] = _default;