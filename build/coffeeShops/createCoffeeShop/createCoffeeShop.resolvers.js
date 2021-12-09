"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _client = _interopRequireDefault(require("../../client"));

var _users = require("../../users/users.utils");

var _fs = require("fs");

var _coffeeShops = require("../coffeeShops.utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var createCoffeeShop = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_, _ref, _ref2) {
    var name, latitude, longitude, photos, category, loggedInUser, existing, categoryObj, newCoffeeShop;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            name = _ref.name, latitude = _ref.latitude, longitude = _ref.longitude, photos = _ref.photos, category = _ref.category;
            loggedInUser = _ref2.loggedInUser;
            _context2.next = 4;
            return _client["default"].coffeeShop.findFirst({
              where: {
                name: name
              }
            });

          case 4:
            existing = _context2.sent;

            if (!existing) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", {
              ok: false,
              error: 'This name is already taken.'
            });

          case 7:
            categoryObj = (0, _coffeeShops.parseCategory)(category);
            _context2.next = 10;
            return _client["default"].coffeeShop.create({
              data: _objectSpread({
                name: name,
                latitude: latitude,
                longitude: longitude,
                user: {
                  connect: {
                    id: loggedInUser.id
                  }
                }
              }, categoryObj.length > 0 && {
                categories: {
                  connectOrCreate: categoryObj
                }
              })
            });

          case 10:
            newCoffeeShop = _context2.sent;

            if (photos) {
              photos.forEach( /*#__PURE__*/function () {
                var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(photo) {
                  var _yield$photo, _yield$photo$file, filename, createReadStream, newFilename, readStream, writeStream, url;

                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return photo;

                        case 2:
                          _yield$photo = _context.sent;
                          _yield$photo$file = _yield$photo.file;
                          filename = _yield$photo$file.filename;
                          createReadStream = _yield$photo$file.createReadStream;
                          newFilename = "coffeeshop-".concat(loggedInUser.id, "-").concat(Date.now(), "-").concat(filename);
                          readStream = createReadStream();
                          writeStream = (0, _fs.createWriteStream)(process.cwd() + '/uploads/' + newFilename);
                          readStream.pipe(writeStream);
                          url = "http://localhost:4000/static/".concat(newFilename);
                          _context.next = 13;
                          return _client["default"].coffeeShopPhoto.create({
                            data: {
                              url: url,
                              shop: {
                                connect: {
                                  id: newCoffeeShop.id
                                }
                              }
                            }
                          });

                        case 13:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x4) {
                  return _ref4.apply(this, arguments);
                };
              }());
            }

            return _context2.abrupt("return", {
              ok: true
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function createCoffeeShop(_x, _x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

var resolvers = {
  Mutation: {
    createCoffeeShop: (0, _users.protectedResolver)(createCoffeeShop)
  }
};
var _default = resolvers;
exports["default"] = _default;