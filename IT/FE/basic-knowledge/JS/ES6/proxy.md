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

##### 拦截对象：

- 访问属性：`proxy[foo]` 和 `proxy.foo`
- 访问原型链上的属性：`object.create(proxy)[foo]`
- `Reflect.get()`

##### 约束：

- 如果要访问的目标属性时不可写以及不可配置的，则返回的值必须与该目标属性的值相同
- 如果要访问的目标属性没有配置访问方法，即`get`方法时 undefined 的，则返回值必须为 undefined

##### 实例：

###### 	01、拦截读取操作

```javascript
var person = {
  name: "张三"
};

var proxy = new Proxy(person, {
  get: function(target, propKey) {
    if (propKey in target) {
      return target[propKey];
    } else {
      throw new ReferenceError("Prop name \"" + propKey + "\" does not exist.");
    }
  }
});
// 包括继承来的属性也可以拦截

proxy.name // "张三"
proxy.age // 抛出一个错误
```

###### 	02、数组读取负数的索引

```javascript
function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey);
        // 索引是 负数 时，单独处理
      if (index < 0) {
        propKey = String(target.length + index);
      }
      return Reflect.get(target, propKey, receiver);
    }
  };

  let target = [];
  target.push(...elements);
  return new Proxy(target, handler);
}

let arr = createArray('a', 'b', 'c');
arr[-1] // c
```

###### 	03、属性的链式操作

```javascript
var pipe = function (value) {
  var funcStack = [];
  var oproxy = new Proxy({} , {
    get : function (pipeObject, fnName) {
      if (fnName === 'get') {
        return funcStack.reduce(function (val, fn) {
          return fn(val);
        },value);
      }
        // 每次访问时就将对应的方法缓存起来，知道get 的时候，遍历执行缓存的方法，并返回最终的值
      funcStack.push(window[fnName]);
      return oproxy;
    }
  });

  return oproxy;
}

var double = n => n * 2;
var pow    = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;

pipe(3).double.pow.reverseInt.get; // 63
```

###### 04、生成各种 DOM 节点的通用函数

```javascript
const dom = new Proxy({}, {
  get(target, property) {
    return function(attrs = {}, ...children) {
      const el = document.createElement(property);
      for (let prop of Object.keys(attrs)) {
        el.setAttribute(prop, attrs[prop]);
      }
      for (let child of children) {
        if (typeof child === 'string') {
          child = document.createTextNode(child);
        }
        el.appendChild(child);
      }
      return el;
    }
  }
});

const el = dom.div({},
  'Hello, my name is ',
  dom.a({href: '//example.com'}, 'Mark'),
  '. I like:',
  dom.ul({},
    dom.li({}, 'The web'),
    dom.li({}, 'Food'),
    dom.li({}, '…actually that\'s it')
  )
);

document.body.appendChild(el);
```

#### set()：设置属性值操作的捕获器

```javascript
const p = new Proxy(target, {
  set: function(target, property, value, receiver) {
  }
});
target: 目标对象
property： 将被设置的属性名或 Symbol
value: 新属性值
receiver： 最初被调用的对象
```

##### 返回值：布尔值

##### 拦截：

- 指定属性值`proxy[foo] = bar` 和 `proxy.foo = bar`
- 指定继承者的属性值： `Object.create(proxy)[foo] = bar`
- `Reflect.set()`

##### 约束：

- 若目标属性是一个不可写及不可配置的数据属性，则不能改变它的值
- 如果目标属性没有配置存储方法，则不能设置它的值
- 在严格模式下，如果`set()`方法返回 false，那么也会抛出异常        

##### 实例

###### 	01、暂无                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              

#### apply()：用于拦截函数的调用

```javascript
var p = new Proxy(target, {
  apply: function(target, thisArg, argumentsList) {
  }
});
target: 目标对象
thisArg: 被调用时的上下文
argumentList: 被调用时的参数数组
```

##### 拦截：

- `proxy(...args)`
- `Function.protptype.apply()` 和 `Function.prototype.call()`
- `Reflect.apply()`

##### 约束：

`target`必须是可被调用的

#### has()：针对 in 操作符的代理方法

```javascript
var p = new Proxy(target, {
  has: function(target, prop) {
  }
});
target: 目标对象
prop： 需要检查是否存在的属性
```

##### 拦截：

- 属性查询：`foo in proxy`
- 继承属性查询：`foo in Object.create(proxy)`
- `Reflect.has()`

##### 约束：

- 如果目标对象的某一属性本身不可被配置，则该属性不能够被代理隐藏
- 如果目标对象为不可扩展对象，则该对象的属性不能够被代理隐藏

##### 实例：

###### 	01、隐藏某些私有属性

```javascript
var handler = {
  has (target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
'_prop' in proxy // false
```

#### construct():拦截 new 操作符

```javascript
var p = new Proxy(target, {
  construct: function(target, argumentsList, newTarget) {
  }
});
target: 目标对象
argumentsList: constructor 的参数列表
newTarget:最初被调用的构造函数
```

##### 拦截：

- `new proxy(...args)`
- `Reflect.construct()`

##### 约束：

- 必须返回一个对象

#### deleteProperty()

#### defineProperty()

#### getOwnPropertyDescriptor()

#### getPrototypeOf()

#### isExtensible()

#### ownKeys()

#### preventExtensions()

#### setPrototypeOf()

### proxy.revocable()：创建一个可撤销的Proxy实例

```javascript
let target = {};
let handler = {};

let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123

revoke();
proxy.foo // TypeError: Revoked

返回一个对象，该对象的proxy属性是 Proxy实例，revoke属性是一个函数，可以取消Proxy实例
```



### this问题

### 实例：Web服务的客户端