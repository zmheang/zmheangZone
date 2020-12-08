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











































