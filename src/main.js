import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueSession from 'vue-session'
Vue.use(VueSession);
/**
 * 导入axios配置
 * 在组件中，通过 this.axios 调用axios的方法
 */

// axios.defaults.baseURL = '/api' // 开发本地代理
// axios.get('https://10.15.51.254/').then(res=>{
//   console.log(res)
// })

axios.defaults.headers.post['Contenst-Type'] = 'application/json;'
// axios.defaults.headers.common['token'] = store.state.token
import VueParticles from 'vue-particles'
axios.defaults.baseURL = '/apis/';
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$axios = axios; //定义调用方式
Vue.use(VueParticles)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
