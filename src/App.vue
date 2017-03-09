<template>
  <div class="wrap" v-scroll="showTop">
    <com-header :com="comConf" />
    <div class="container"> 
      <transition :name="transitionName"> 
        <router-view class="child-view" />
      </transition>
    </div>
    <com-loading v-show='loading' />
    <com-sidebar />
    <div @click="gotop" class="go-top" :class="goTop?'active':''"><i class="icon iconfont icon-top-copy"></i></div>
  </div>
</template>
<script>
  require('./assets/reset.sass')
  /*
        mapState 辅助函数 当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键：

        在单独构建的版本中辅助函数为 Vuex.mapState
        import { mapState } from 'vuex'
        export default {
          computed: mapState({
            箭头函数可使代码更简练
            count: state => state.count,
            传字符串参数 'count' 等同于 `state => state.count`
            countAlias: 'count',
            为了能够使用 `this` 获取局部状态，必须使用常规函数
            countPlusLocalState (state) {
              return state.count + this.localCount
            }
          })
        }
        当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
        computed: mapState([
          映射 this.count 为 store.state.count
          'count'
        ])
  */
  import {mapGetters} from 'vuex'
  import Header from './components/header'
  import Loading from './components/loading'
  import Sidebar from './components/sidebar'
  export default {
    data(){
      return {
        // 基于路由的动态过渡 :基于当前路由与目标路由的变化关系，动态设置过渡效果：
        transitionName:'slide-left',
        goTop:false
      }
    },
    //实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见
    created:function(){
      if(this.$route.name == undefined){
          return this.$router.push('home')
      }
      // 以下方法是 触发 ./modules/com.com.js  里面的COM_CONF方法:[types.COM_CONF](state,settings){state = Object.assign(state,settings) },更改vuex里面的共享数据
      // 提交 mutation 的方式，而非直接改变
      this.$store.commit('COM_CONF',{isFooter:true})
    },
    //watch： 键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性
    watch:{
      '$route' (to,from){
        alert("路由发生变化触发该方法，要跳转路由：" + to.path)
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        /*
          <router-view> 是基本的动态组件，所以我们可以用 <transition> 组件给它添加一些过渡效果：
          基于路由的动态过渡 : 
          <transition :name="transitionName">
            <router-view></router-view>
          </transition>
          接着在父组件内
          watch $route 决定使用哪种过渡
        */
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      }
    },
    // computed ：计算属性
    // computed: {
    //     // 仅读取，值只须为函数
    //     aDouble: function () {return this.a * 2 },
    //     // 读取和设置
    //     aPlus: {
    //       get: function () {return this.a + 1 },
    //       set: function (v) {this.a = v - 1 }
    //     }
    // }

    // mapGetters 辅助函数仅仅是将 store 中的 getters 映射到局部计算属性：
    // 如果你想将一个 getter 属性另取一个名字，使用对象形式：
    // mapGetters({
    //     // 映射 this.doneCount 为 store.getters.doneTodosCount
    //     doneCount: 'doneTodosCount'
    // })
    computed:mapGetters({
        comConf:'comConf',
        loading:'loading'
    }),
    components:{
        comHeader:Header,
        comLoading:Loading,
        comSidebar:Sidebar
    },
    methods:{
      showTop:function(){
        if(document.body.scrollTop>200){
            this.goTop = true
        }else{
            this.goTop = false
        }
      },
      //返回顶部
      gotop:function(){
        let speed = 10;
        let timer = setInterval(function(){
            if(document.body.scrollTop>0){
                document.body.scrollTop = document.body.scrollTop-speed > 0 ? document.body.scrollTop-speed : 0 ;
                speed += 10;      
            }else{
                clearInterval(timer)
            }       
        },16)
      }
    }
  }
</script>
