### 防抖与节流

#### 防抖

​	概念：防止抖动，单位时间内时间触发会被重置，避免时间被误伤出发多次。代码重在清零

​	理解：将不短于等待时间的连续触发事件分组为一个事件，然后可以在开始时执行，也可以在最后一次触发等待时间后执行

###### 使用场景

- 登录，发送短信等按钮避免用户点击太快，以至于发送了多次请求，需要防抖
- 调整浏览器窗口大小时，resize次数过于频繁，造成计算过多
- 文本编辑器是是保存，当无任何操作一秒后进行保存

```javascript
function debounce (f, wait) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      f(...args)
    }, wait)
  }
}
```



#### 节流

​	概念：控制流量，单位时间内事件只能触发一次，与服务器端的限流(Rate Limit)类似。代码实现重在开锁关锁

​	理解：确保每等待时间内可以执行一次

###### 使用场景

- scroll 事件，每隔一秒计算一次位置信息等
- 浏览器播放事件，每隔一秒计算一次进度信息等
- input 搜索框实时搜索并发送请求站视下拉列表，每隔一秒发送一次请求

```javascript
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
```

**requestAnimationFrame**

[以下参考](https://css-tricks.com/debouncing-throttling-explained-examples/)



