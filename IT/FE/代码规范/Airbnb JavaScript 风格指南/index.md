# Airbnb JavaScript 风格指南

[git地址](https://github.com/lin-123/javascript#functions)

[TOC]

## Types

- ### 基本类型

  - ###### string

  - ###### number

  - ###### boolean

  - ###### null

  - ###### undefined

  - ###### symbol

- ### 复杂类型

  - ###### object

  - ###### array

  - ###### function

## References

- ##### 所有的赋值都用 const， 避免使用 var

- ##### 如果你一定要对参数重新赋值，那就用 let， 而不是 var

- ##### 注意：let， const 都是块级作用域

## Objects

- ##### 使用字面值创建对象

  ```javascript
  // bad
  const item = new Object()
  
  // good
  const item = {}
  ```

- ##### 当创建一个带有动态属性名的对象时，用计算后属性名

  ```javascript
  function getKey(k) {
  	return `a key named ${k}`
  }
  
  // bad
  const obj = {
      id: 6,
      name: 'zmheang'
  }
  obj[getKey('enabled')] = true
  
  // good getKey('enabled') 是动态属性名
  const obj = {
      id: 5,
      name: 'zmheang',
      [getKey('enabled')]: true
  }
  ```

- ##### 用对象方法简写

  ```javascript
  // bad
  const atom = {
  	value: 1,
      
      addValue: function(value) {
          return atom.value + value
      }
  }
   
  // good
  const atom = {
      value: 1,
      
      addValue(value) {
          return atom.value + value
      }
  }
  ```

- ##### 用属性值缩写

  ```javascript
  const lily = 'lily'
  
  // bad
  const obj = {
  	lily: lily
  }
  
  // good
  const obj = {
      lily,
  }
  ```

- ##### 将你的所有缩写放在对象声明的开始

  ```javascript
  const lily1 = 'lily111'
  cosnt lily2 = 'lily222'
  
  // bad
  const obj = {
      zmheang1: 'zmheang1',
      lily1,
      zmheang: 'zmhenag,
      lily2,
  }
  
  // good
  const obj = {
      lily1,
      lily2,
     	zmheang: 'zmheang
  }
  ```

- ##### 只对那些无效的标示使用引号

  ```javascript
  cosnt bad = {
  	'foo': 3,
      'bar': 4，
      'data-blah': 5
  }
  
  cosnt good = {
  	foo: 3,
      bar: 4，
      'data-blah': 5
  }
  ```

- ##### 不要直接调用Object.prototype 上的方法，如hasOwnProperty, propertyIsEnumerable, isPrototypeOf。

  ```javascript
  // bad
  console.log(object.hasOwnProperty(key))
  
  // good
  console.log(Object.prototype.hasProperty.call(object, key))
  
  // best
  const has = Object.prototype.hasProperty
  import has from 'has'
  console.log(has.call(object, key))
  ```

- ##### 对象浅拷贝时，更推荐使用扩展运算符，而不是Object.assign()

  ```
  // vary bad
  const original = {a: 1, b: 2}
  const copy = Object.assign(original, {c: 3})
  delete copy.a
  
  // bad
  const copy = Object.assign({}, original, {c: 3})
  
  // good
  const copy = {...original, c: 3}
  const {a, ...noA} = copy
  ```

## Arrays

- ##### 用字面量赋值

  ```javascript
  cosnt bad = new Array()
  
  cosnt good = []
  ```

- ##### 用Array.push() 向数组中添加值

  ```javascript
  const list = []
  // bad
  list[list.length] = 'zmheang'
  
  // good
  list.push('zmheang')
  ```

- ##### 使用扩展运算符做数组的浅拷贝

  ```javascript
  // bad
  const len = items.length;
  const itemsCopy = [];
  let i;
  
  for (i = 0; i < len; i += 1) {
    itemsCopy[i] = items[i];
  }
  
  // good
  const itemsCopy = [...items];
  ```

- ##### 用... 运算符而不是 Array.from() 来将一个可迭代的对象转换为数组

  ```javascript
  const foo = document.querySelectorAll('.foo');
  
  // good
  const nodes = Array.from(foo);
  
  // best
  const nodes = [...foo];
  ```

- #####  用 `Array.from` 去将一个类数组对象转成一个数组

  ```javascript
  const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 };
  
  // bad
  const arr = Array.prototype.slice.call(arrLike);
  
  // good
  const arr = Array.from(arrLike);
  ```

- ##### 用`Array.from` 而不是 `...` 运算符去做map 遍历，因为这样可以避免创建一个临时数组

  ```javascript
  // bad
  const baz = [...foo].map(bar);
  
  // good
  const baz = Array.from(foo, bar);
  
  Array.from() 方法有一个可选参数 mapFn，让你可以在最后生成的数组上再执行一次 map 方法后再返回。也就是说 Array.from(obj, mapFn, thisArg) 就相当于 Array.from(obj).map(mapFn, thisArg), 
  ```

- ##### 在数组方法的回调函数中使用 return 语句。 如果函数体由一条返回一个表达式的语句组成， 并且这个表达式没有副作用， 这个时候可以忽略return

- ##### 如果一个数组有很多行，在数组的 `[` 后和 `]` 前断行

## Destructuring

- 用对象的解构赋值来获取和使用对象某个或多个属性值

  ```javascript
  // bad
  function getFullName(user) {
    const firstName = user.firstName;
    const lastName = user.lastName;
  
    return `${firstName} ${lastName}`;
  }
  
  // good
  function getFullName(user) {
    const { firstName, lastName } = user;
    return `${firstName} ${lastName}`;
  }
  
  // best
  function getFullName({ firstName, lastName }) {
    return `${firstName} ${lastName}`;
  }
  ```

- 用数组解构

  ```javascript
  const arr = [1, 2, 3, 4];
  
  // bad
  const first = arr[0];
  const second = arr[1];
  
  // good
  const [first, second] = arr;
  ```

- 多个返回值用对象的解构，而不是数组解构

  ```javascript
  // bad
  function processInput(input) {
    // 然后就是见证奇迹的时刻
    return [left, right, top, bottom];
  }
  
  // 调用者需要想一想返回值的顺序
  const [left, __, top] = processInput(input);
  
  // good
  function processInput(input) {
    // oops， 奇迹又发生了
    return { left, right, top, bottom };
  }
  
  // 调用者只需要选择他想用的值就好了
  const { left, top } = processInput(input);
  ```

## strings

- 对string用单引号`''`

  ```javascript
  // bad
  const name = "Capt. Janeway";
  
  // bad - 样例应该包含插入文字或换行
  const name = `Capt. Janeway`;
  
  // good
  const name = 'Capt. Janeway';
  ```

- 超过100个字符的字符串不应该用string串联成多行

  ```javascript
  // bad
  const errorMessage = 'This is a super long error that was thrown because \
  of Batman. When you stop to think about how Batman had anything to do \
  with this, you would get nowhere \
  fast.';
  
  // bad
  const errorMessage = 'This is a super long error that was thrown because ' +
    'of Batman. When you stop to think about how Batman had anything to do ' +
    'with this, you would get nowhere fast.';
  
  // good
  const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';
  ```

- 用字符串模板而不是字符串拼接来组织可编程字符串

  ```javascript
  // bad
  function sayHi(name) {
    return 'How are you, ' + name + '?';
  }
  
  // bad
  function sayHi(name) {
    return ['How are you, ', name, '?'].join();
  }
  
  // bad
  function sayHi(name) {
    return `How are you, ${ name }?`;
  }
  
  // good
  function sayHi(name) {
    return `How are you, ${name}?`;
  }
  ```

- 永远不要在字符串中用`eval()`，他就是潘多拉盒子\

- 不要使用不必要的转义字符

  ```javascript
  // bad
  const foo = '\'this\' \i\s \"quoted\"';
  
  // good
  const foo = '\'this\' is "quoted"';
  
  //best
  const foo = `my name is '${name}'`;
  ```

# Functions

- 用命名函数表达式而不是函数声明

  ```javascript
  // bad
  function foo() {
    // ...
  }
  
  // bad
  const foo = function () {
    // ...
  };
  
  // good
  // lexical name distinguished from the variable-referenced invocation(s)
  // 函数表达式名和声明的函数名是不一样的
  const short = function longUniqueMoreDescriptiveLexicalFoo() {
    // ...
  };
  ```

- 把立即执行函数包裹在圆括号里

  ```javascript
  // immediately-invoked function expression (IIFE)
  (function () {
    console.log('Welcome to the Internet. Please follow me.');
  }());
  ```

- 不要在非函数块（if、while等等）内声明函数。把这个函数分配给一个变量。浏览器会允许你这样做，但浏览器解析方式不同，这是一个坏消息

  ```javascript
  // bad
  if (currentUser) {
    function test() {
      console.log('Nope.');
    }
  }
  
  // good
  let test;
  if (currentUser) {
    test = () => {
      console.log('Yup.');
    };
  }
  ```

- 不要用`arguments` ` 用rest语法代替 ``...` ,另外函数的形参名也不要用arguments，这会导致函数自带的 arguments 值被覆盖

  ```javascript
  // bad
  function concatenateAll() {
    const args = Array.prototype.slice.call(arguments);
    return args.join('');
  }
  
  // good
  function concatenateAll(...args) {
    return args.join('');
  }
  ```

- 用默认参数语法而不是在函数里对参数重新赋值

  ```javascript
  // really bad
  function handleThings(opts) {
    // 不， 我们不该改arguments
    // 第二： 如果 opts 的值为 false, 它会被赋值为 {}
    // 虽然你想这么写， 但是这个会带来一些细微的bug
    opts = opts || {};
    // ...
  }
  
  // still bad
  function handleThings(opts) {
    if (opts === void 0) {
      opts = {};
    }
    // ...
  }
  
  // good
  function handleThings(opts = {}) {
    // ...
  }
  ```

- 默认参数避免副作用

  ```javascript
  var b = 1;
  // bad
  function count(a = b++) {
    console.log(a);
  }
  count();  // 1
  count();  // 2
  count(3); // 3
  count();  // 3
  ```

- 把默认参数赋值在最后

  ```javascript
  // bad
  function handleThings(opts = {}, name) {
    // ...
  }
  
  // good
  function handleThings(name, opts = {}) {
    // ...
  }
  ```

- 不要使用函数构造器创建函数

  ```javascript
  // bad
  var add = new Function('a', 'b', 'return a + b');
  
  // still bad
  var subtract = Function('a', 'b', 'return a - b');
  ```

- 函数签名部分要有空格

  ```javascript
  // bad
  const f = function(){};
  const g = function (){};
  const h = function() {};
  
  // good
  const x = function () {};
  const y = function a() {};
  ```

- 不要改参数

  ```javascript
  // bad
  function f1(obj) {
    obj.key = 1;
  };
  
  // good
  function f2(obj) {
    const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
  };
  ```

- 不要对参数重新赋值

  ```javascript
  // bad
  function f1(a) {
    a = 1;
    // ...
  }
  
  function f2(a) {
    if (!a) { a = 1; }
    // ...
  }
  
  // good
  function f3(a) {
    const b = a || 1;
    // ...
  }
  
  function f4(a = 1) {
    // ...
  }
  ```

- 用 `spread` 操作符 `...`去调用多变的函数更好

  ```javascript
  // bad
  const x = [1, 2, 3, 4, 5];
  console.log.apply(console, x);
  
  // good
  const x = [1, 2, 3, 4, 5];
  console.log(...x);
  
  // bad
  new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5]));
  
  // good
  new Date(...[2016, 8, 5]);
  ```

- 调用或者书写一个包含多个参数的函数

  ```javascript
  // bad
  function foo(bar,
               baz,
               quux) {
    // ...
  }
  
  // good 缩进不要太过分
  function foo(
    bar,
    baz,
    quux,
  ) {
    // ...
  }
  
  // bad
  console.log(foo,
    bar,
    baz);
  
  // good
  console.log(
    foo,
    bar,
    baz,
  );
  ```

## Arrow Functions

- 当你一定要用函数表达式(在回调函数里)的时候就用箭头表达式吧

  ```javascript
  // bad
  [1, 2, 3].map(function (x) {
    const y = x + 1;
    return x * y;
  });
  
  // good
  [1, 2, 3].map((x) => {
    const y = x + 1;
    return x * y;
  });
  ```

- 如果函数体由一个没有副作用的表达式语句组成，删除大括号和return 。否则，继续使用大括号和return 语句

  ```javascript
  // bad
  [1, 2, 3].map(number => {
    const nextNumber = number + 1;
    `A string containing the ${nextNumber}.`;
  });
  
  // good
  [1, 2, 3].map(number => `A string containing the ${number}.`);
  
  // good
  [1, 2, 3].map((number) => {
    const nextNumber = number + 1;
    return `A string containing the ${nextNumber}.`;
  });
  
  // good
  [1, 2, 3].map((number, index) => ({
    [index]: number
  }));
  
  // 表达式有副作用就不要用隐式return
  function foo(callback) {
    const val = callback();
    if (val === true) {
      // Do something if callback returns true
    }
  }
  
  let bool = false;
  
  // bad
  // 这种情况会return bool = true, 不好
  foo(() => bool = true);
  
  // good
  foo(() => {
    bool = true;
  });
  ```

- 万一表达式涉及多行，把它包裹在圆括号内更可读

  ```javascript
  // bad
  ['get', 'post', 'put'].map(httpMethod => Object.prototype.hasOwnProperty.call(
      httpMagicObjectWithAVeryLongName,
      httpMethod
    )
  );
  
  // good
  ['get', 'post', 'put'].map(httpMethod => (
    Object.prototype.hasOwnProperty.call(
      httpMagicObjectWithAVeryLongName,
      httpMethod
    )
  ));
  ```

- 避免箭头函数和比较操作符混淆

  ```javascript
  // bad
  const itemHeight = (item) => item.height <= 256 ? item.largeSize : item.smallSize;
  
  // bad
  const itemHeight = (item) => item.height >= 256 ? item.largeSize : item.smallSize;
  
  // good
  const itemHeight = (item) => (item.height <= 256 ? item.largeSize : item.smallSize);
  
  // good
  const itemHeight = (item) => {
    const { height, largeSize, smallSize } = item;
    return height <= 256 ? largeSize : smallSize;
  };
  ```

- 在隐式return 中强制约束函数体的位置，就写在箭头的后面

  ```javas
  // bad
  (foo) =>
    bar;
  
  (foo) =>
    (bar);
  
  // good
  (foo) => bar;
  (foo) => (bar);
  (foo) => (
     bar
  )
  ```

## Classes & Constructors

- 常用 `class` ，避免直接操作 `prototype`

  ```javascript
  // bad
  function Queue(contents = []) {
    this.queue = [...contents];
  }
  Queue.prototype.pop = function () {
    const value = this.queue[0];
    this.queue.splice(0, 1);
    return value;
  };
  
  
  // good
  class Queue {
    constructor(contents = []) {
      this.queue = [...contents];
    }
    pop() {
      const value = this.queue[0];
      this.queue.splice(0, 1);
      return value;
    }
  }
  ```

- 用extend 实现继承

  ```javascript
  // bad
  const inherits = require('inherits');
  function PeekableQueue(contents) {
    Queue.apply(this, contents);
  }
  inherits(PeekableQueue, Queue);
  PeekableQueue.prototype.peek = function () {
    return this.queue[0];
  }
  
  // good
  class PeekableQueue extends Queue {
    peek() {
      return this.queue[0];
    }
  }
  ```

- 方法可以返回 `this` 来实现方法链

  ```javascript
  // bad
  Jedi.prototype.jump = function () {
    this.jumping = true;
    return true;
  };
  
  Jedi.prototype.setHeight = function (height) {
    this.height = height;
  };
  
  const luke = new Jedi();
  luke.jump(); // => true
  luke.setHeight(20); // => undefined
  
  // good
  class Jedi {
    jump() {
      this.jumping = true;
      return this;
    }
  
    setHeight(height) {
      this.height = height;
      return this;
    }
  }
  
  const luke = new Jedi();
  
  luke.jump()
    .setHeight(20);
  ```

- 写一个定制的 toString() 方法是可以的，只要确保它是可以正常工作且没有副作用

  ```javascript
  class Jedi {
    constructor(options = {}) {
      this.name = options.name || 'no name';
    }
  
    getName() {
      return this.name;
    }
  
    toString() {
      return `Jedi - ${this.getName()}`;
    }
  }
  ```

- 如果没有具体说明，类有默认的构造方法，一个空的构造函数或只是代表父类的构造函数时不需要写的

  ```javascript
  // bad
  class Jedi {
    constructor() {}
  
    getName() {
      return this.name;
    }
  }
  
  // bad
  class Rey extends Jedi {
    // 这种构造函数是不需要写的
    constructor(...args) {
      super(...args);
    }
  }
  
  // good
  class Rey extends Jedi {
    constructor(...args) {
      super(...args);
      this.name = 'Rey';
    }
  }
  ```

- 避免重复类成员

  ```javascript
  // bad
  class Foo {
    bar() { return 1; }
    bar() { return 2; }
  }
  
  // good
  class Foo {
    bar() { return 1; }
  }
  
  // good
  class Foo {
    bar() { return 2; }
  }
  ```

- 除非外部库或框架需要使用特定的非静态方法，否则类方法应该使用 `this` 或被做成静态方法。作为一个实例方法应该表明它根据接收者的属性有不同的行为

  ```javascript
  // bad
  class Foo {
    bar() {
      console.log('bar');
    }
  }
  
  // good - this 被使用了
  class Foo {
    bar() {
      console.log(this.bar);
    }
  }
  
  // good - constructor 不一定要使用this
  class Foo {
    constructor() {
      // ...
    }
  }
  
  // good - 静态方法不需要使用 this
  class Foo {
    static bar() {
      console.log('bar');
    }
  }
  ```

  

























