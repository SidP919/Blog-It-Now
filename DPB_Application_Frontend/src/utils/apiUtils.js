// execute func only when the debounce is not called again for ${delay} millisecs
export function debounce(func, delay) {
  let timerId; // this variable lives in closure so it will persists during debounce function calls.

  const debounced = function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => func.apply(this, args), delay);
  };

  debounced.cancel = () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  return debounced;
}

// execute func only when it has been ${limit} millisecs since the throttle function was called last time
export function throttle(func, limit) {
  let lastCallTime = 0;
  let timerId = null;
  // above two variable lives in closure so it will persists during throttle function calls.
  const throttled = function (...args) {
    const now = Date.now();
    const remaining = limit - (now - lastCallTime);

    if (remaining <= 0) {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      lastCallTime = now;
      func.apply(this, args);
      return;
    }

    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      lastCallTime = Date.now();
      timerId = null;
      func.apply(this, args);
    }, remaining);
  };

  throttled.cancel = () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  return throttled;
}
