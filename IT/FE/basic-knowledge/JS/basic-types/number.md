# number

`number`类型包含18437736874454810627个值（2<sup>64</sup> - 2<sup>53</sup> + 3, 其中根据IEEE标准规定，有9007199254740990个值（2<sup>53</sup> - 2）为 `Not-a-Number`,

所以，由于`number`类型占64位，本可以表示2<sup>64</sup>个值，减去表示为`NaN`的值，再加上`NaN`这个值。

具体表示的是那些值：

⬜|⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜|⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜

是按照科学计数法进行存储的：s * m * 2<sup>e</sup>

首先s = 1，代表正负,

接下来e = 11是2的幂指数，

最后是m = 52，是代表精度，

所以有一些小数比如 `0.1`在转换为二进制数的时候是无法整除的，这样在存储的时候就被截取，取近似值



所以在处理小数计算的时候，我们可以将浮点数转化为整数进行计算