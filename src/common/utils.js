export function debounce(func, delay) {
  let timer = null;
  return function(...args) { // ...args 可以传多个参数
    if(timer) { // 当下一次请求发出时，此次请求不发出
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}