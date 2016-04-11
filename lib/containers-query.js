'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (opts, breakpoint, mediaQuery, containers) {
  if (containers.length) {
    var containerQuery = _postcss2.default.rule();
    containerQuery.selectors = containers;
    var containerWidth = breakpoint * opts.unit - opts.gutter + 2 * opts.padding;
    containerQuery.append({ prop: 'width', value: containerWidth + 'rem' });
    mediaQuery.append(containerQuery);
  }
};