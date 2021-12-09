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

var user = function user(_ref, _) {
  var id = _ref.id;
  return _client["default"].user.findFirst({
    where: {
      coffeeShop: {
        some: {
          id: id
        }
      }
    }
  });
};

var categories = function categories(_ref2, _ref3) {
  var id = _ref2.id;
  var lastId = _ref3.lastId;
  return _client["default"].coffeeShop.findUnique({
    where: {
      id: id
    }
  }).categories(_objectSpread({
    take: 5,
    skip: lastId ? 1 : 0
  }, lastId && {
    cursor: {
      id: lastId
    }
  }));
};

var photos = function photos(_ref4, _ref5) {
  var id = _ref4.id;
  var lastId = _ref5.lastId;
  return _client["default"].coffeeShop.findUnique({
    where: {
      id: id
    }
  }).photos(_objectSpread({
    take: 5,
    skip: lastId ? 1 : 0
  }, lastId && {
    cursor: {
      id: lastId
    }
  }));
};

var shops = function shops(_ref6, _ref7) {
  var id = _ref6.id;
  var lastId = _ref7.lastId;
  return _client["default"].category.findUnique({
    where: {
      id: id
    }
  }).shops(_objectSpread({
    take: 5,
    skip: lastId ? 1 : 0
  }, lastId && {
    cursor: {
      id: lastId
    }
  }));
};

var totalShops = function totalShops(_ref8, _) {
  var id = _ref8.id;
  return _client["default"].coffeeShop.count({
    where: {
      categories: {
        some: {
          id: id
        }
      }
    }
  });
};

var _default = {
  CoffeeShop: {
    user: user,
    categories: categories,
    photos: photos
  },
  Category: {
    shops: shops,
    totalShops: totalShops
  }
};
exports["default"] = _default;