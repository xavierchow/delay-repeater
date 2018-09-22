'use strict';

function repeat(fn, times, interval, onComplete) {
  if (typeof interval === 'function') {
    onComplete = interval;
    interval = 1000;
  }
  onComplete = onComplete || function() {};
  (function execute() {
    if (times > 0) {
      times--;
      let ret;
      try {
        ret = fn.apply(null);
      } catch (e) {
        e.remaining = times + 1;
        return onComplete.call(null, e);
      }
      if (ret && ret.then) {
        ret.then(r => {
          setTimeout(execute, interval);
        }, e => {
          e.remaining = times + 1;
          return onComplete.call(null, e);
        })
      } else {
        setTimeout(execute, interval);
      }
      return;
    }
    onComplete.apply(null);
  }());
}

export { repeat as default }
