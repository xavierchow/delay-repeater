# Run your code repeatly with a delay

# Install
```
npm install delay-repeater
```

# Usage
```js
const fn = () => {
  console.log('ipsum');
}
const times = 3;
const interval = 3000; // 3 seconds
repeat(fn, times, interval);

//or
const done = () => {
  console.log('3 times execution finished');
}
repeat(fn, times, interval, done);
```

**Note** If the `fn` returns a Promise, the delay will be after the Promise resolved, this is easy to run some asynchrous codes(e.g. http request or IO) repeatly.

# License
MIT
