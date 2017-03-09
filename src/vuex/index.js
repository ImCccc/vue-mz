/**
 * Create by zechun.chen on 2016/12/22
 */

import Vue from 'vue'
import Vuex from 'vuex'
import com from './modules/com'
import home from './modules/home'
import detail from './modules/detail'
import cinema from './modules/cinema'
import film from './modules/film'
 
Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        com,
        home,
        detail,
        cinema,
        film
    },
    /*
		开启严格模式，仅需在创建 store 的时候传入 strict: true：

		类似于插件，我们可以让构建工具来处理这种情况：
		const store = new Vuex.Store({
		  	strict: process.env.NODE_ENV !== 'production'
		})

    */
    strict:process.env.NODE_ENV !== 'production'
})

export default store;