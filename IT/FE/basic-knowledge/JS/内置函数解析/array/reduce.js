// 累加
function accumulate(vals) {return vals.reduce((t, v) => t + v)}
// 累乘
function multiplication(vals) {return vals.reduce((t, v) => t * v)}
// 顺序反转
function reverse(vals) {return vals.reduceRight((t, v) => (t.push(v), t), [])}
// 数组分割
function arrSplit(arr = [], size = 1) {
  return arr.length
    ? arr.reduce((t, v) => (
      t[t.length - 1].length === size
      ? t.push([v])
      : t[t.length - 1].push(v), t
    ), [[]])
    : []
}
// 数组过滤:将arr1中存在的arr2的元素去除
function arrFilter(arr1, arr2) {return arr1.reduce((t, v) => (!arr2.includes(v) && t.push(v), t), [])}
// 数组填充
function fill(arr = [], val = '', start = 0, end = arr.length) {
  if(start < 0|| start > end|| end> arr.length) return arr
  return [
    ...arr.slice(0,start),
    ...arr.slice(start, end).reduce((t, v) => (t.push(val || v), t), []),
    ...arr.slice(end,arr.length)
  ]
}
// 数组扁平化
function flatten(arr = []) {
  return arr.reduce((t, v) => t.concat(Array.isArray(v)? flatten(v): v), [])
}
// 数组去重
function Uniq(arr = []) {
  return arr.reduce((t, v) => t.add(v), new Set())
}
// 最大值/最小值
function max(arr = []) {
  return arr.reduce((t, v) => t > v? t: v)
}
// 个数统计
function count(arr = []) {
  return arr.reduce((t, v) => (t[v] = (t[v] || 0) + 1, t), {})
}
// 数字千分化
function thousandNum(num = 0) {

}





///////////////////////////////                      test                        //////////////////////////////////
let o1 = {a: 1, b: 2}
let list = [1,2,3,4,5,6,7,8,9,0]
let list1 = [1,'a',3,4,'a',6,3,8,o1,0, o1, 'b', Number('a'), Number('b'), Number('a')]
let list2 = [1,['a',['+','-'],'c'],3,['x','y'],5]
let list3 = [1,2,3,3,5,7,8,4,2,3,4,5,6,7,8,9,0]
// console.log(accumulate(list))
// console.log(multiplication(list))
// console.log(reverse(list))
// console.log(arrSplit(list, 5))
// console.log(arrFilter(list, [2,4,6,8,10]))
// console.log(fill(list, 'zmheang', 3, 6))
// console.log(flatten(list2))
// console.log(Uniq(list1))
// console.log(max(list))
console.log(count(list3))
