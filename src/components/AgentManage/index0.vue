<!--
    代维系统（管理端）
    白 2018-8-21
-->
<template>
  <div class="generation autoComponent">
      <SysHead :datas = "sData" v-on:searchCont="search"/>
      <router-view></router-view>
  </div>
</template>

<script>
import utils from "../../assets/js/utils.js";
import SysHead from '@/components/common/sysHead';
export default {
    components:{
      "SysHead":SysHead
  },
    name: 'generationMBase',
  data () {
    return {
        sData:{
            id:3,
            lists:[
                {id:0,name:'首页',route:'/AgentManage'},
                {id:1,name:'排班表',route:'/AgentManage/schedule'},
                {id:2,name:'工单',route:'/AgentManage/workList'},
                {id:3,name:'巡检',route:'/AgentManage/routing'},
                {id:4,name:'统计报表',route:'/AgentManage/report'},
            ]
        }
    }
  },
  methods:{
    search(param){
      console.log(param)
    }
  },
  created() {

  },
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../assets/css/tabs.less';
.generation{
  width:100%;
  height:100%;
}
</style>
