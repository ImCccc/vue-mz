/**
 * Create by zechun.chen on 2016/12/22
 * 路由规则
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
const routes = [
    {
        path:'/',
        component:require('./App'),
        children:[
            {
                path:'/home',
                name:'home',
                component:require('./pages/home')
            },
            {
                path:'/detail/:id',
                name:'detail',
                component:require('./pages/detail')
            },
            {
                path:'/cinema/:id',
                name:'cinema',
                component:require('./pages/cinema')
            },
            {
                path:'/film/:type',
                name:'film',
                component:require('./pages/film')
            }
        ]
    }
];

const router = new VueRouter({
    routes:routes,
    history:true,
    // active-class
    // 类型: string
    // 默认值: "router-link-active"
    // 设置 链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 linkActiveClass 来全局配置。
    linkActiveClass:'active', //如果有底部导航栏，这个属性可以为被选中的路由增加相应的选中状态class
});


// 全局钩子
router.beforeEach((to, from, next) => { 
    console.log(to)
    console.log(from)
    // 确保要调用 next 方法，否则钩子就不会被 resolved。
    next()
})

router.afterEach(route => {
    // alert('ok')
})

export default router;