"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _client = _interopRequireDefault(require("../../client"));

var createAccount = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
    var username, email, name, location, avatarURL, githubUsername, password, existingUser, uglyPassword, newUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            username = _ref.username, email = _ref.email, name = _ref.name, location = _ref.location, avatarURL = _ref.avatarURL, githubUsername = _ref.githubUsername, password = _ref.password;
            _context.next = 3;
            return _client["default"].user.findFirst({
              where: {
                OR: [{
                  username: username
                }, {
                  email: email
                }]
              }
            });

          case 3:
            existingUser = _context.sent;

            if (!existingUser) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", {
              ok: false,
              error: 'This username/password is already taken.'
            });

          case 6:
            _context.next = 8;
            return _bcrypt["default"].hash(password, 10);

          case 8:
            uglyPassword = _context.sent;
            _context.next = 11;
            return _client["default"].user.create({
              data: {
                username: username,
                email: email,
                name: name,
                location: location,
                avatarURL: avatarURL,
                githubUsername: githubUsername,
                password: uglyPassword
              }
            });

          case 11:
            newUser = _context.sent;

            if (newUser) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", {
              ok: false,
              error: 'User creation failed.'
            });

          case 14:
            return _context.abrupt("return", {
              ok: true
            });

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createAccount(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var resolvers = {
  Mutation: {
    createAccount: createAccount
  }
};
var _default = resolvers;
exports["default"] = _default;