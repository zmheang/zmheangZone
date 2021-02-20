const targetMap = new WeakMap();
function track(target, key) {
  let depsMap = targetMap.get(target)
  if(!depsMap) { targetMap.set(target, depsMap = new Map()) }
  let dep = depsMap.get(key)
  if(!dep) { depsMap.set(key, dep = new Set()) }
  dep.add(effect)
}

function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if(!depsMap) { return  }
  let dep = depsMap.get(key)
  if(dep) { dep.forEach(effect => effect()) }
}

let user = { name: 'zmheang', age: 25 }
let log = ''
let effect = () => { log = `${user.name} is ${user.age}` }

track(user, 'age')
effect()
console.log(log)
user.age = 26
console.log(log)
trigger(user, 'age')
console.log(log)
