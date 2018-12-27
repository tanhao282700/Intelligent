<!--
    给排水系统 首页
    made by 胡永福
    start in 2018-8-2
-->
<template>
  <div class="WaterSupplyAndDrainage">
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
    name: "WaterSupplyAndDrainage",
    data() {
      return {
        sData:{
          active:'item0',
          lists:[]
        },
      }
    },
    methods: {

    },
    created() {
      if(this.$store.state.sysList[6].role_string.length != 0) {
        if (this.$store.state.sysList[6].role_string[0] != 0) {
          this.sData.lists.push({id:0,name:'首页',route:'/WaterSupplyAndDrainage/components/floor3D'})
        }
        if (this.$store.state.sysList[6].role_string[1] != 0) {
          this.sData.lists.push({id:1,name:'水泵',route:'/WaterSupplyAndDrainage/components/waterPump'})
        }
        if (this.$store.state.sysList[6].role_string[2] != 0) {
          this.sData.lists.push({id:2,name:'高位水箱',route:'/WaterSupplyAndDrainage/components/highWaterTank'})
        }
        if (this.$store.state.sysList[6].role_string[3] != 0) {
          this.sData.lists.push({id:3,name:'蓄水池',route:'/WaterSupplyAndDrainage/components/cistern'})
        }
        if (this.$store.state.sysList[6].role_string[4] != 0) {
          this.sData.lists.push({id:4,name:'潜污泵',route:'/WaterSupplyAndDrainage/components/submersibleSewagePump'})
        }
        if (this.$store.state.sysList[6].role_string[5] != 0) {
          this.sData.lists.push({id:5,name:'污水池',route:'/WaterSupplyAndDrainage/components/sewagePond'})
        }
      }else {
        this.sData.lists.push({id:0,name:'首页',route:'/WaterSupplyAndDrainage/components/floor3D'})
        this.sData.lists.push({id:1,name:'水泵',route:'/WaterSupplyAndDrainage/components/waterPump'})
        this.sData.lists.push({id:2,name:'高位水箱',route:'/WaterSupplyAndDrainage/components/highWaterTank'})
        this.sData.lists.push({id:3,name:'蓄水池',route:'/WaterSupplyAndDrainage/components/cistern'})
        this.sData.lists.push({id:4,name:'潜污泵',route:'/WaterSupplyAndDrainage/components/submersibleSewagePump'})
        this.sData.lists.push({id:5,name:'污水池',route:'/WaterSupplyAndDrainage/components/sewagePond'})
      }
    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
  .WaterSupplyAndDrainage{
    .h-paddingTop{
      padding-top: 85px;
      .navCrumbs{
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
