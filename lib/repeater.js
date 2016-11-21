'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function repeat(fn, times, interval, onComplete) {
  if (typeof interval === 'function') {
    onComplete = interval;
    interval = 1000;
  }
  onComplete = onComplete || function () {};
  (function execute() {
    if (times > 0) {
      times--;
      var ret = fn.apply(null);
      if (ret && ret.then) {
        ret.then(function (r) {
          setTimeout(execute, interval);
        });
      } else {
        setTimeout(execute, interval);
      }
      return;
    }
    onComplete.apply(null);
  })();
}

exports.default = repeat;