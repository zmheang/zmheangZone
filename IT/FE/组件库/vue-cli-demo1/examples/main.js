import Vue from 'vue'
import App from './App.vue'
import zmheang007 from "zmheang007";
Vue.use(zmheang007)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
