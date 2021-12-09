"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerCore = require("apollo-server-core");

var _templateObject;

var _default = (0, _apolloServerCore.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  type User {\n    id: Int!\n    username: String!\n    email: String!\n    name: String!\n    location: String\n    avatarURL: String\n    githubUsername: String\n    following(lastId: Int): [User]\n    followers(lastId: Int): [User]\n    createdAt: String!\n    updatedAt: String!\n  }\n"])));

exports["default"] = _default;