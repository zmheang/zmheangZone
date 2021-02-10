## EF_interview

[参考文档](https://blog.poetries.top/FE-Interview-Questions/)

[TOC]



### 基础

#### HTML、HTTP、web相关问题

##### 001、前端 需要注意哪些SEO？

- ###### 名词解释：

​		SEO：回头B站找个视频了解一下吧

- 暂无

##### 002、`img`标签的`title`和 `alt`有什么区别？

- `title`	是HTML标签的全局属性，规定了关于元素的额外属性，这些信息通常会在鼠标移到元素上显示一段工具提示文本
- `alt` 是`img`标签必需的属性，规定图像的替代文本，用于图片无法加载时显示、读屏器阅读图片。可提高图片的可访问性，除了纯装饰图片外都必须设置有意义的值，搜索引擎会重点分析，如果没有`alt`属性，在使用其他UI框架的时候可能会出现莫名其妙的小坑，比如`layui`中如果没有图片就会有一个黑色的小框

##### 003、HTTP的几种请求方式用途

- GET
- POST
- PUT
- HEAD
- DELETE
- OPTIONS
- TRACE
- CONNECT

##### 004、从输入url到显示页面的过程



##### 005、网站性能优化



##### 006、HTTP状态码及其含义

| 状态码 | 英文                            | 中文       | 解释                                                         |
| ------ | ------------------------------- | ---------- | ------------------------------------------------------------ |
| 100    | Continue                        | 继续       | 客户端应继续其请求                                           |
| 101    | Switching/Protocols             | 切换协议   | 服务器根据客户端的请求切换协议                               |
| 200    | OK                              | 请求成功   | 一般用于GET、POST请求                                        |
| 201    | Created                         | 已创建     | 成功请求并创建了新的资源                                     |
| 202    | Accepted                        | 已接受     | 已经接收请求，但未处理完成                                   |
| 203    | Non-Authoritative information   | 非授权信息 | 请求成功，但返回的meta信息不在原始的服务器上，而是一个副本   |
| 204    | No Content                      | 无内容     | 服务器成功处理，但未返回内容                                 |
| 205    | Reset Content                   | 重置内容   | 服务器处理成功，用户终端应重置文档视图                       |
| 206    | Partial Content                 | 部分内容   | 服务器成功处理了部分GET请求                                  |
| 300    | Multiple Choices                |            |                                                              |
| 301    | Moved Permanently               |            |                                                              |
| 302    | Found                           |            |                                                              |
| 303    | See Other                       |            |                                                              |
| 304    | No Modified                     | 未修改     | 所请求的资源未修改，服务器返回此状态码时不会返回任何资源     |
| 305    | Use Proxy                       | 使用代理   | 所请求的资源必须通过代理访问                                 |
| 307    |                                 |            |                                                              |
| 400    | Bad Request                     |            | 客户端请求语法错误，服务器无法理解                           |
| 401    | Unauthorized                    |            | 请求要求用户的身份认证                                       |
| 402    |                                 |            |                                                              |
| 403    | Forbidden                       |            | 服务器理解请求客户端的请求，但是拒绝执行此请求               |
| 404    | Not Found                       |            | 服务器无法根据客户端的请求找到资源                           |
| 405    | Method Not Allowed              |            | 客户端请求中的方法被禁止                                     |
| 406    | Not Acceptable                  |            |                                                              |
| 407    | Proxy Authentication Required   |            |                                                              |
| 408    | Request Time-out                |            |                                                              |
| 409    | Conflict                        |            |                                                              |
| 410    | Gone                            |            |                                                              |
| 411    | Length Required                 |            |                                                              |
| 412    | Precondition Failed             |            |                                                              |
| 413    | Request Entity Too Large        |            |                                                              |
| 414    | Request-URI Too Large           |            |                                                              |
| 415    | Unsupported Media Type          |            | 服务器无法处理请求附带的媒体信息                             |
| 416    | Requested range not satisfiable |            |                                                              |
| 417    | Expectation Failed              |            |                                                              |
| 500    | Internal Server Error           |            | 服务器内部错误，无法完成请求                                 |
| 501    | Not Implemented                 |            | 服务器不支持请求的功能，无法完成请求                         |
| 502    | Bad Gateway                     |            | 作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应 |
| 503    | Service Unavailable             |            | 由于超载或者系统维护，服务器暂时的无法处理客户端的请求，延时的长度可包含再服务器的`Retry-After`头信息中 |
| 504    | Gateway Time-out                |            | 充当网关或代理的服务器未及时从远端服务器获取请求             |
| 505    | HTTP Version not supported      |            | 服务器不支持请求的HTTP协议的版本                             |

##### 007、语义化的理解

- 定义：用合理的、正确的标签来展示内容
- 优点：
  - 易于用户阅读
  - 有利于SEO
  - 方便其他设备解析
  - 有利于开发维护

|      |      |
| ---- | ---- |
|      |      |

##### 008、浏览器的内核



##### 009、H5新特性，移除了哪些元素



##### 010、H5的离线存储



##### 011、Cookie、SessionStorage和LocalStorage

| 名称           | 解释                                     |
| -------------- | ---------------------------------------- |
| Cookie         | 浏览器返回并保存在客户端的一小块数据     |
| SessionStorage | 只存在于客户端，会话级别，会话结束便消失 |
| LocalStorage   | 只存在于客户端，可永久存储               |

[详见](../../high-level/浏览器/index.md)

##### 012、iframe



##### 013、WEB标准、W3C标准



##### 014、XHTML、HTML的区别



##### 015、Doctype

- `<!doctype>`



##### 016、行内元素、块级元素



##### 017、HTML全局属性



##### 018、Canvas、SVG



##### 019、如何在页面中实现一个圆形的可点击区域



##### 020、网页验证码



##### 021、viewport



##### 022、渲染优化



##### 023、div + css 布局和 table 相比



##### 024、src 、 href



##### 025、web开发中会话追踪的方法



##### 026、HTTP request报文结构



##### 027、HTTP response报文结构



#### CSS

##### 001、css sprite是什么

##### 002、link 与 @import 

##### 003、BFC

##### 004、FOUC

##### 005、在网页开发中应该使用奇数还是偶数的fontsize



#### JavaScript

##### 001、闭包

##### 002、作用域链

##### 003、原型、原型链

##### 004、事件代理

##### 005、继承

##### 006、this

##### 007、事件模型

##### 008、new

##### 009、Ajax

##### 010、跨域

##### 011、模块化开发

##### 012、异步加载js

##### 013、内存泄漏

##### 014、XML && JSON

##### 015、AMD && commonjs

##### 016、promise

##### 017、会话追踪

##### 018、null、undefined

##### 019、['1', '2', '3'].map(parseInt)

- ###### Array.map(): 创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值

  - ###### callback(currentValue, index, array): 当前元素， 当前元素的下标， 调用的数组

  - ###### thisArg: 执行callback 函数时该值被用作 this

- ###### parseInt(): 解析一个字符串并返回指定基数的十进制整数， `radix` 是2-36之间的整数，表示被解析字符串的基数

  - ###### string： 要解析的字符串

  - ###### radix: 被解析字符串的基数

```
parseInt(string, radix) -> map(parseInt(value, index))
first iteration (index is 0): parseInt("1", 0); // 1
second iteration (index is 1): parseInt("2", 1); // NaN
third iteration (index is 2): parseInt("3", 2); // NaN

如果radix是 undefined、0、或者未指定，javaScript会假定以下情况：
1. 如果字符串以`0x`或者`0X`开头,那么radix被假定为16
2. 如果字符串以`0`开头，radix被假定为8 或者 10
3. 如果以其他开头，radix假定为10
```

##### 020、箭头函数

##### 021、gulp

##### 022、内置对象

##### 023、generator原理

##### 024、bind、call、apply

##### 025、数组降维

026、类型转换



#### Webpack



#### Vue























