## Emmet

[参考文档](https://docs.emmet.io/)

是一款编辑器插件，使用缩写语法快速编写HTML、CSS以及实现其他功能



#### 基本语法

| 001      | 002  |                        |                                                         |
| -------- | ---- | ---------------------- | ------------------------------------------------------- |
| 后代     | >    | nav > ul               | <nav> <ul></ul></nav>                                   |
| 兄弟     | +    | div + p                | <div></div><p></p>                                      |
| 上级     | ^    | div > p ^ div          | <div><p></p></div>                                      |
| 分组     | （） |                        |                                                         |
| 乘法     | *    | ul > li * 2            | <ul><li></li><li></li></ul>                             |
| 自增     | $    | ul > li .item$*2       | <ul><li class='item1'></li><li class='item2'></li></ul> |
| id和类   | #  . | form#search.wide       | <form id='search' class='wide'></form>                  |
| 自定义   | [ ]  | p[title="Hello world"] | <p title='Hello world'></p>                             |
| 文本     | { }  | a{Click me}            | `<a href=''>Click me</a>`                               |
| 隐式标签 |      |                        |                                                         |

