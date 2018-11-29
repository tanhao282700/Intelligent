<!--
    空调系统 定时模式
    made by 胡永福
    start in 2018-9-21
-->
<template>
  <div>
    <div class="tabsDomBox0 h-paddingTop">
      <div class="navCrumbs"><p @click="toHome">首页</p> > 空调系统 > <span>定时模式</span></div>
    </div>
    <div class="timeMode">
      <el-tabs class="tabBoxs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="first">
          <span slot="label" class="tabItems">模式控制</span>
          <mode-control lazy/>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label" class="tabItems">自动控制日志</span>
          <control-log lazy/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>


  import ModeControl from "./timerMode/modeControl";
  import ControlLog from "./timerMode/controlLog";
  export default {
    components: {
      ControlLog,
      ModeControl

    },
    name: "timeMode",
    data() {
      return {
        activeName: 'first',
      }
    },
    methods: {
//tab选项卡切换
      handleClick(tab, event) {
        console.log(tab.index);

      },
      toHome(){
        this.$router.replace({ path: '/home', params: { isLogin: true} });
      }
    },
    created() {
    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">

  @import '../../../assets/css/tabs.less';
  .timeMode{
    width: 100%;
    padding: 0 0.28rem;

    .el-tabs__content{
      overflow: visible;
    }
  }

</style>
