'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (blobs, node, opts) {
  if (blobs && blobs.length) {
    for (var total = 2; total <= blobs.length; total++) {
      if (blobs[total]) {
        for (var ratio = 1; ratio < blobs[total].length; ratio++) {
          if (blobs[total][ratio]) {
            var blobWidth = _postcss2.default.rule();
            var blobWidthValue = 100 * ratio / total;
            var blobWidthString = blobWidthValue + '% - ' + opts.gutter + 'rem';

            _utils2.default.selectorsAdd(blobWidth, blobs[total][ratio]);

            if (opts.display === 'flex') {
              blobWidth.append({ prop: 'flex', value: '0 1 calc(' + blobWidthString + ')' });
            } else if (opts.display === 'float') {
              blobWidth.append({ prop: 'width', value: 'calc(' + blobWidthString + ')' });
            }

            node.append(blobWidth);
          }
        }
      }
    }
  }
};