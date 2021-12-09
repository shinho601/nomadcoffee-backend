"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _client = _interopRequireDefault(require("../../client"));

var seeUser = function seeUser(_, _ref) {
  var username = _ref.username;
  return _client["default"].user.findUnique({
    where: {
      username: username
    }
  });
};

var resolvers = {
  Query: {
    seeUser: seeUser
  }
};
var _default = resolvers;
exports["default"] = _default;