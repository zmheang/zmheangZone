JavaScript 是

一种轻量级的脚本语言

先解析所有代码，然后声明变量在调用栈，最后执行可执行代码

https://wangdoc.com/javascript/async/general.html



## 数据类型

### 	对象（object）

- 对象object的键名全是字符串，键值可以是任何数据类型

- delete 对象中的属性，一般返回true，只有该属性存在且不得删除会返回false

- 判断对象中是否含有某个属性： `in` 或者 `hasOwnProperty`

- `for ... in`遍历对象中所有可遍历的属性，不仅遍历自身的属性，还会遍历继承的属性

- `with语句`语句

  ```
  with (对象) {
    语句;
  }
  // 例一
  var obj = {
    p1: 1,
    p2: 2,
  };
  with (obj) {
    p1 = 4;
    p2 = 5;
  }
  // 等同于
  obj.p1 = 4;
  obj.p2 = 5;
  
  // 例二
  with (document.links[0]){
    console.log(href);
    console.log(title);
    console.log(style);
  }
  // 等同于
  console.log(document.links[0].href);
  console.log(document.links[0].title);
  console.log(document.links[0].style);
  
  // 注意
  var obj = {};
  with (obj) {
    p1 = 4;
    p2 = 5;
  }
  
  obj.p1 // undefined
  p1 // 4
  ```

  ### 函数（function）

- 函数名后面紧跟一对圆括号，就会调用这个函数

- JavaScript引擎将函数名视同变量名。所以采用function命令声明函数时，整个函数会像变量声明一样被提升到代码头部

- `length`属性

- 参数传递：原始类型的值是值传递，复合类型的值是引用传递

- 函数内部可以使用`arguments `来获取函数被调用是的参数列表

- 函数转数组：

  - ```
    var args = Array.prototype.slice.call(arguments);
    ```

  - ```
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    ```

- IIFE

  function关键字出现在行首，一律解释为语句

  ### 数组

- 数组是特殊的Object：键名是固定的（默认总是0， 1， 2.......）

- `length`属性：最大值是2的32次方-1个，length的值为键名中最大数+1，比如

  ```
  var arr = ['a', 'b'];
  arr.length // 2
  
  arr[2] = 'c';
  arr.length // 3
  
  arr[9] = 'd';
  arr.length // 10
  
  arr[1000] = 'e';
  arr.length // 1001
  ```

  清空数组也可以用

  ```
  var arr = [ 'a', 'b', 'c' ];
  
  arr.length = 0;
  arr // []
  ```

  也可以给数组添加非数字键名，并不会影响`length`的值
  
- 数组的遍历

  - `for ... in`不止能遍历所有的数字键，还会遍历非数字键
  - `for ... i` 或者 `while`
  - `forEach`

  ### 转换

  #### 强制转换

  - Number()

    ```
    // 数值：转换后还是原来的值
    Number(324) // 324
    
    // 字符串：如果可以被解析为数值，则转换为相应的数值
    Number('324') // 324
    
    // 字符串：如果不可以被解析为数值，返回 NaN
    Number('324abc') // NaN
    
    // 空字符串转为0
    Number('') // 0
    
    // 布尔值：true 转成 1，false 转成 0
    Number(true) // 1
    Number(false) // 0
    
    // undefined：转成 NaN
    Number(undefined) // NaN
    
    // null：转成0
    Number(null) // 0
    
    对象转number
    第一步，调用对象自身的valueOf方法。如果返回原始类型的值，则直接对该值使用Number函数，不再进行后续步骤。
    
    第二步，如果valueOf方法返回的还是对象，则改为调用对象自身的toString方法。如果toString方法返回原始类型的值，则对该值使用Number函数，不再进行后续步骤。
    
    第三步，如果toString方法返回的是对象，就报错。
    ```

  - String()

    ```
    数值：转为相应的字符串。
    字符串：转换后还是原来的值。
    布尔值：true转为字符串"true"，false转为字符串"false"。
    undefined：转为字符串"undefined"。
    null：转为字符串"null"。
    
    对象转string
    1. 先调用对象自身的toString方法。如果返回原始类型的值，则对该值使用String函数，不再进行以下步骤。
    
    2. 如果toString方法返回的是对象，再调用原对象的valueOf方法。如果valueOf方法返回原始类型的值，则对该值使用String函数，不再进行以下步骤。
    
    3. 如果valueOf方法返回的是对象，就报错。
    ```

  - Boolean()

    ```
    以下情况为 `false`，其余都为`true`
    undefined， null， 0（包含-0和+0）， NaN， ''
    ```

    

  #### 隐式转换

  - `+`两边会自动转成字符串
  - 其他运算符两边会自动转数字

  ### 错误处理机制

  - Error实例对象：必须有message属性，可以有name，stack对象

  - 原生错误类型：

    - SyntaxError:  解析代码时发生的错误
    - ReferenceError： 引用一个不存在的变量时
    - RangeError: 一个超出有效范围时
    - TypeError： 变量或参数不是预期类型
    - URIError： URI相关函数的参数不正确
    - EvalError： eval函数没有被正确执行

  - 自定义错误

    ```
    function UserError(message) {
      this.message = message || '默认信息';
      this.name = 'UserError';
    }
    
    UserError.prototype = new Error();
    UserError.prototype.constructor = UserError;
    
    new UserError('这是自定义的错误！');
    ```

  - `throw`

  - `try ... catch...finally`

  

  ## 对象的继承

  ### 原型prototype

  JavaScript规定，每个函数都有一个`prototype`属性，指向一个对象，对于普通函数来说，改属性基本无用，但是对于构造函数来说生成实例的时候，该属性会自动成为实例对象的原型，当实例对象本身没有某个属性或者方法的时候，就回去原型对象上找该对象或方法

  - `constructor属性`

    作用是可以得知某个实例对象到底是哪一个构造函数产生的，另一方面就可以从一个实例对象新建另一个实例

    ```
    function Constr() {}
    var x = new Constr();
    
    var y = new x.constructor();
    y instanceof Constr // true
    ```

  - `instanceof`运算符

    返回一个布尔值，标表示对象是否为某个构造函数的实例，只能与用于对象，不适用原始类型的值

    ```
    v instanceof Vehicle
    // 等同于
    Vehicle.prototype.isPrototypeOf(v)
    ```

    `isPrototypeOf()`方法是JavaScript提供的原生方法，用于检查某个对象是否为另一个对象的原型

    利用`instanceof`运算符可以巧妙的解决调用构造函数时忘记加`new`命令的问题

    ```
    function Fubar (foo, bar) {
      if (this instanceof Fubar) {
        this._foo = foo;
        this._bar = bar;
      } else {
        return new Fubar(foo, bar);
      }
    }
    ```

    

  ### 原型链

  所有对象都有自己的原型对象，一方面，任何一个对象都可以充当其他对象的原型，另一方面，由于原型对象也是对象，所以它也有自己的原型，最后所有对象的原型最终都可以上溯到`Object.prototype -> null` ,

  当读取对象的某个属性时，JavaScript先寻找对象本身的属性，找不到就向上找，直到最顶层，所以也是会影响性能的

  ### 构造函数的继承

  - 第一步是在子类的构造函数中，调用父类的构造函数，第二步是让子类的原型指向父类的原型，这样子类就可以继承父类原型

    ```
    function Sub(value) {
      Super.call(this);
      this.prop = value;
    }
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    ```

  - ```
    Sub.prototype = new Super();
    ```

  ### 多重继承

  ```
  function M1() {
    this.hello = 'hello';
  }
  
  function M2() {
    this.world = 'world';
  }
  
  function S() {
    M1.call(this);
    M2.call(this);
  }
  
  // 继承 M1
  S.prototype = Object.create(M1.prototype);
  // 继承链上加入 M2
  Object.assign(S.prototype, M2.prototype);
  
  // 指定构造函数
  S.prototype.constructor = S;
  
  var s = new S();
  s.hello // 'hello'
  s.world // 'world'
  ```

  ### 模块

  #### 基本写法

  ```
  var module1 = (function () {
  　var _count = 0;
  　var m1 = function () {
  　  //...
  　};
  　var m2 = function () {
  　　//...
  　};
  　return {
  　　m1 : m1,
  　　m2 : m2
  　};
  })();
  ```

  #### 放大模式

  ```
  var module1 = (function (mod){
  　mod.m3 = function () {
  　　//...
  　};
  　return mod;
  })(module1);
  ```

  ### Object

  - `Object.getPrototypeOf()`返回参数对象的原型

    ```
    // 空对象的原型是 Object.prototype
    Object.getPrototypeOf({}) === Object.prototype // true
    
    // Object.prototype 的原型是 null
    Object.getPrototypeOf(Object.prototype) === null // true
    
    // 函数的原型是 Function.prototype
    function f() {}
    Object.getPrototypeOf(f) === Function.prototype // true
    ```

  - `Object.setPrototypeOf(a, b)`,将对象a的原型设置为对象b

  - `Object.create()`

  - `Object.prototype.isPrototypeOf()`用来判断对象是否为参数对象的原型

  - `Object.getOwnPropertyNames()`返回参数对象本身的所有属性键名，不包含继承的属性键名

  - `Object.prototype.hasOwnProperty()`判断某个属性定义在对象自身还是定义在原型链上，是JavaScript值重唯一一个处理对象属性时，不会遍历原型链的方法

  ### 异步操作

  







### 









------

- 脚本语言：（百度百科的定义）：为了缩短传统的编写-编译-链接-运行 过程儿创建的计算机编程语言，指的是它本身不具备开发操作系统的能力，只是用来编写控制其他大型应用程序（比如浏览器）的脚本

- 闭包：

  正常情况下函数内部是可以访问函数外部的变量，而函数外部是访问不了函数内部的变量的，但是我们可以在函数(f1)的内部再定义一个函数(f2)，在新定义的函数(f2)内部访问原来函数(f1)内部的变量（相对于新创建的函数(f2)的外部变量，这是可以访问到的），然后我们将函数(f2)作为f1的返回值，这样在f1被调用的时候，就会在调用栈中创建一个close-fiuse什么的空间，该空间会一直保存在内存中，知道接收f1返回值的变量在内存中消失
  
- new命令

  作用就是执行构造函数，返回一个实例对象 

  使用new命令调用的函数内部的`new.target` 的值为当前函数本身，没有使用new调用的函数的值为`undefined`

  new命令的执行原理：

  1. 创建一个空对象，作为将要返回的对象实例
  2. 将这个空对象的原型，指向构造函数的`prototype`属性
  3. 将这个空对象赋值给函数内部的`this`关键字
  4. 开始执行构造函数内部的代码
  5. 最后如果return 的是对象，就会返回指定的对象，否则返回`this`

  ```
  function _new(/* 构造函数 */ constructor, /* 构造函数参数 */ params) {
    // 将 arguments 对象转为数组
    var args = [].slice.call(arguments);
    // 取出构造函数
    var constructor = args.shift();
    // 创建一个空对象，继承构造函数的 prototype 属性
    var context = Object.create(constructor.prototype);
    // 执行构造函数
    var result = constructor.apply(context, args);
    // 如果返回结果是对象，就直接返回，否则返回 context 对象
    return (typeof result === 'object' && result != null) ? result : context;
  }
  
  // 实例
  var actor = _new(Person, '张三', 28);
  ```

- this

  简单来说，`this`就是属性或者方法‘当前’所在的对象

  使用场合：

  - 全局环境---window
  - 构造函数---实例对象
  - 对象的方法---调用该方法的对象

  可使用call(),apply()绑定指定的this值

