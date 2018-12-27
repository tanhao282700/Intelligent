<!--
    变配电系统 环境情况
    made by 胡永福
    start in 2018-9-4
-->
<template>
  <div>
    <div ref="HpadTop" class="tabsDomBox0 h-paddingTop">
      <div class="navCrumbs"><p @click="toHome">首页</p> > 变配电监测系统 > <span>监测情况</span></div>
    </div>
    <div class="monitorCond">
      <el-tabs class="tabBoxs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-if="showFirst" name="first" lazy>
          <span slot="label" class="tabItems">历史读数</span>
          <low-pressure/>
        </el-tab-pane>
        <el-tab-pane v-if="showSecond" name="second" lazy>
          <span slot="label" class="tabItems">报警管理</span>
          <alarm-manage/>
        </el-tab-pane>
        <el-tab-pane v-if="showThird" name="third" lazy>
          <span slot="label" class="tabItems">进出情况</span>
          <in-out-situation/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>



  import HisRead from "./monitor/hisRead";
  import AlarmManage from "./monitor/alarmManage";
  import InOutSituation from "./monitor/inOutSituation";
  import LowPressure from "./monitor/lowPressure";
  export default {
    components: {
      LowPressure,
      InOutSituation,
      AlarmManage,
      HisRead

    },
    name: "monitorCond",
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
      },
    },
    created() {
      if (this.$store.state.sysList[3].role_string.length !==0) {
        if (this.$store.state.sysList[3].role_string[4] != 0) {
          this.showFirst = true;
        } else {
          this.showFirst = false;
        }
        if (this.$store.state.sysList[3].role_string[5] != 0) {
          this.showSecond = true;
        } else {
          this.showSecond = false;
        }
        if (this.$store.state.sysList[3].role_string[6] != 0) {
          this.showThird = true;
        } else {
          this.showThird = false;
        }


        if (this.$store.state.sysList[3].role_string[4] != 0) {
          this.activeName = 'first';
        } else if (this.$store.state.sysList[3].role_string[4] == 0 && this.$store.state.sysList[3].role_string[5] != 0) {
          this.activeName = 'second';
        } else if (this.$store.state.sysList[3].role_string[4] == 0 && this.$store.state.sysList[3].role_string[5] == 0 && this.$store.state.sysList[3].role_string[6] != 0) {
          this.activeName = 'third';
        }
      } else {
        this.showFirst = true;
        this.showSecond = true;
        this.showThird = true;
        this.activeName = 'first';
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
  .monitorCond{
    width: 100%;
    padding: 0 0.28rem;
  }

</style>
