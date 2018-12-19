<template>
  <div class="operationLog" style="width:100%;height:100%;">
    <sys-head :datas = "sData"></sys-head>
    <router-view></router-view>
  </div>
</template>

<script>

  import sysHead from '../common/sysHead.vue'

  export default {
    components:{
      'sys-head':sysHead,
    },
    data() {
      return {
        sData:{
          lists:[
            {id:0,name:'手动操作日志',route:'/operationLog/components/manualOperation'},
            {id:1,name:'自动控制日志',route:'/operationLog/components/autoOperation'},
          ]
        }
      };
    },
    created(){
    },
    methods: {

    }
  }
</script>

<style>

  @import '../../assets/css/doorControl.css' ;


</style>
