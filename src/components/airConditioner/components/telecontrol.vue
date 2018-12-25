<!--
    空调系统 远程控制
    made by 胡永福
    start in 2018-9-17
-->
<template>
  <div>
    <div ref="HpadTop" class="tabsDomBox0 h-paddingTop">
      <div class="navCrumbs"><p @click="toHome">首页</p> > 空调系统 > <span>远程控制</span></div>
    </div>
    <div class="telecontrol">
      <el-tabs class="tabBoxs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-if="showFirst" name="first" lazy>
          <span slot="label" class="tabItems">{{first}}</span>
          <cold-source-station ref="first" />
        </el-tab-pane>
        <el-tab-pane v-if="showSecond" name="second" lazy>
          <span slot="label" class="tabItems">{{second}}</span>
          <air-conditioner-end ref="second" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>




  import ColdSourceStation from "./telecontrol/coldSourceStation";
  import AirConditionerEnd from "./telecontrol/airConditionerEnd";
  import utils from "../../../assets/js/utils";
  export default {
    components: {
      AirConditionerEnd,
      ColdSourceStation

    },
    name: "telecontrol",
    data() {
      return {
        showFirst:false,
        showSecond:false,
        activeName: '',
        first:this.$store.state.sysList[1].son_list[0].sys_menu_title,
        second:this.$store.state.sysList[1].sys_menu_title,
      }
    },
    methods: {
//tab选项卡切换
      handleClick(tab, event) {
        console.log(tab.index);
        if (this.showFirst && this.showSecond) {
          if (tab.index == 0) {
            this.$refs.second.removeMessageEvent();
            this.$refs.first.addMessageEvent();
          } else if (tab.index == 1) {
            this.$refs.first.removeMessageEvent();
            this.$refs.second.addMessageEvent();
          }
        }
      },
      toHome(){
        this.$router.replace({ path: '/home', params: { isLogin: true} });
      }
    },
    created() {
      if(this.$store.state.sysList[1].role_string[3]!=0){
        this.showFirst = true;
      } else {
        this.showFirst = false;
      }
      if(this.$store.state.sysList[1].role_string[4]!=0){
        this.showSecond = true;
      } else {
        this.showSecond = false;
      }


      if (this.$store.state.sysList[1].role_string[3]!=0) {
        this.activeName = 'first';
      } else if (this.$store.state.sysList[1].role_string[3]==0 && this.$store.state.sysList[1].role_string[4]!=0) {
        this.activeName = 'second';
      }
    },
    mounted() {
      //console.log(this.$parent.$children[0].$el.children[0].offsetHeight)
      this.$refs.HpadTop.style.paddingTop = Number(this.$parent.$children[0].$el.children[0].offsetHeight)+30+'px';
      //console.log(this.$refs.HpadTop.style.paddingTop)
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">

  @import '../../../assets/css/tabs.less';
  .telecontrol{
    width: 100%;
    padding: 0 0.28rem;

    .el-tabs__content{
      overflow: visible;
    }
  }

</style>
