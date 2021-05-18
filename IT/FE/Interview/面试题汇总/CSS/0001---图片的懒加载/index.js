console.log('hello world')

const imgs = document.querySelectorAll('img')

window.onload = window.onscroll = function () {
  // check()         // 方案一
  // imgLazyLoad()   // 方案二
}

// offsetTop: 返回当前元素相对于其 offsetParent 元素的顶部内边距的距离
// offsetParent: 返回一个指向最近的（指包含层级上的最近）包含该元素的定位元素或者最近的 table、 td、 th、 body元素。
//               当元素的style.display设置为 none ，offsetParent 返回的是 null,
function getTop(el) {
  let offsetHeight = el.offsetTop;
  while(el = el.offsetParent) {
    offsetHeight += el.offsetTop
  }
  return offsetHeight;
}

function imgLazyLoad() {
  let clientHeight = document.documentElement.clientHeight;
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  for (let i = 0; i < imgs.length; i++) {
    if(clientHeight + scrollTop > getTop(imgs[i])) {
      imgs[i].src = imgs[i].getAttribute('data-examples')
    }
  }
}

function check() {
  Array.from(imgs).forEach(ele => {
    if(isIn(ele)) {
      onLoadImg(ele)
    }
  })
}

function isIn(el) {
  // Element.getBoundingClientRect(): 返回元素的大小及其相对于视口的位置---bottom,top,left,right,height,width,x,y
  //         x: 原点的X坐标
  //         y: 原点的Y坐标
  //         width:
  //         height:
  //         top:顶坐标值（与 y 具有相同的值，如果 height 为负值，则为 y + height 的值）
  //         right:右坐标值（与 x + width 具有相同的值，如果width 为负值，则为 x 的值）
  //         bottom:底坐标值（与 y + height 具有相同的值，如果 height 为负值，则为 y 的值）
  //         left:左坐标值（与 x 具有相同的值，如果 width 为负值，则为 x + width 的值）
  let bound = el.getBoundingClientRect()
  console.log(bound)
  let clientHeight = window.innerHeight
  return bound.top <= clientHeight
}

function onLoadImg(el) {
  if(!el.src) {
    el.src = el.dataset.src
  }
}

// 方案三
const observer = new IntersectionObserver((changes) => {
  // changes: 目标元素集合
  changes.forEach((change) => {
    // intersectionRatio
    if (change.isIntersecting) {
      const img = change.target
      img.src = img.dataset.src
      observer.unobserve(img)
    }
  })
})

observer.observe(document.querySelector('img'))


