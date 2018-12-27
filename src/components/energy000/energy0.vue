<!--
    能源系统 主界面
    made by 白富友
    start in 2018-8-2
-->
<template>
  <div class="energyBase">
    <SysHead :datas = "sData"/>
    <div class="energyBody">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>

import SysHead from '../../components/common/sysHead';

export default {
    components:{
      "SysHead":SysHead
  },
  name: 'energyBase',

  data () {
    return {
      activeName: 'first',
      sData:{
            active:'item0',
            lists:[
            ]
        }
    }
  },
  methods:{
  },
  created() {
      if (this.$store.state.sysList[18].role_string.length != 0) {
        if (this.$store.state.sysList[18].role_string[0] != 0 || this.$store.state.sysList[18].role_string[4] != 0 || this.$store.state.sysList[18].role_string[5] != 0|| this.$store.state.sysList[18].role_string[6] != 0) {
          this.sData.lists.push({id: 0, name: '全景查看', route: '/energy000/fullLook'})
        }
        if (this.$store.state.sysList[18].role_string[1] != 0 || this.$store.state.sysList[18].role_string[7] != 0 || this.$store.state.sysList[18].role_string[8] != 0|| this.$store.state.sysList[18].role_string[9] != 0 || this.$store.state.sysList[18].role_string[10] != 0 || this.$store.state.sysList[18].role_string[11] != 0|| this.$store.state.sysList[18].role_string[12] != 0) {
          this.sData.lists.push({id: 1, name: '运行情况', route: '/energy000/runMsg'})
        }
        if (this.$store.state.sysList[18].role_string[3] != 0) {
          this.sData.lists.push({id: 2, name: '监控告警', route: '/energy000/alarm'})
        }
      } else {
        this.sData.lists.push({id: 0, name: '全景查看', route: '/energy000/fullLook'})
        this.sData.lists.push({id: 1, name: '运行情况', route: '/energy000/runMsg'})
        this.sData.lists.push({id: 2, name: '监控告警', route: '/energy000/alarm'})
      }
  },
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../assets/css/tabs.less';
  .energyBase{
      width:100%;
      height:100%;
      display: flex;
      flex-direction: column;
      .energyBody{
        .h-paddingTop{
          padding-top: 70px!important;
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
  }

</style>
