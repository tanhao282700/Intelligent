<!--
    停车场系统 首页
    made by 胡永福
    start in 2019-1-4
-->
<template>
  <div class="airQuality">
    <sys-head ref="airQualityHead" :datas = "sData"></sys-head>
    <router-view></router-view>
  </div>
</template>

<script>



  import SysHead from "../common/sysHead";
  export default {
    components: {
      SysHead
    },
    name: "airQuality",
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
      if(this.$store.state.sysList[10].role_string.length != 0) {
        if (this.$store.state.sysList[10].role_string[0] != 0) {
          this.sData.lists.push({id:0,name:'空气质量',route:'/airQuality/components/airQualityMonitor'})
        }
        if (this.$store.state.sysList[10].role_string[1] != 0) {
          this.sData.lists.push({id:1,name:'数据统计',route:'/airQuality/components/airQualityStatistics'})
        }
      }else {
        this.sData.lists.push({id:0,name:'空气质量',route:'/airQuality/components/airQualityMonitor'})
        this.sData.lists.push({id:1,name:'数据统计',route:'/airQuality/components/airQualityStatistics'})
      }
    },
    mounted() {
      //console.log(this.$refs.airQualityHead.$children[0].$children[0].$el.children[0].children[0])
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
  .airQuality{
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
