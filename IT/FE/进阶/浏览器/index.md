# 浏览器
[参考](https://blog.poetries.top/browser-working-principle/)

[TOC]



## 浏览器相关知识

### 一、缓存机制

1. #### 	强缓存

   浏览器直接从本地缓存中获取数据，不与服务器进行交互，它有两种依据：`Expires` 和 `Cache-Control` 可以用来判断是否命中缓存

   1. Expires

      即过期时间，存在于服务器返回的响应头中，即浏览器在这个过期时间之前可以直接冲缓存里面获取数据，无需再次请求

   2. Cache-Control

      在`HTTP1.1`中采用的一个非常关键的字段。我们利用Cache-Control 来控制缓存，一般情况下我们可以设置：

      ```javascript
      Cache-Control:max-age=3600
      ```

      当然还可以配合其他指令一起使用：

      ```
      public： 表示响应可以被客户端和代理服务器缓存；
      private： 表示响应只可以被客户端缓存，而代理服务器不能缓存；
      no-store： 表示不缓存任何响应。
      ```

2. #### 协商缓存

   就是强缓存失效之后，浏览器（携带缓存标识）向服务器发起请求，由服务器（根据缓存标识）决定是否使用本地缓存的过程，主要由两种情况：

   1. `Last-Modified /  If-Modified-Since`

      - 浏览器在第一次访问资源时，服务器返回资源的同时，在响应头中添加了`Last-Modified`，值是这个资源在服务器上的最后修改时间，浏览器接收后就会缓存文件和 header

        ```
        Last-Modified: Fri, 22 Jul 2020 01:47:00 GMT
        ```

      - 当浏览器下一次请求这个资源的时候，浏览器检测到`Last-Modified`这个header， 于是添加`If-Modified-Since`这个header，值就是`Last-Modified`中的值

      - 服务器再次收到这个资源请求，会根据`If-Modified-Since`中的值和服务器中这个资源的最后修改时间进行对比

        如果没有变化，返回304和空的响应体，直接从缓存中度读取资源

        如果`If-Modified-Since` 的时间小于服务器中这个资源的最后修改时间，说明文件有更新，于是返回新的资源文件和200

   2. `Etag / If-None-Match`

      - Etag 是服务器给文件生成的唯一标识，只要里面的内容有改动，这个值就会发生变化，服务器通过响应头把这个值给浏览器
      - 浏览器在下一次向服务器发送请求时，会将上一次返回的Etag值放到请求头中的`If-None-Match`中
      - 服务器只需要比较客户端传来的`If-None-Match`跟自己本地的Etag是否一致即可

3. #### 内核

   每种浏览器都有自己不用的内核，而内核又分为两部分：渲染引擎 和 JS引擎

   - ##### 渲染引擎

     ```
     firefox使用gecko引擎
     
     IE使用Trident引擎，2015年微软推出自己新的浏览器，原名叫斯巴达，后改名edge，使用edge引擎
     
     opera最早使用Presto引擎，后来弃用
     
     chrome\safari\opera使用webkit引擎，13年chrome和opera开始使用Blink引擎
     
     UC使用U3引擎
     
     QQ浏览器和微信内核使用X5引擎，16年开始使用Blink引擎
     ```

   - ##### JS引擎

     ```
     老版本IE使用Jscript引擎，IE9之后使用Chakra引擎，edge浏览器仍然使用Chakra引擎
     
     firefox使用monkey系列引擎
     
     safari使用的SquirrelFish系列引擎
     
     Opera使用Carakan引擎
     
     chrome使用V8引擎。nodeJs其实就是封装了V8引擎
     ```

     ##### 为什么会有这么多的不同？

     HTML，CSS，JS这些只是一种规范，告诉浏览器遇到这种标签怎么渲染，遇到这种样式怎么渲染，遇到这种脚本怎么执行，但是具体怎么执行的时浏览器内部的事情，对于我们程序员来说是不必要知道的，对于为什么有这么多不同种类的浏览器，因为厂家不同啊，你想成立一家浏览器公司，就必须有自己的浏览器，而且还不能使用别家浏览器的代码，只能自己实现，所以实现的方法就各不相同，所以这样也就会有自己侧重点，比如这家渲染快，这家脚本执行优化的更好等等

4. #### chrome架构

   - 进程与线程

   - 单进程浏览器

   - ##### 多进程浏览器

     最新的Chrome浏览器包括：1个浏览器主进程，1个GPU进程，1个网络进程，多个渲染进程和多个插件

     - ###### 浏览器进程

       主要负责界面的显示、用户交互、子进程管理，同时提供存储等功能

     - ###### 渲染进程

       核心任务是将HTML,CSS和JavaScript转换为用户可以与之交互的网页，处于安全考虑，渲染进程都是运行在沙箱模式

       通常情况下打开一个新页面都会使用三度的渲染进程，但是如果从A页面打开B页面，且A和B 都属于同一个站点的话，那么B页面就会复用A页面的渲染进程

     - ###### GPU进程

       负责页面的UI绘制

     - ###### 网络进程

       主要负责网络资源的加载

     - ###### 插件进程

       主要负责插件的运行

   - 面向服务的浏览器

### 二、本地存储

1. #### Cookie

   `HTTP Cookie`是浏览器第一次发请求到服务器时，饭后服务器返回给浏览器并保存在本地的一小块数据，然后在浏览器下次再次向同一域名发请求时都会携带的Cookie。服务器拿到Cookie进行解析，便能获取客户端的状态

   缺点：

   - 容量小：不能超过4kb
   - 安全性低
   - 影响性能：cookie紧跟域名，只要是相同域名下，就会带上Cookie，不管域名下的地址是否需要Cookie信息

2. #### LocalStorage

   - 只存在客户端
   - 容量大：5M
   - 接口封装
   - 影响性能：同Cookie

3. #### sessionStorage

   - 只存在客户端
   - 容量大：5M
   - 接口封装
   - 会话级别

4. #### IndexDB

   浏览器提供的本地数据库



## 从输入URL到页面加载的过程

### 1.在浏览器中输入URL

---接下来还有一步：同一域名下最多只能建立6个TCP连接，剩余的进入排队等待状态

### 2.先检查强缓存，如果命中直接使用，否则进入下一步

### 3.DNS域名解析系统对输入的网址进行解析

#### 		浏览器缓存 -> 本地缓存 -> 系统hosts -> 路由器 -> 本地域名服务器 -> 根服务器 -> 顶级服务器 

### 4.建立TCP连接

#### 		三次握手四次挥手

### 5.客户端发送http请求

​		正常完成一次请求，连接便会断开，但是当请求头中加入了这样的信息时，该连接将一直保持打开状态

```
	Connection:Keep-Alive 
```

### 6.服务端响应请求

​		重定向：当响应码位301时，响应头中会有一个属性`Location`，接下来浏览器就会获取该字段中的地址，并使用该地址进行重新导航

### 7.浏览器解析响应请求，并渲染页面

1. 渲染进程将HTML内容转化为DOM树
2. 渲染进程将CSS转化为styleSgeets
3. 创建布局树，并计算元素的布局信息
4. 对布局进行分层，并生成分层树
5. 为每个图层生成绘制列表，并将其提交到合成线程
6. 合成线程将图层分成图块，并在光栅化线程池中将图块转换成位图
7. 合成线程发送绘制图块命令DrawQuad给浏览器进程
8. 浏览器根据DrawQuad消息生成页面，并显示到显示器上 

### 8.网页加载流程

1. 浏览器一边下载HTML网页，一边开始解析，不是等到下载完再开始解析
2. 解析过程中，浏览器发现`<script>`元素,就暂停解析，把网页渲染的控制权转交给`JavaScript`引擎（如果script中有defer属性，就会并行下载资源，但是浏览器完成解析HTML王爷之后，再执行已经下载完成的脚本---如果有async属性，也会并行下载资源，但是当脚本下载完成后，浏览器暂停解析HTML网页，开始执行下载完的脚本，脚本执行完之后再恢复解析HTML）
3. 如果`<script>`元素引用了外部脚本，就下载该脚本再执行，否则就直接执行代码
4. `JavaScript`引擎执行完毕，控制权交还渲染引擎，恢复往下解析HTML网页



###### 关于页面渲染时的情况说明：

- 尽量将脚本放在页面底部，或者将js代码放在DOM结构生成之后触发的事件中调用
- 遇到多个`<script>`标签，浏览器会并行下载资源，但是执行顺序是按照页面中出现的顺序决定的



## JavaScript执行机制

### 变量提升/ 函数提升

浏览器运行一段JS代码，会先编译，再运行

- #### 编译阶段

  通过编译阶段，会生成两部分内容：执行上下文和可执行代码

  代码一行行执行，遇到变量声明或者函数声明就会在执行上下文中创建对应的属性并初始化值，最后将声明以外的代码编译成字节码作为可执行代码

- #### 执行阶段

  运行可执行代码，一行行执行

### 调用栈

- 每调用一个函数，JavaScript引擎会为其创建执行上下文，并把该执行上下文压入调用栈，期间再次调用其他函数同样会创建执行上下文，并压入调用栈，在函数执行结束后，将其执行上下文从调用栈中弹出

### 块级作用域



### 作用域链和闭包

​		在JavaScript中，根据词法作用域的规则，内部函数总是可以访问外部函数中声明的变量，当通过调用一个外部函数返回一个内部函数后，及时该外部函数已经执行结束了，但是内部函数引用外部函数的变量依然保存在内存中，我们就把这些变量的集合成为闭包

​		跟着代码来分析一遍闭包：

```javascript
function foo() {
    var myName = " zmheang "
    let test1 = 1
    const test2 = 2
    var innerBar = { 
        setName:function(newName){
            myName = newName
        },
        getName:function(){
            console.log(test1)
            return myName
        }
    }
    return innerBar
}
var bar = foo()
bar.setName(" lily ")
bar.getName()
console.log(bar.getName())
```

- 当JavaScript引擎执行到`foo`函数是，首先会编译，并创建一个空执行上下文
- 在编译的过程中，遇到内部函数`setName`，JavaScript引擎还要对内部函数做一次快速的词法扫描，发现该内部函数引用了`foo`函数中的`myName`变量，由于是内部函数引用了外部函数变量，所以JavaScript引擎判断这是一个闭包，于是在堆空间创建一个`closure(foo)`的对象，用来保存`myName`变量
- 接着继续扫描到`getName`方法时，发现该函数内部还引用变量`test1`，于是`JavaScript`引擎又将`test1`添加到`closure(foo)`对象中，这时候堆中的`closure(foo)`对象中就包含了`myName`和`test1`两个变量了
- 由于`test2`并没有被内部函数引用，所以`test2`依然保存在调用栈中

也就是说闭包的核心有两点：

1. 预扫描内部函数
2. 把内部函数引用的外部变量保存到堆中



### this

首先要确定的一点是：`this` 和 作用域链之间没有任何的关系！！！

`this` 是和执行上下文相关联的，每个执行上下文都对应了一个`this`，比如全局上下文中的`this`指的是`window`对象，函数执行上下文中的`this`指的是调用此函数时的对象，当然我们也可以将执行上下文中`this`指向其他对象，一般是通过`call`函数，还可以使用`new`来创建

##### 当执行`new xxx（）`时，JavaScript做了什么：

1. 首先创建一个空对象tempObj
2. 接着调用`xxx.call（）`方法，并将tempObj作为`call`的参数，这样当`xxx`的执行上下文创建时，它的`this`就指向了`tempObj`对象
3. 然后执行`xxx`函数，此时的`xxx`函数执行上下文中的`this`指向了`tempObj`对象
4. 最后返回`tempObj`对象

##### this的相关坑

1. ###### 嵌套函数中的`this`不会从外层函数中继承

   解决方法：在外层函数中使用变量将this缓存起来或者使用箭头函数

2. ###### 普通函数中的`this`默认指向全局对象`window`

   通过`call`来规定`this`的指向

## V8工作原理

### 数据的存储

调用栈

堆

### 垃圾回收

调用栈：ESP，

堆：

​	新生代：复制算法

​	老生代：标记清除

### 编译器/解释器

。。。。

## 浏览器中的页面循环系统

。。。



## window对象

### 一、 概述

​			在浏览器中，`window`对象就是指当前的浏览器窗口，也是当前页面的顶层对象，所有其他对象就是它的下属。一个变量如果未声明那么默认就是顶层对象的属性

### 二、 属性和方法

- ####      属性

  - window.name： 一个字符串，表示当前浏览器的名字

  - window.closed： 布尔值，表示窗口是否关闭

  - window.opener：表示打开当前窗口的父窗口

  - window.self、window.window：都指向窗口本身

  - window.frames：返回一个类似数组的对象，成员为页面内所有框架窗口

  - window.length：返回当前网页包括的框架总数

  - window.frameElement：主要用于当前窗口嵌在另一个网页的情况，返回当前窗口所在的那个元素节点

  - window.top、window.parent：

  - window.status：用于读写浏览器状态栏的文本

  - window.devicePixelRatio：返回一个数值，表示一个CSS像素和一个物理像素大小之间的比率

  - ###### 位置属性

    - window.screenX\Y：返回浏览器窗口左上角相对于屏幕左上角的水平距离和垂直距离
    - window.innerHeight\innerWidth：返回网页在当前窗口中可见部分的高度和宽度（视口）
    - window.outerHeight\outerWidth：返回浏览器窗口的高度和宽度，包括浏览器菜单和边框
    - window.scrollX\scrollY：返回页面的水平滚动距离
    - window.pageXOffset\pageYOffset：同上

  - ###### 组件属性

    - window.locationbar： 地址栏对象
    - window.menubar：菜单栏对象
    - window.scrollbars：窗口的滚动条对象
    - window.toolbar：工具栏对象
    - window.statusbar：状态栏对象
    - window.personalbar：用户安装的个人工具栏对象

  - ###### 全局对象

    - window.document：指向document对象
    - window.location：指向location对象
    - window.navigator：指向navigator对象
    - window.history：指向history对象
    - window.localStorage：指向本地存储的localStorage数据
    - window.sessionStorage：指向本地存储的sessionStorage数据
    - window.console：指向console对象
    - window.screen：指向screen对象

  - window.isSecureContext：布尔值，表示当前窗口是否处在加密环境（https）中

- ####      方法

  - window.alert()：弹出对话框（参数只能是字符串）
  - window.prompt()：可交互的对话框，返回用户输入的信息
  - window.confirm()：只有确定和取消的对话框，返回布尔值
  - window.open()：新建一个浏览器窗口
  - window.close()：用于关闭当前窗口
  - window.stop()：等同于点击浏览器的停止按钮
  - window.moveTo()：用于移动浏览器窗口到指定位置
  - window.moveBy()：移动到一个相对位置
  - window.resizeTo()：用于缩放窗口到指定大小
  - window.resizeBy()：用于缩放窗口相对大小
  - window.scrollTo()\scroll()\scrollBy()：将文档滚动到指定位置
  - window.print()：跳出打印对话框
  - window.focus()\blur()：激活窗口或者将焦点从窗口移除
  - window.getSelection()：返回一个Selection对象，表示用户现在选中的文本
  - window.getComputedStyle()：接收一个元素作为参数，返回一个包含该元素的最终样式信息的对象
  - window.matchMedia()：用来检查CSS的mediaQuery语句
  - window.requestAnimationFrame()：也是推迟某个函数的执行
  - window.requestldleCallback()：也是推迟某个函数的执行

### 三、 事件

- load事件和onload属性：文档在浏览器窗口加载完毕时
- error事件和onerror属性：浏览器脚本发生错误时
- window对象的事件监听属性

### 四、 多窗口

。。。[浏览器多窗口相关](https://wangdoc.com/javascript/bom/window.html#%E6%A6%82%E8%BF%B0)

## Navigator对象

[Navigator对象](https://wangdoc.com/javascript/bom/navigator.html)



## Screen对象

[screen对象](https://wangdoc.com/javascript/bom/navigator.html#screen-%E5%AF%B9%E8%B1%A1)



## Cookie对象

### 概述

Cookie是服务器保存在浏览器中的一小段文本信息，一般大小不能超过4KB，浏览器每次向服务器发出请求都会携带这段信息，服务器如果希望在浏览器保存Cookie，就要在HTTP回应的头信息里面放置一个`Set-Cookie`字段，服务器如果想修改一个之前设置的`Cookie`值，必须同时满足四个条件：`Cookie`的key，domain，path 和 secure都匹配

### 属性

- #### Expires

  指定一个具体的到期时间，到了指定时间以后，浏览器就不再保存这个Cookie，它的值是UTC格式，可以使用`Date.prototytpe.toUTCString()`，不设置该值，默认当前会话有效

- #### Max-Age

  从现在开始Cookie的存在秒数，优先

- #### Domain

  指定浏览器发出HTTP请求时，哪些域名药附带这个Cookie，如果没有该值，默认将其设为当前域名

- #### Path

  指定浏览器发出HTTP请求时，哪些路径药附带这个Cookie

- #### Secure

  指定浏览器只有在加密协议下才能将Cookie发送到服务器

- #### HttpOnly

  指定该Cookie无法通过JavaScript脚本拿到

- #### SameSite

  Chrome51开始新增的属性用来防止CSRF攻击和用户追踪

  - Strict
  - Lax
  - None

## XMLHttpRequest对象

[XHR对象](https://wangdoc.com/javascript/bom/xmlhttprequest.html)



## 同源政策（同源限制）

### 概述

最初的含义是指：A网页设置的`Cookie`，B网页不能打开，除非这两个网页‘同源’，即协议相同，域名相同，端口相同（但是浏览器没有遵守这条）

目前如果非同源，共有三种行为受到限制

1. 无法读取非同源网页的Cookie、LocalStorage 和 IndexedDB
2. 无法接触非同源网页的DOM
3. 无法向非同源地址发送Ajax请求（可以发，但是浏览器会拒绝接受响应）



对于完全不同源的网站，目前有两种方法可以解决窗口的通信问题：

1. ###### 片段识别符

   片段标识符是指URl的#号后面的部分，只是改变片段标识符，页面不会重新刷新，这样我们就可以将父窗口要传递的信息，写入iframe窗口的片段标识符，子窗口通过监听hashchange()事件得到通知

2. ###### 跨文档通信API

   window.postMessage()：

   

关于Ajax请求，只能发送给同源地址，否则就报错，有三种方法规避这个限制：

1. ###### JSONP

   1. 网页添加一个`<script>`元素，向服务器请求一个脚本。这是不受同源政策的限制的

      ```
      <script src="http://api.foo.com?callback=bar"></script>
      ```

      注意，请求的脚本网址有一个callback参数，用来告诉服务器，客户端的回调函数是bar

   2. 服务器收到请求后，拼接一个字符串，将JSON数据放在函数名里面，作为字符串返回

   3. 客户端会将服务器返回的字符串作为代码解析，这时，只要客户端定义了bar()函数，就能在该函数体内拿到服务器返回的JSON数据

2. ###### WebSocket

   一种不实行同源政策的通信协议

3. ###### CORS

   [cors相关](https://wangdoc.com/javascript/bom/cors.html)



## Storage接口

sessionStorage和localStorage实现了Storage接口

sessionStorage： 保存的数据是会话级别的

localStorage：可长期存储，下次访问该网页也可以读取

#### 属性：

length：保存的数据项个数

#### 方法：

- setItem()：保存数据项，也可以直接赋值
- getItem()：读取数据项
- removeItem()：清除某个数据项
- clear()：清空所有数据项
- key()：接受一个整数作为参数，返回该位置对应的键值key

#### 事件：

```
function onStorageChange(e) {
  console.log(e.key);
}

window.addEventListener('storage', onStorageChange);
```

- `StorageEvent.key`：字符串，表示发生变动的键名。如果 storage 事件是由`clear()`方法引起，该属性返回`null`。
- `StorageEvent.newValue`：字符串，表示新的键值。如果 storage 事件是由`clear()`方法或删除该键值对引发的，该属性返回`null`。
- `StorageEvent.oldValue`：字符串，表示旧的键值。如果该键值对是新增的，该属性返回`null`。
- `StorageEvent.storageArea`：对象，返回键值对所在的整个对象。也说是说，可以从这个属性上面拿到当前域名储存的所有键值对。
- `StorageEvent.url`：字符串，表示原始触发 storage 事件的那个网页的网址

## History对象

[history对象](https://wangdoc.com/javascript/bom/history.html)



## Location、URL、URLSearchParams对象

[url](https://wangdoc.com/javascript/bom/location.html)



## File对象

[file对象](https://wangdoc.com/javascript/bom/file.html)



## FormData对象

[form](https://wangdoc.com/javascript/bom/form.html)



## indexedDB

[indexedDB](https://wangdoc.com/javascript/bom/indexeddb.html)



## Web Worker

### 注意点：

1. ###### 同源限制

   分配给Worker线程运行的脚本文件，必须与主线程的脚本文件同源

2. ###### DOM限制

   Worker线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的DOM对象，也无法使用`document`、`window`、`parant`这些对象，但是可以使用`navigator`、`Location`

3. ###### 全局对象限制

   同上

4. ###### 通信联系

   Worker线程和主线程不在同一个上下文环境，他们不能直接通信，必须通过消息完成

5. ###### 脚本限制

   Worker线程不能执行`alert()`、`conform()`方法，但是可以使用`xhr`发Ajax请求

6. ###### 文件限制

   Worker线程无法读取本地文件，即不能打开本地的文件系统，只能加载网络的资源







