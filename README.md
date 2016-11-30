# Run your code repeatly with a delay

# Install
```
npm install delay-repeater
```

# Usage
```js
//es6 module
import repeat from 'delay-repeater';
//or CommonJS require style
const repeat = require('delay-repeater').default;

const fn = () => {
  console.log('ipsum');
}
const times = 3;
const interval = 3000; // 3 seconds
repeat(fn, times, interval);

//or with a completed callback
const done = () => {
  console.log('3 times execution finished');
}
repeat(fn, times, interval, done);
```

**Note** If the `fn` returns a Promise, the delay will be after the Promise resolved, this is easy to run some asynchrous codes(e.g. http request or IO) repeatly.

# License
MIT
