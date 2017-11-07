/**
 * Created by Administrator on 2017/10/31.
 */
import  Vue from 'vue'
import { Input,Button } from 'element-ui'
import Login from './Login.vue'
Vue.use(Input)
Vue.use(Button)
new Vue({
  el: "#app",
  template: `<Login />`,
  components: {
    Login
  }
})


