import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);


export default new vuex.Store({
  state: {
    bubbleShow : false, //权限管理下提示信息
    userInfoTotal : "", //登录后返回的所有信息对象
    projectId : "", //项目id
    userId : "", //用户id
    permission: { //权限管理
      options: [] //下拉列表数组
    },
    sysList:{}, //用户所拥有权限的系统列表
  }
})
