<!--
    电梯系统 首页
    made by 樊得涛
    start in 2018-9-26
-->
<template>
  <div class="elevator">
    <sys-head :datas = "sData"></sys-head>
    <router-view></router-view>
  </div>
</template>

<script>
  import SysHead from "../common/sysHead";
  export default {
    components: {
      SysHead
    },
    name: "elevator",
    data() {
      return {
        sData:{
          active:'item0',
          lists:[
          ]
        },
      }
    },
    methods: {
    },
    created() {
      if(this.$store.state.sysList[9].role_string.length != 0) {
        if (this.$store.state.sysList[9].role_string[0] != 0) {
          this.sData.lists.push({id:0,name:'实时监控',route:'/elevator/runTimeMonitor'})
        }
        if (this.$store.state.sysList[9].role_string[1] != 0) {
          this.sData.lists.push({id:1,name:'数据监测',route:'/elevator/dataHistory'})
        }
        if (this.$store.state.sysList[9].role_string[2] != 0) {
          this.sData.lists.push({id:2,name:'维保历史',route:'/elevator/wbHistory'})
        }
        if (this.$store.state.sysList[9].role_string[3] != 0) {
          this.sData.lists.push({id:3,name:'故障管理',route:'/elevator/breakdownManagement'})
        }
      }else {
        this.sData.lists.push({id:0,name:'实时监控',route:'/elevator/runTimeMonitor'})
        this.sData.lists.push({id:1,name:'数据监测',route:'/elevator/dataHistory'})
        this.sData.lists.push({id:2,name:'维保历史',route:'/elevator/wbHistory'})
        this.sData.lists.push({id:3,name:'故障管理',route:'/elevator/breakdownManagement'})
      }
    },
    mounted() {
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
  .elevator{
    .h-paddingTop{
      padding-top: 80px;
      .navCrumbs{
        top: auto;
        bottom: 0;
        p{
          display: inline;
          padding: 0;
          margin: 0;
          cursor: pointer;
        }
      }
    }
    position: relative;
    width:100%;
    height:100%;
    //background:#dedede;
    //overflow: scroll;
    color:#fff;
    background:url('../../assets/img/fullBg.jpg') no-repeat center;
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
