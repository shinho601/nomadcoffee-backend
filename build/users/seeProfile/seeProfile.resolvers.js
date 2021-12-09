"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _client = _interopRequireDefault(require("../../client"));

var seeProfile = function seeProfile(_, _ref) {
  var username = _ref.username;
  return _client["default"].user.findUnique({
    where: {
      username: username
    },
    include: {
      following: true,
      followers: true
    }
  });
};

var resolvers = {
  Query: {
    seeProfile: seeProfile
  }
};
var _default = resolvers;
exports["default"] = _default;