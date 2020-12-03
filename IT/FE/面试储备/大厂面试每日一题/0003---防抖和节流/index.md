### 防抖与节流

#### 防抖

​	概念：防止抖动，单位时间内时间触发会被重置，避免时间被误伤出发多次。代码重在清零

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

​	概念：控制流量，单位时间内事件只能触发一次，与服务器端的限流(Rate Limit)类似。代码实现重在开锁关索

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

