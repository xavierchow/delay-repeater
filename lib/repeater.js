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
      var ret = void 0;
      try {
        ret = fn.apply(null);
      } catch (e) {
        e.remaining = times + 1;
        return onComplete.call(null, e);
      }
      if (ret && ret.then) {
        ret.then(function (r) {
          setTimeout(execute, interval);
        }, function (e) {
          e.remaining = times + 1;
          return onComplete.call(null, e);
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