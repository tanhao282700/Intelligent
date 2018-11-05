<!--
    空调系统 首页
    made by 胡永福
    start in 2018-9-17
-->
<template>
  <div class="airConditioner">
    <sys-head :datas = "sData"></sys-head>
    <router-view></router-view>
  </div>
</template>

<script>

  import sysHead from '../common/sysHead.vue'

  export default {
    components: {
      'sys-head':sysHead,
    },
    name: "airConditioner",
    data() {
      return {
        sData:{
          active:'item0',
          lists:[
            {id:0,name:'远程控制',route:'/airConditioner/components/telecontrol'},
            {id:1,name:'系统监测',route:'/airConditioner/components/sysMonitor'},
            {id:2,name:'定时模式',route:'/airConditioner/components/timerMode'},
          ]
        }
      }
    },
    methods: {
    },
    created() {
    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
  .airConditioner{
    width:100%;
    height:100%;
    //background:#dedede;
    //overflow: scroll;
    color:#fff;
    background:url('../../assets/img/fullBg.png') no-repeat center;
    background-size: 100% 100%;

    box-sizing:border-box;

    .tabsDomBox0{padding-top: 70px;position: relative;height: 100%;}
    .tabsDomBox0 .el-select .el-input__inner{height:32px;width:98px;}
    .tabsDomBox0 .el-select{margin-top:14px;margin-left: 20px;}
    .tabsDomBox0 .el-select:nth-child(2){margin-left: 10px;}
    .navCrumbs{position: absolute;top:50px;left:0.28rem;display: block;height:30px;line-height: 30px;color:#4d5d76;font-size: 12px;}
    .navCrumbs>span{color:#008aff;}
    .el-pagination{
      width: 100%;
    }
  }

</style>
