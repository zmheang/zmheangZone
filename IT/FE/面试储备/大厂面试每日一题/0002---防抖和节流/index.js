console.log('hello world ~')

function clickMe() {
  debounce(function() {console.log('click me')}, 1000)()
}
function throttle (f, wait) {
  let timer
  return (...args) => {
    if (timer) { return }
    timer = setTimeout(() => {
      f(...args)
      timer = null
    }, wait)
  }
}

function debounce(f, wait) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      f(...args)
    }, wait)
  }
}

// window.onresize = debounce(function() {console.log('resize')}, 3000)
