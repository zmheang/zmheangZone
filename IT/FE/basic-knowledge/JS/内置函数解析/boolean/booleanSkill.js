let a = [
  {index: 1, name: 'a', age: 19},
  {index: 2, name: 'a', age: 19},
  {index: 3, name: 'a', age: 19}]
let b = [
  {index: 2, name: 'a', age: 19},
  {index: 3, name: 'a', age: 19}
  ]

let aa = a.reduce((t, v) => (typeof (b.find(ele => ele.index == v.index)) == 'undefined'? t.push(v): 'a', t), [])

console.log(aa)
