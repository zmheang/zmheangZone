// 格式化金钱
const thousandNum = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
// 生成随机id
const RandomId = len => Math.random().toString(36).substr(2, len);
// 生成随机HEX颜色
const randomColor = () => '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, 0)
// 生成星级评分
const starNumber = (num) => "★★★★★☆☆☆☆☆".slice(5 - num, 10 - num)



////////////////////////////////////////
// console.log(thousandNum(23937456399999))
// console.log(RandomId(10))
// console.log(randomColor())
console.log(starNumber(4))
