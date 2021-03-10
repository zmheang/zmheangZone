let l1 = [
  {id: 1, a: 'a'},
  {id: 1, b: 'b'},
  {id: 2, a: 'a'},
  {id: 3, a: 'a'},
]
let l2 = l1.reduce((t, v) => {
  let a = t.find(ele => ele.id == v.id)
  if( a === undefined) {
    t.push(v)
  }else {
    a = Object.assign(a,v);
  }
  return t
}, [])
console.log(l2)
