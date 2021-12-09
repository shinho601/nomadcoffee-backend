"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _client = _interopRequireDefault(require("../../client"));

var seeCoffeeShop = function seeCoffeeShop(_, _ref) {
  var id = _ref.id;
  return _client["default"].coffeeShop.findUnique({
    where: {
      id: id
    }
  });
};

var resolvers = {
  Query: {
    seeCoffeeShop: seeCoffeeShop
  }
};
var _default = resolvers;
exports["default"] = _default;