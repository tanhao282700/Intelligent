import Vue from 'vue'
import Router from 'vue-router'

//首页
import Home from '@/components/Home/Home'

//能源
import energy from '@/components/Energy/energy0'         //能源组件
import energyFullLook from '@/components/Energy/energy'  //全景查看子组件
import RunMsg from '@/components/Energy/runMsg'          //运行情况子组件
import Alarm from '@/components/Energy/alarm'

//代维系统管理端
import generationMIndex0 from '@/components/AgentManage/index0';
import generationMIndex from '@/components/AgentManage/index';
import generationMSchedule from '@/components/AgentManage/schedule';
import generationMWorkList from '@/components/AgentManage/workList';
import generationMRouting from '@/components/AgentManage/routing';
import generationMReport from '@/components/AgentManage/report';

//消防报警
import fireAlarm from '@/components/Alarm/fireAlarm'
import fireMonitor from '@/components/Alarm/components/fireMonitor'
import fireHistory from '@/components/Alarm/components/fireHistory'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Home
    },
    {
      path: '/energy',
      component: energy,
      children:[
        { path: '/energy/fullLook', component: energyFullLook,
          children:[
            { path: '/energy/fullLook/first'},
            { path: '/energy/fullLook/second'},
            { path: '/energy/fullLook/thrid'},
          ]
        },
        { path: '/energy/runMsg', component: RunMsg,
          children:[
            { path: '/energy/runMsg/first'},
            { path: '/energy/runMsg/second'},
            { path: '/energy/runMsg/thrid'},
          ]
        },
        { path: '/energy/alarm', component: Alarm}
      ]

    },
    {
      path: '/generationM',
      component: generationMIndex0,
      children:[
        {
          path: '/generationM',
          name:'generationMBase',
          component:generationMIndex
        },
        {
          path: '/generationM/schedule',
          component:generationMSchedule,
          children:[
            { path: '/generationM/schedule/first'},
            { path: '/generationM/schedule/second'},
            { path: '/generationM/schedule/thrid'},
          ]
        },
        {
          path: '/generationM/workList',
          component:generationMWorkList
        },
        {
          path: '/generationM/routing',
          component:generationMRouting
        },
        {
          path: '/generationM/report',
          component:generationMReport
        },
      ]
    },
    {
      path: '/fireAlarm',
      component: fireAlarm,
      children:[
        {
          path: 'fireMonitor',
          name:fireMonitor,
          component:fireMonitor
        },
        {
          path: 'fireHistory',
          name:'fireHistory',
          component: fireHistory
        }
      ]
    },
  ]
})
