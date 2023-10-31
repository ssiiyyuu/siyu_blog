/**
 * 函数防抖
 * 
 * @param {function} func 
 * @param {int} duration 
 * 
 * @return {function}
 */
export function debounce(func, duration) {
  let timeId = null;
  return (...args) => {
    clearTimeout(timeId)
    timeId = setTimeout(() => {
      func.apply(this, args)    
    }, duration);
  }
}
/**
 * 函数节流
 * 
 * @param {function} func 
 * @param {int} duration 
 * 
 * @return {function} 
 */
export function throttle(func, duration) {
  let timestamp = null;
  return (...args) => {
    if(!timestamp || Date.now() - timestamp > duration) {
      func.apply(this, args)
      timestamp = Date.now()
    }
  }
}