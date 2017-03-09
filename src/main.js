/**
 * Create by zechun.chen on 2016/12/22
 */

import Vue from 'vue'
// 引入 当前文件夹下面的 routers.js 文件，用于配置路由
import router from './routers'
// 引入 vuex文件夹，文件夹里面的相当于全局变量
import store from './vuex'
// 引入 config文件夹下面的 config.js 文件，用于初始化
import './config'

Vue.config.debug = true;

//自定义滚动指令
Vue.directive('scroll',{
	bind:function(el,binding){
		window.addEventListener('scroll',() => {
			let fnc = binding.value;
			fnc(el);
		})
	} 
})
// Vuex 通过 store 选项，提供了一种机制将状态从根组件『注入』到每一个子组件中（需调用 Vue.use(Vuex)）：
// 本案例的 Vue.use(Vuex) 在 vuex文件夹 的 index.js 调用
const app = new Vue({
  router,
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
}).$mount('#app');

// 通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，
// 且子组件能通过 this.$store 访问到。让我们更新下 Counter 的实现：