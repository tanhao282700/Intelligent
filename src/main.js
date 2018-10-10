// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

/* 引入ElementUI */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/*  引入axios */
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

/* 引入jquery */
import $ from 'jquery';

/*引入百度echarts组件*/
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
