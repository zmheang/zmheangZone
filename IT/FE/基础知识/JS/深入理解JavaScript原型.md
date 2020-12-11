## 深入理解JavaScript

[大佬随想](https://juejin.cn/post/6901494216074100750)

首先`Prototype` 也是一个对象，在 `ES2019` 规范中被定义为： 给其他对象提供共享属性的对象

- #### 所有的 `object` 对象都有一个隐式引用

  ```
  Every object has an implicit reference (called the object's prototype)
  ```

- #### 历史问题：proto

  规范规定 `prototype` 是一个隐式引用，通过 `Object.getPrototypeOf(obj)` 间接访问指定对象的 `prototype` 对象，通过`Object.setPrototypeOf(obj, anotherObj)` 间接设定指定对象的 `prototype` 对象，但是部分浏览器可以通过`obj.proto` 直接访问原型和设置原型。所以在 `ECMAScript 2015` 中也就添加了 `proto ` 属性（`proto` 属性不能被for in 遍历出来，也不能被Object.prototype(obj) 查找出来）

- #### `prototype chain` 原型链

  原型可能对其原型具有非null的隐式引用，依此类推；这称为原型链，当我们在查找一个对象中是否有某个属性时，JS 会遍历整条原型链上的所有属性

  - 显示原型继承
    - `Object.setPrototypeOf `
    - `Object.create`
  - 隐式原型继承
    - 通过`new`去创建
    - 使用字面量语法糖

- 









































