import Vue from 'vue'
import Router from 'vue-router'

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

//权限系统
import permission from '@/components/Permission/Permission';
import roleSetting from '@/components/Permission/roleSetting';
import userSetting from '@/components/Permission/userSetting';

//首页
import Home from '@/components/Home/Home';

//门禁
import DoorControl from '@/components/DoorControl/DoorControl'
import tabs from '@/components/DoorControl/components/tabs'
import tabsSys from '@/components/DoorControl/components/tabsSys'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/permission',
      component: permission,
      redirect:'/permission/user',
      children:[
        { path: '/permission/user', component: userSetting,},
        { path: '/permission/role', component: roleSetting,}
      ]
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
      path: '/AgentManage',
      component: generationMIndex0,
      children:[
        {
          path: '/AgentManage',
          name:'generationMBase',
          component:generationMIndex
        },
        {
          path: '/AgentManage/schedule',
          component:generationMSchedule,
          children:[
            { path: '/AgentManage/schedule/first'},
            { path: '/AgentManage/schedule/second'},
            { path: '/AgentManage/schedule/thrid'},
          ]
        },
        {
          path: '/AgentManage/workList',
          component:generationMWorkList
        },
        {
          path: '/AgentManage/routing',
          component:generationMRouting
        },
        {
          path: '/AgentManage/report',
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
    {
      path: '/DoorControl',
      component: DoorControl,
      redirect: '/DoorControl/components/tabsSys',
      children:[
        { path: '/DoorControl/components/tabs',component: tabs},
        { path: '/DoorControl/components/tabsSys',component: tabsSys},
      ]
    },


  ]
})
