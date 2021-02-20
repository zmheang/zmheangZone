## Proxy

[TOC]

### 概述

用于修改某些操作的默认行为，等用于在语言层面作出修改，所以属于一种‘元编程’，即对编程语言进行编程

```
var proxy = new Proxy(target, handle)
```



### 实例方法

#### get()：用于拦截对象的读取属性操作

```
var p = new Proxy(target, {
  get: function(target, property, receiver) {
  }
});
target: 目标对象
property: 被获取的属性名
receiver: Proxy或者继承Proxy的对象
```



#### set()

#### apply()

#### has()

#### construct()

#### deleteProperty()

#### defineProperty()

#### getOwnPropertyDescriptor()

#### getPrototypeOf()

#### isExtensible()

#### ownKeys()

#### preventExtensions()

#### setPrototypeOf()

### proxy.revocable()

### this问题

### 实例：Web服务的客户端