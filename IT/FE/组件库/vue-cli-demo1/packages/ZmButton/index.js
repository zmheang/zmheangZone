import ZmButton from './src'

// 为组件提供 install 安装方法，供按需引入
ZmButton.install = function (Vue) {
  Vue.component(ZmButton.name, ZmButton)
}

// 导出组件
export default ZmButton