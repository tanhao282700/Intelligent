<!--
    代维系统（管理端）
    白 2018-8-21
-->
<template>
  <div class="generation">
      <SysHead :datas = "sData"/>
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
                {id:0,name:'首页',route:'/generationM'},
                {id:1,name:'排班表',route:'/generationM/schedule'},
                {id:2,name:'工单',route:'/generationM/workList'},
                {id:3,name:'巡检',route:'/generationM/routing'},
                {id:4,name:'统计报表',route:'/generationM/report'},
            ]
        }
    }
  },
  methods:{

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

</style>
