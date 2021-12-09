"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _users = require("../users.utils");

var _client = _interopRequireDefault(require("../../client"));

var _fs = require("fs");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var editProfile = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
    var username, newPassword, email, name, location, githubUsername, avatar, loggedInUser, avatarURL, _yield$avatar, _yield$avatar$file, filename, createReadStream, newFilename, readStream, writeStream, uglyPassword, updatedUser;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            username = _ref.username, newPassword = _ref.password, email = _ref.email, name = _ref.name, location = _ref.location, githubUsername = _ref.githubUsername, avatar = _ref.avatar;
            loggedInUser = _ref2.loggedInUser;
            avatarURL = null;

            if (!avatar) {
              _context.next = 15;
              break;
            }

            _context.next = 6;
            return avatar;

          case 6:
            _yield$avatar = _context.sent;
            _yield$avatar$file = _yield$avatar.file;
            filename = _yield$avatar$file.filename;
            createReadStream = _yield$avatar$file.createReadStream;
            newFilename = "".concat(loggedInUser.id, "-").concat(Date.now(), "-").concat(filename);
            readStream = createReadStream();
            writeStream = (0, _fs.createWriteStream)(process.cwd() + '/uploads/' + newFilename);
            readStream.pipe(writeStream);
            avatarURL = "http://localhost:4000/static/".concat(newFilename);

          case 15:
            uglyPassword = null;

            if (!newPassword) {
              _context.next = 20;
              break;
            }

            _context.next = 19;
            return _bcrypt["default"].hash(newPassword, 10);

          case 19:
            uglyPassword = _context.sent;

          case 20:
            _context.next = 22;
            return _client["default"].user.update({
              where: {
                id: loggedInUser.id
              },
              data: _objectSpread(_objectSpread({
                username: username,
                email: email,
                name: name,
                location: location
              }, avatarURL && {
                avatarURL: avatarURL
              }), {}, {
                githubUsername: githubUsername
              }, uglyPassword && {
                password: uglyPassword
              })
            });

          case 22:
            updatedUser = _context.sent;

            if (!updatedUser.id) {
              _context.next = 27;
              break;
            }

            return _context.abrupt("return", {
              ok: true
            });

          case 27:
            return _context.abrupt("return", {
              ok: false,
              error: 'Could not update profile.'
            });

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function editProfile(_x, _x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

var resolvers = {
  Mutation: {
    editProfile: (0, _users.protectedResolver)(editProfile)
  }
};
var _default = resolvers;
exports["default"] = _default;