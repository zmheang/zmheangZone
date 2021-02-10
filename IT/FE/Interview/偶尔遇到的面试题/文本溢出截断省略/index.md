## 文本溢出截断省略

[原本地址](https://www.zoo.team/article/text-overflow)

通过这5个demo就可以看出来demo1，和demo3的效果看起来比较好，demo5也还行，就是省略号会和文字重叠



方案一：

​		可解决大部分单行文本截断

​		学习补充：			

```
overflow: 规定当内容溢出元素框时发生的事情
white-space: 设置如何处理元素内的空白
	normal: 默认，空白会被浏览器忽略
	pre: 空白会被浏览器保留
	nowrap: 文本不会换行，文本会在同一行上继续，直到遇到 <br> 标签为止
	pre-wrap: 保留空白符序列，但是正常地进行换行
	pre-line: 合并空白符序列，但是保留换行符
	inherit: 规定应该从父元素继承 white-space 属性的值
text-overflow:当文本溢出包含元素时发生的事情
	clip: 修剪文本
	elipsis: 显示省略符号来代替被修剪的文本
	string: 使用给定的字符串来代表被修剪的文本
```



方案二：

​		多行截断（可限制行数）

​		学习知识：

```
-webkit-line-clamp: 可以把 块容器 中的内容限制为指定的行数，在 `display` 设置为 -webkit-box 或者 -webkit-inline-box 并且 -webkit-box-orient 属性设置成 vertical时才有效果
	none: 表示不会被限制
	integer: 显示多少行之后会被限制
-webkit-box-orient: 用来设置一个元素是水平还是垂直布局其内容
	horizontal: 盒子水平布局其内容
	vertical: 盒子垂直布局其内容
	inline-axis: 盒子沿内联轴展示其子元素
	block-axis: 盒子沿块轴展示其子元素
	
```

方案三：

​		多行截断（JS）

​		学习知识：

```

```

方案四：

​		多行截断（利用line-height）

​		学习知识：

```
word-break: 规定自动换行的处理方法
	normal: 使用浏览器默认的换行规则
	break-all: 允许在单词内换行
	keep-all: 只能在半角空格或连字符处换行
```







#### 实现的目标：

1. ###### 在外层的容器大小内，根据参数控制指定行数显示，规定行数显示不完全的部分隐藏，并用省略号替代

2. ###### 可以通过参数控制被省略的字符串的显隐
