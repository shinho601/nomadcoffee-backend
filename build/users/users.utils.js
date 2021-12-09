"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = void 0;
exports.protectedResolver = protectedResolver;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _client = _interopRequireDefault(require("../client"));

var getUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(token) {
    var _yield$jwt$verify, id, user;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (token) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", null);

          case 3:
            _context.next = 5;
            return _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY);

          case 5:
            _yield$jwt$verify = _context.sent;
            id = _yield$jwt$verify.id;
            _context.next = 9;
            return _client["default"].user.findUnique({
              where: {
                id: id
              }
            });

          case 9:
            user = _context.sent;

            if (!user) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", user);

          case 14:
            return _context.abrupt("return", null);

          case 15:
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", null);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 17]]);
  }));

  return function getUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUser = getUser;

function protectedResolver(ourResolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      var query = info.operation.operation === "query";

      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "Please log in to perform this action."
        };
      }
    }

    return ourResolver(root, args, context, info);
  };
}