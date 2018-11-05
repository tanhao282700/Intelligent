<!--
    空调系统 系统监测
    made by 胡永福
    start in 2018-9-20
-->
<template>
  <div>
    <div class="tabsDomBox0">
      <div class="navCrumbs">首页 > 空调系统 > <span>系统监测</span></div>
    </div>
    <div class="sysMonitor">
      <el-tabs class="tabBoxs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="first">
          <span slot="label" class="tabItems">冷水机组运行</span>
          <chiller-running/>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label" class="tabItems">能耗情况</span>
          <energy-situation/>
        </el-tab-pane>
        <el-tab-pane name="third">
          <span slot="label" class="tabItems">报警管理</span>
          <air-con-alarm-manage/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>





  import chillerRunning from "./sysMonitor/chillerRunning";
  import EnergySituation from "./sysMonitor/energySituation";
  import AirConAlarmManage from "./sysMonitor/airConAlarmManage";

  export default {
    components: {
      AirConAlarmManage,

      EnergySituation,
      chillerRunning


    },
    name: "sysMonitor",
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
  .sysMonitor{
    width: 100%;
    padding: 0 0.28rem;

    .el-tabs__content{
      overflow: visible;
    }
  }

</style>
