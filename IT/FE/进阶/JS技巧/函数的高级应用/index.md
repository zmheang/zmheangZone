### 一、 高阶函数

#### 至少满足下列一个条件的函数就是高阶函数：

- 接受一个或多个函数作为输入

  ```
  // Array.prototype.map 高阶函数
  const array = [1, 2, 3, 4];
  const map = array.map(x => x * 2); // [2, 4, 6, 8]
  ```

- 输出一个函数

  比如`debounce（）`



### 二、 函数组合

```javascript
function lowerCase(input) {
  return input && typeof input === "string" ? input.toLowerCase() : input;
}

function upperCase(input) {
  return input && typeof input === "string" ? input.toUpperCase() : input;
}

function trim(input) {
  return typeof input === "string" ? input.trim() : input;
}

function split(input, delimiter = ",") {
  return typeof input === "string" ? input.split(delimiter) : input;
}

// compose函数的实现，请参考 “组合函数的实现” 部分。
const trimLowerCaseAndSplit = compose(trim, lowerCase, split);
trimLowerCaseAndSplit(" a,B,C "); // ["a", "b", "c"]


function compose(...funcs) {
  return function (x) {
    return funcs.reduce(function (arg, fn) {
      return fn(arg);
    }, x);
  };
}
```

