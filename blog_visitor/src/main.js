import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI  from 'element-ui'
import typed from 'vue-typed-js'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(typed)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
