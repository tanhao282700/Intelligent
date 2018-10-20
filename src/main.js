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


/* 引入全局变量 */
import base from './assets/global/base';
Vue.prototype.BASE = base;

/* 引入全局函数 */
import global from './assets/global/global';
Vue.use(global);

//引入Velocity.js动画库
import  Velocity from 'velocity-animate';

//引入播放视频插件
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer);

//全局组件
import Crumbs from '@/components/common/crumbs/index.js'; // 导入自定义组件文件
Vue.use(Crumbs);

import Lines from '@/components/common/Lines/index.js'; // 导入自定义组件文件
Vue.use(Lines);

import Dialog from '@/components/common/dialog/index.js'; // 导入自定义组件文件
Vue.use(Dialog);

//引入Vuex
import store from './store'

import reset from "./assets/css/reset.css";
import common from "./assets/css/common.css";
import './assets/icon/iconfont.css';
import './assets/js/circleChart.js';
import './assets/js/windowResize.js';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
