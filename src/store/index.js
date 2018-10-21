import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);


export default new vuex.Store({
  state: {
    bubbleShow : false,
    userInfoTotal : "",
    projectId : "",
    userId : "",
    permission: {
      options: []
    }
  }
})
