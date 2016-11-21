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
      const ret = fn.apply(null);
      if (ret && ret.then) {
        ret.then(r => {
          setTimeout(execute, interval);
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
