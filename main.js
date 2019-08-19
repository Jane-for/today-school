import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false



// //商家模块
// Vue.prototype.MerUrl = 'http://wq.qincent.cn:39951/mer';
// //用户模块
// Vue.prototype.UserUrl = 'http://wq.qincent.cn:39954/user';
// //需求模块
// Vue.prototype.MisUrl = 'http://wq.qincent.cn:39952/mis';
// //其他
// Vue.prototype.OthUrl = 'http://wq.qincent.cn:39953/oth';



//商家模块
Vue.prototype.MerUrl = 'http://127.0.0.1:39951/mer';
//用户模块
Vue.prototype.UserUrl = 'http://127.0.0.1:39954/user';
//需求模块
Vue.prototype.MisUrl = 'http://127.0.0.1:39952/mis';
//其他
Vue.prototype.OthUrl = 'http://127.0.0.1:39953/oth';




App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
