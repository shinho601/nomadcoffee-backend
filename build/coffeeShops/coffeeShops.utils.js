"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseCategory = void 0;

var parseCategory = function parseCategory(category) {
  var categoryObj = [];

  if (category) {
    var categories = category.match(/#[\w]+/g);
    categoryObj = categories.map(function (element) {
      return {
        where: {
          name: element
        },
        create: {
          name: element,
          slug: element
        }
      };
    });
  }

  return categoryObj;
};

exports.parseCategory = parseCategory;