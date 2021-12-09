"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _http = _interopRequireDefault(require("http"));

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _apolloServerExpress = require("apollo-server-express");

var _schema = require("./schema");

var _users = require("./users/users.utils");

require("dotenv").config();

var PORT = process.env.PORT;
var apollo = new _apolloServerExpress.ApolloServer({
  resolvers: _schema.resolvers,
  typeDefs: _schema.typeDefs,
  context: function () {
    var _context = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx) {
      var _context2;

      return _regenerator["default"].wrap(function _callee$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!ctx.req) {
                _context3.next = 7;
                break;
              }

              _context3.next = 3;
              return (0, _users.getUser)(ctx.req.headers.token);

            case 3:
              _context3.t0 = _context3.sent;
              return _context3.abrupt("return", {
                loggedInUser: _context3.t0
              });

            case 7:
              _context2 = ctx.connection.context;
              return _context3.abrupt("return", {
                loggedInUser: _context2.loggedInUser
              });

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee);
    }));

    function context(_x) {
      return _context.apply(this, arguments);
    }

    return context;
  }(),
  subscriptions: {
    onConnect: function () {
      var _onConnect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref) {
        var token, loggedInUser;
        return _regenerator["default"].wrap(function _callee2$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                token = _ref.token;

                if (token) {
                  _context4.next = 3;
                  break;
                }

                throw new Error("You can't listen.");

              case 3:
                _context4.next = 5;
                return (0, _users.getUser)(token);

              case 5:
                loggedInUser = _context4.sent;
                return _context4.abrupt("return", {
                  loggedInUser: loggedInUser
                });

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee2);
      }));

      function onConnect(_x2) {
        return _onConnect.apply(this, arguments);
      }

      return onConnect;
    }()
  }
});
var app = (0, _express["default"])();
app.use((0, _morgan["default"])("dev"));
apollo.applyMiddleware({
  app: app
});
app.use("/static", _express["default"]["static"]("uploads"));

var httpServer = _http["default"].createServer(app);

apollo.installSubscriptionHandlers(httpServer);
httpServer.listen(PORT, function () {
  console.log("\uD83D\uDE80Server is running on http://localhost:".concat(PORT, " \u2705"));
});