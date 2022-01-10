export function debounce(fn, delay) {
  let timer = null;

  function _debounce() {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn();
      timer = null;
    }, delay);
  }
  return _debounce;
}
