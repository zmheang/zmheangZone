## 如何写出一个惊艳面试官的深拷贝?
[原文地址](https://juejin.cn/post/6844903929705136141)

首先跟着文章实现一遍，遇到不懂的知识记录在下方知识点区，然后看评论区，再把评论区说的也实现一遍，观察思考异同之处

- #### 乞丐版

```
JSON.parse(JSON.stringify());
```



- #### 基础版本---只考虑了对象和数组的情况

  ```
  if(typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        for (const targetKey in target) {
          cloneTarget[targetKey] = deepCopy(target[targetKey])
        }
      return cloneTarget
      }else {
        return target
      }
  ```

  

- #### 最终版本

  ```javascript
  const mapTag = '[object Map]';
  const setTag = '[object Set]';
  const arrayTag = '[object Array]';
  const objectTag = '[object Object]';
  
  const boolTag = '[object Boolean]';
  const dateTag = '[object Date]';
  const errorTag = '[object Error]';
  const numberTag = '[object Number]';
  const regexpTag = '[object RegExp]';
  const stringTag = '[object String]';
  const symbolTag = '[object Symbol]';
  
  const deepTag = [mapTag, setTag, arrayTag, objectTag, boolTag, dateTag, errorTag, numberTag, regexpTag, stringTag, symbolTag]
  
  function isObject(target) {
  	const type = typeof target
  	return target !== null && (type === 'object' || type === 'function') 
  }
  
  function getType(target) {
  	return Object.prototype.toString.call(target)
  }
  
  function getInit(target) {
  	const Ctor = target.constructor
  	return new Ctor()
  }
  
  function forEach(array, iteratee) {
      let index = -1;
      const length = array.length;
      while (++index < length) {
          iteratee(array[index], index);
      }
      return array;
  }
  
  function cloneOtherType(targe, type) {
      const Ctor = targe.constructor;
      switch (type) {
          case boolTag:
          case numberTag:
          case stringTag:
          case errorTag:
          case dateTag:
              return new Ctor(targe);
          case regexpTag:
              return cloneReg(targe);
          case symbolTag:
              return cloneSymbol(targe);
          default:
              return null;
      }
  }
  
  function cloneReg(targe) {
      const reFlags = /\w*$/;
      const result = new targe.constructor(targe.source, reFlags.exec(targe));
      result.lastIndex = targe.lastIndex;
      return result;
  }
  
  function cloneSymbol(targe) {
      return Object(Symbol.prototype.valueOf.call(targe));
  }
  
  function cloneFunction(func) {
      const bodyReg = /(?<={)(.|\n)+(?=})/m;
      const paramReg = /(?<=\().+(?=\)\s+{)/;
      const funcString = func.toString();
      if (func.prototype) {
          console.log('普通函数');
          const param = paramReg.exec(funcString);
          const body = bodyReg.exec(funcString);
          if (body) {
              console.log('匹配到函数体：', body[0]);
              if (param) {
                  const paramArr = param[0].split(',');
                  console.log('匹配到参数：', paramArr);
                  return new Function(...paramArr, body[0]);
              } else {
                  return new Function(body[0]);
              }
          } else {
              return null;
          }
      } else {
          return eval(funcString);
      }
  }
  
  function clone(target, map = new WeakMap()) {
  	if(!isObject(target)) {return target}
  	const type = getType(target)
  	let cloneTarget;
  	if(deepTag.includes(type)) {
  		cloneTarget = getInit(target, type)
  	}else{
  		return cloneOtherType(target, type)
  	}
  	
  	if(map.get(target)) {
  		return target
  	}
  	map.set(target, cloneTarget)
  	
  	if(type === setTag) {
  		target.forEach(value => {
  		cloneTarget.add(clone(value))
  		})
  		return cloneTarget
  	}
  	if(type === mapTag) {
  		target.forEach((value, key) => {
  		cloneTarget.set(key, clone(value))
  		})
  		return cloneTarget
  	}
  	
  	const keys = type === arrayTag ? undefined : Object.keys(target)
  	forEach(keys || target, (value, key) => {
  		if(keys) {
  			key = value
  		}
  		cloneTarget[key] = clone(target[key], map)
  	})
  	return cloneTarget
  }
  
  ```

  





























------

#### 知识点：

- ##### 函数的参数都是按值传递的

  ```javascript
  ex1:
  let name = 'zmheang';
  function changeValue(name){
    name = 'lily';
  }
  changeValue(name);
  console.log(name);		// zmheang
  
  ex2:
  let obj = {name:'zmheang'};
  function changeValue(obj){
    obj.name = 'lily';
  }
  changeValue(obj);
  console.log(obj.name); // lily
  
  ex3:
  let obj = {};
  function changeValue(obj){
    obj.name = 'zmheang';
    obj = {name:'lily'};
  }
  changeValue(obj);
  console.log(obj.name); // zmheang
  ```

  笔记：

  - ###### 基本类型：又在栈中复制了一份值

  - ###### 引用类型：在栈中复制了一份参数在堆中的内存地址，若是改变参数会影响外部的值，若是重新赋值，则对外部没有任何影响

- ##### Symbol类型

  基本数据类型，每个从`Symbol()`返回的symbol值都是唯一的。一个symbol值能作为对象属性的标识符；这是该数据类型仅有的目的。

  - 创建

    ```
    var sym1 = Symbol();
    var sym2 = Symbol('foo');
    var sym3 = Symbol('foo');
    var sym4 = Symbol.for('foo');
    ```

  - 应用场景

    - 防止XSS
    - 私有属性
    - 防止属性污染

- ##### 类型转换

  待补充...

