const targetMap = new WeakMap();
// 添加追踪
function track(target, key) {
  let depsMap = targetMap.get(target)
  if(!depsMap) { targetMap.set(target, depsMap = new Map()) }
  let dep = depsMap.get(key)
  if(!dep) { depsMap.set(key, dep = new Set()) }
  dep.add(effect)
}
// 触发更新
function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if(!depsMap) { return }
  let dep = depsMap.get(key)
  if(dep) { dep.forEach(effect => effect()) }
}

function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      let result = Reflect.get(target, key, receiver);
      track(target, key)
      return result
    },
    set(target, key, value, receiver) {
      let oldValue = target[key]
      let result = Reflect.set(target, key, value, receiver);
      if(oldValue !== result) {
        trigger(target, key)
      }
      return result
    }
  }
  return new Proxy(target, handler)
}

let product = reactive({ price: 2, quantity: 3 })
let total = 0
let effect = () => {total = product.price * product.quantity}
effect()
console.log(total)
product.price = 8
console.log(total)




