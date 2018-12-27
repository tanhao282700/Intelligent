<!--
    变配电系统 环境情况
    made by 胡永福
    start in 2018-9-4
-->
<template>
  <div>
    <div ref="HpadTop" class="tabsDomBox0 h-paddingTop">
      <div class="navCrumbs"><p @click="toHome">首页</p> > 变配电监测系统 > <span>环境情况</span></div>
    </div>
    <div class="envirCond">
      <el-tabs class="tabBoxs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-if="showFirst" name="first" lazy>
          <span slot="label" class="tabItems">回路状态</span>
          <loop-state/>
        </el-tab-pane>
        <el-tab-pane v-if="showSecond" name="second" lazy>
          <span slot="label" class="tabItems">环境状态</span>
          <envir-state/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>



  import LoopState from "./condition/loopState";
  import EnvirState from "./condition/envirState";
  export default {
    components: {
      EnvirState,
      LoopState

    },
    name: "envirCond",
    data() {
      return {
        showFirst:false,
        showSecond:false,
        activeName: '',
      }
    },
    methods: {
      toHome(){
        this.$router.replace({ path: '/home', params: { isLogin: true} });
      },
//tab选项卡切换
      handleClick(tab, event) {
        console.log(tab.index);

      },
    },
    created() {
      if (this.$store.state.sysList[3].role_string.length !==0) {
        if (this.$store.state.sysList[3].role_string[2] != 0) {
          this.showFirst = true;
        } else {
          this.showFirst = false;
          this.activeName = 'second';
        }
        if (this.$store.state.sysList[3].role_string[3] != 0) {
          this.showSecond = true;
        } else {
          this.showSecond = false;
        }
      } else {
        this.showFirst = true;
        this.showSecond = true;
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
  .envirCond{
    width: 100%;
    padding: 0 0.28rem;

    .el-tabs__content{
      overflow: visible;
    }
  }

</style>
