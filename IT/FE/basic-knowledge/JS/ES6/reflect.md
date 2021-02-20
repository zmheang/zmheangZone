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

#### Reflect.set(target, name, value, receiver)

#### Reflect.has(obj, name)

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

### 实例