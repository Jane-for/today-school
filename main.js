import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
//商家模块
Vue.prototype.MerUrl = 'http://127.0.0.1:6624/school/app/mer';
//用户模块
Vue.prototype.UserUrl = 'http://127.0.0.1:6621/school/app/user';
//需求模块
Vue.prototype.MisUrl = 'http://127.0.0.1:6622/school/app/mis';
//其他
Vue.prototype.OthUrl = 'http://127.0.0.1:6623/school/app/oth';

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
