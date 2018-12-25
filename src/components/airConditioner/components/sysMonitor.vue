<!--
    空调系统 系统监测
    made by 胡永福
    start in 2018-9-20
-->
<template>
  <div>
    <div ref="HpadTop" class="tabsDomBox0 h-paddingTop">
      <div class="navCrumbs"><p @click="toHome">首页</p> > 空调系统 > <span>系统监测</span></div>
    </div>
    <div class="sysMonitor">
      <el-tabs class="tabBoxs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-if="showFirst" name="first" lazy>
          <span slot="label" class="tabItems">冷水机组运行</span>
          <chiller-running/>
        </el-tab-pane>
        <el-tab-pane v-if="showSecond" name="second" lazy>
          <span slot="label" class="tabItems">能耗情况</span>
          <energy-situation/>
        </el-tab-pane>
        <el-tab-pane v-if="showThird" name="third" lazy>
          <span slot="label" class="tabItems">设备告警</span>
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
        showFirst:false,
        showSecond:false,
        showThird:false,
        activeName: '',
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
      if(this.$store.state.sysList[1].role_string[5]!=0){
        this.showFirst = true;
      } else {
        this.showFirst = false;
      }
      if(this.$store.state.sysList[1].role_string[6]!=0){
        this.showSecond = true;
      } else {
        this.showSecond = false;
      }
      if(this.$store.state.sysList[1].role_string[7]!=0){
        this.showThird = true;
      } else {
        this.showThird = false;
      }


      if (this.$store.state.sysList[1].role_string[5]!=0) {
        this.activeName = 'first';
      } else if (this.$store.state.sysList[1].role_string[5]==0 && this.$store.state.sysList[1].role_string[6]!=0) {
        this.activeName = 'second';
      } else if (this.$store.state.sysList[1].role_string[5]==0 && this.$store.state.sysList[1].role_string[6]==0 && this.$store.state.sysList[1].role_string[7]!=0) {
        this.activeName = 'third';
      }
    },
    mounted() {
      this.$refs.HpadTop.style.paddingTop = Number(this.$parent.$children[0].$el.children[0].offsetHeight)+30+'px';
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
