## Reflect

[TOC]

### 概述

设计目的：

1. 将 `object`对象的一些明显属于语言内部的方法放到`reflect`对象上部署，未来的新方法将只部署在`reflect`对象上，也就是说，从`reflect`对象上可以拿到语言内部的方法
2. 修改某些`object`方法的返回结果让其变得更加合理
3. 让`object`操作都变成函数行为，
4. `reflect`对象的方法与`proxy`对象的方法一一对应，只要是`proxy`对象的方法就能在`reflect`对象上找到对应的方法

### 静态方法

#### Reflect.get(target, name, receiver)

```
Reflect.get(target, propertyKey[, receiver])
target: 需要取值的目标对象
propertyKey:需要获取的值的键值
receiver:如果 target 对象中指定了 getter， receiver则为 getter 调用时的 this 值
```

#### Reflect.set(target, name, value, receiver)

```
Reflect.set(target, propertyKey, value[, receiver])
target: 设置属性的目标对象
propertyKey：设置的属性的名称
value: 设置的值
receiver:如果遇到setter， receiver则为 setter 调用时 this 值
```

#### Reflect.has(obj, name)

```
Reflect.has(target, propertyKey)
target： 目标对象
propertyKey: 属性名
```



#### Reflect.deleteProperty(obj, name)

#### Reflect.construct(target, args)

#### Reflect.getPrototype(obj)

#### Reflect.setPrototype(obj, newAProto)

#### Reflect.apply(func, thisArg, args)

#### Reflect.defineProperty(target, propertyKey, attributes)

#### Reflect.getOwnPropertyDescriptor(target, propertyKey)

#### Reflect.isExtensible(target)

#### Reflect.preventExtensions(target)

#### Reflect.ownKeys(target)

### 实例：使用 Proxy 实现观察者模式

```
const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set});

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach(observer => observer());
  return result;
}
```

