##### 有没有使用过 css variable，它解决了哪些问题

###### MDN:

自定义属性，是由CSS作者定义的，它包含的值可以在整个文档中重复使用。由自定义属性标记设定值，由var（）_函数来获取值。



###### 基本用法：

声明一个自定义属性，属性名需要以两个减号（--）开始，属性值则可以是任何有效的CSS值。和其他属性一样，自定义属性也是写在规则集之内的，如下：

```css
定义：
element {
  --main-bg-color: brown;
}

使用：
element {
  background-color: var(--main-bg-color);
}
```

`通常的最佳实践是定义在根伪类 [`:root`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:root) 下，这样就可以在HTML文档的任何地方访问到它了`

`注意：自定义属性区分大小写`

继承属性：从父元素继承

备用值：`color: var(--my-var, red);`



##### JavaScript中的值

```javascript
// 获取一个 Dom 节点上的 CSS 变量
element.style.getPropertyValue("--my-var");

// 获取任意 Dom 节点上的 CSS 变量
getComputedStyle(element).getPropertyValue("--my-var");

// 修改一个 Dom 节点上的 CSS 变量
element.style.setProperty("--my-var", jsVar + 4);
```



##### 解决了哪些问题？

- 减少样式重复定义，方便维护，提高可读性
- 减少`JavaScript`对`DOM`的介入，制作性能更高的动画
- 配合` content`等通过`css`给`JS`传参，得到一些通过`JavaScript`难以获取的参数
