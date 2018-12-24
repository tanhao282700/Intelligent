
<template>
  <div class="generation autoComponent otherDepMaContainer">
    <SysHead :datas = "sData" v-on:searchCont="search"/>
    <router-view></router-view>
  </div>
</template>

<script>
  import "../../../../assets/css/otherDep.css";
  import utils from "../../../../assets/js/utils.js";
  import SysHead from '@/components/common/sysHead';
  export default {
    components:{
      "SysHead":SysHead
    },
    name: 'generationMOther1',
    data () {
      return {
        sData:{
          id:0,
          lists:[
            {id:0,name:'首页',route:'/home'},
            {id:1,name:'工单',route:'/AgentManage/otherDep/workOrder'},
            {id:2,name:'我的审批列表',route:'/AgentManage/otherDep/approvalList'},
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
      sessionStorage.setItem('activeItem','item1');
    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
  @import '../../../../assets/css/tabs.less';

  .generation{
    width:100%;
    height:100%;
  }

</style>


